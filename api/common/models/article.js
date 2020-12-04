'use strict';
let Parser = require('rss-parser');
var Feed = require('./feed');
var CronJob = require('cron').CronJob;

async function createArticlesFromRSS(app) {
  const parser = new Parser();
  var feeds = await app.models.Feed.find({});
  feeds.forEach(async (feed) => {
    try {
      var feedData = await parser.parseURL(feed.url);
      feedData.items.forEach((item) => {
        var params = feed.params;
        console.log('TITLE: ', item[params.title]);
        app.models.Article.findOrCreate(
          {
            where: {
              title: item[params.title],
            },
          },
          {
            title: item[params.title],
            url: item[params.url],
            date: item[params.date],
            image_url: item[params.image],
            summary: item[params.summary],
            keywords: feed.keywords,
            feedId: feed.id,
          },
          (err, log) => {
            if (err)
              res = {
                status: 400,
                message: 'Error for article creation from RSS feeds',
              };
          },
        );
      });
    } catch (err) {
      console.error(err);
    }
  });
  return { status: 200, message: 'Done' };
}

module.exports = function (Article) {
  Article.createFromRSS = async function () {
    var app = Article.app;
    const job = new CronJob(
      '0 * * * *',
      function () {
        createArticlesFromRSS(app);
      },
      null,
      true,
      'Europe/Andorra',
    );
    job.start;
  };
  Article.getByKeywordsId = async function (req) {
    var app = Article.app;
    const token = await app.models.Token.find({
      where: { token: req.headers.token },
    });
    //Convert string to array of int
    var keywords = null;

    if (req.query.keywords != null)
      keywords = req.query.keywords.split(',').map((value) => {
        return parseInt(value, 10);
      });
    if (token.length == 1 && keywords) {
      const articles = await Article.find();
      var res = [];
      articles.forEach((article) => {
        //If one of article keyword is in keyword wanted list
        if (article.keywords.some((key) => keywords.indexOf(key) >= 0))
          res.push(article);
      });
      return res;
    } else {
      const admin = await app.models.User.findOne({
        where: { username: 'admin' },
      });
      const articles = await Article.find({
        order: 'id DESC',
        limit: admin.keywords_array[0],
      });
      return articles;
    }
  };

  Article.remoteMethod('createFromRSS', {
    returns: { type: 'object', root: true },
    http: { verb: 'POST' },
  });

  Article.remoteMethod('getByKeywordsId', {
    accepts: { arg: 'req', type: 'object', http: { source: 'req' } },
    returns: { type: 'object', root: true },
    http: { verb: 'GET' },
  });
};

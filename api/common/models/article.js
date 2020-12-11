'use strict';
let Parser = require('rss-parser');
var Feed = require('./feed');
var CronJob = require('cron').CronJob;

async function createArticlesFromRSS(app) {
  var images = [
    "https://img-0.journaldunet.com/HtXahFccR33kQ6qbthxsvIsmKj4=/540x/smart/6cd7bf1456154e9ba11818ca1d1770a4/ccmcms-jdn/20377570.jpg",
    "https://cdn.pixabay.com/photo/2017/01/25/12/31/bitcoin-2007769__480.jpg",
    "https://cdn.pixabay.com/photo/2018/01/26/18/21/matrix-3109378__480.jpg",
    "https://cdn.pixabay.com/photo/2018/05/04/12/50/woman-3373913__480.jpg",
    "https://cdn.pixabay.com/photo/2018/07/29/10/16/crypto-3569795__480.jpg",
    "https://cdn.pixabay.com/photo/2017/09/08/21/20/bitcoin-2730220__480.jpg",
    "https://cdn.pixabay.com/photo/2015/11/07/12/02/business-1031754__480.jpg",
    "https://cdn.pixabay.com/photo/2013/07/12/19/16/newspaper-154444__480.png",
    "https://cdn.pixabay.com/photo/2016/06/09/10/00/smartphone-1445489__480.jpg"
  ]
  const parser = new Parser();
  var feeds = await app.models.Feed.find({});
  feeds.forEach(async (feed) => {
    try {
      var feedData = await parser.parseURL(feed.url);
      feedData.items.forEach((item) => {
        var params = feed.params;
        var image = images[Math.floor(Math.random() * images.length)];
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
            image_url: image,
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
  Article.disableRemoteMethodByName('find');

  Article.createFromRSS = async function () {
    var app = Article.app;
    const job = new CronJob(
      '*/1 * * * *',
      function () {
        createArticlesFromRSS(app);
      },
      null,
      true,
      'Europe/Andorra',
    );
    job.start;
  };
  
  Article.get = async function (req) {
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

  Article.remoteMethod('get', {
    accepts: { arg: 'req', type: 'object', http: { source: 'req' } },
    returns: { type: 'object', root: true },
    http: { verb: 'GET', path: "/" },
  });

};

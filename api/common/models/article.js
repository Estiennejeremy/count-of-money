'use strict';
let Parser = require('rss-parser');
var Feed = require('./feed')

module.exports = function(Article) {
    let parser = new Parser();

    Article.createFromRSS = async function() {
        var app = Article.app;
        var feeds = await app.models.Feed.find({});
        feeds.forEach(async feed => {
            try {
                var feedData = await parser.parseURL(feed.url);
                feedData.items.forEach(item => {
                    var params = feed.params;
                    var regex = /src="(https?:\/\/[a-zA-Z0-9~\-\/\?_.=& ]*)"/gm;
                    var match = regex.exec(item[params.image]);
                    var imageUrl = match[1];
                    var summary = item[params.summary];
                    if (summary.length > 512) {
                        summary = summary.substring(0, 512);
                    }
                    Article.findOrCreate(
                        {
                            where: {
                                title: item[params.title],
                                url: item[params.url],
                                date: item[params.date],
                                summary: summary,
                                feedId: feed.id
                            }
                        },
                        {
                            title: item[params.title],
                            url: item[params.url],
                            date: item[params.date],
                            image_url: imageUrl,
                            summary: summary,
                            keywords: feed.keywords,
                            feedId: feed.id

                        },
                        (err, log) => {
                            if (err) {
                                console.log(err);
                                return {status: 400, message: 'Error for article creation from RSS feeds'}
                            }
                        }
                    );
                })
            } catch (err) {
                console.error(err);
            }
        });
        return {status: 200, message: 'Done'}
    },

    Article.get = async function(req) {
        var app = Article.app;
        const token = await app.models.Token.find({where: {token: req.headers.token}});
        //Convert string to array of int
        var keywords = null;

        if (req.query.keywords != null)
            keywords = req.query.keywords.split(",").map(value => {return parseInt(value, 10)});
        
        if (token.length == 1 && keywords) {
            const articles = await Article.find();
            var res = [];
            articles.forEach(article => {
                //If one of article keyword is in keyword wanted list
                if (article.keywords.some(key => keywords.indexOf(key) >= 0))
                    res.push(article);
            })
            return res;
        } else {
            const articles = await Article.find({
                order: 'id DESC',
                limit: 5
            });
            return articles;
        }
    }

    Article.remoteMethod('createFromRSS', {
        returns: {type: 'object', root: true},
        http: {verb: 'POST'}
    });

    Article.remoteMethod('get', {
        accepts: {arg: 'req', type: 'object', http: {source: 'req'}},
        returns: {type: 'object', root: true},
        http: {verb: 'POST'}
    });


};

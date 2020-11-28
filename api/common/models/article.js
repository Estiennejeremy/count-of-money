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
                    Article.findOrCreate(
                        {
                            where: {
                                title: item[params.title],
                                url: item[params.url],
                                date: item[params.date],
                                summary: item[params.summary],
                                feedId: feed.id
                            }
                        },
                        {
                            title: item[params.title],
                            url: item[params.url],
                            date: item[params.date],
                            summary: item[params.summary],
                            keywords: feed.keywords,
                            feedId: feed.id

                        },
                        (err, log) => {
                            if (err) res = {status: 400, message: 'Error for article creation from RSS feeds'}
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
        const user = await app.models.User.find({where: {token: req.headers.token}});

        //Convert string to array of int
        const keywords = req.query.keywords.split(",").map(value => {return parseInt(value, 10)});
        // User is not connected
        console.log(user);
        if (user.id != null) {
            const articles = await Article.find({
                order: 'id DESC',
                limit: 3
            });
            console.log("coucou");
            return articles;
        } else {
            console.log("AAA");
            const articles = await Article.find();
            var res = [];
            articles.forEach(article => {
                //If one of article keyword is in keyword wanted list
                if (article.keywords.some(key => keywords.indexOf(key) >= 0))
                    res.push(article);
            })

            return res;
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

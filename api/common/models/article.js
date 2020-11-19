'use strict';
let Parser = require('rss-parser');
var Feed = require('./feed')

module.exports = function(Article) {
    let parser = new Parser();

    Article.createFromRSS = async function() {
        try {
            var app = Article.app;
            await app.models.Feed.find({}, (err, feeds) => {
                feeds.forEach(async feed => {
                    let feedData = await parser.parseURL(feed.url);
                    feedData.items.forEach(item => {
                        var params = feed.params;
                        Article.findOrCreate(
                            {
                                where: {
                                    title: item[params.title],
                                    url: item[params.url],
                                    date: item[params.date],
                                    summary: item[params.summary]
                                }
                            },
                            {
                                title: item[params.title],
                                url: item[params.url],
                                date: item[params.date],
                                summary: item[params.summary]
                            },
                            (err, log) => {
                                if (err) return {status: 400, message: 'Error for article creation from RSS feeds'}
                            }
                        );
                    })
                })
            } );
            return {status: 200, message: 'Articles created from RSS feeds'}
        } catch (err) {
            console.log(err);
        }
      },

    Article.remoteMethod('createFromRSS', {
        http: {verb: 'POST'},
        returns: {type: 'object', root: true}

    });
};

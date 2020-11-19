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

    Article.remoteMethod('createFromRSS', {
        http: {verb: 'POST'},
        returns: {type: 'object', root: true}

    });
};

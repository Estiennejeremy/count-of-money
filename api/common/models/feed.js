'use strict';

module.exports = function (Feed) {
  Feed.addIfNotExist = async function (params) {
    const feeds = await Feed.find({ where: { url: params.url } });
    if (feeds.length >= 1) return { error: 'feed already exists' };
    else {
      Feed.create({
        url: params.url,
        params: params.params,
        keywords: params.keywords,
      });
      return { status: 'created' };
    }
  };

  Feed.remoteMethod('addIfNotExist', {
    accepts: [{ arg: 'params', type: 'object', http: { source: 'body' } }],
    returns: { type: 'object', root: true },
  });
};

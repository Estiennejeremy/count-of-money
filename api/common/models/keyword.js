'use strict';

module.exports = function (Keyword) {
  Keyword.addIfNotExist = async function (params) {
    const keyword = await Keyword.findOrCreate(
      { where: { name: params.name } },
      {
        name: params.name,
      },
    );
    return keyword;
  };

  Keyword.remoteMethod('addIfNotExist', {
    accepts: [{ arg: 'params', type: 'object', http: { source: 'body' } }],
    returns: { type: 'object', root: true },
  });
};

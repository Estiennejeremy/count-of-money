'use strict';

module.exports = function (Crypto) {
  let parser = new Parser();
  Crypto.getAllMarketCrypto = async function () {

    let feedData = await parser.parseURL("https://min-api.cryptocompare.com/data/blockchain/list");

    feedData.items.forEach(item => {
      var params = feed.params;
      var crypto = Crypto.findOrCreate(
        {
          where: {
            code: item[params.symbol],
          }
        },
        {
          code: item[params.symbol],
        },
        (err, log) => {
          if (err) return {status: 400, message: 'Error for crypto creation'}
        }
      );
    })
  }
catch
  (err)
  {
    console.error(err);
  }
})
;
return {status: 200, message: 'Done'}
},
Crypto.postFromUser = async function () {



},
  Crypto.remoteMethod('getAllMarketCrypto', {
    http: {verb: 'GET'},
    returns: {type: 'object', root: true}

  }),
  Crypto.remoteMethod('postFromId', {
    accepts: [{arg: 'data', type: 'object', http: {source: 'body'}}],
    http: {verb: 'POST'},
    returns: {type: 'object', root: true}
  });
}
;

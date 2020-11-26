'use strict';
const request = require("request-promise");

const apiKey = "b77606858f053810bcf46280591652316cd784a9fb65863e4a814ab4c3658915";

module.exports = function (Crypto) {
  Crypto.AllMarketCrypto = async function () {
    try {
      const res = await request({
        method: 'GET',
        uri: 'https://min-api.cryptocompare.com/data/blockchain/list',
        qs: {
          api_key: apiKey
        },
        json: true,
      });
      return res;
    } catch (err) {
      console.error(err);
    }
  },
    Crypto.detailInfo = async function (symbol, currency) {
      try {
        var result = {
          "cryptos": []
        };
        const res = await request({
          method: 'GET',
          uri: 'https://min-api.cryptocompare.com/data/pricemultifull',
          qs: {
            api_key: apiKey,
            tsyms: currency,
            fsyms: symbol
          },
          json: true,
        });

        for (var raw in res.RAW) {
          let crypto = await Crypto.findOrCreate(
            {where: {code: res.RAW[raw][currency].FROMSYMBOL}},
            {
              code: res.RAW[raw][currency].FROMSYMBOL,
              name: res.RAW[raw][currency].FROMSYMBOL,
              created_at: new Date(),
              updated_at: new Date()
            });
          crypto[0].current_price = res.RAW[raw][currency].PRICE;
          crypto[0].highest_price = res.RAW[raw][currency].HIGH24HOUR;
          crypto[0].lowest_price = res.RAW[raw][currency].LOW24HOUR;
          crypto[0].opening_price = res.RAW[raw][currency].OPEN24HOUR;
          result.cryptos.push(crypto[0]);
        }
        return result;
      } catch (err) {
        console.error(err);
      }
    },
    Crypto.CryptoLastInfo = async function (data) {
      console.log(data);
      try {
        const res = await request({
          method: 'GET',
          uri: 'https://min-api.cryptocompare.com/data/blockchain/latest',
          qs: {
            fsym: data,
            api_key: apiKey
          },
          json: true,
        });
        return res;
      } catch (err) {
        console.error(err);
      }
    },


    Crypto.remoteMethod('AllMarketCrypto', {
      http: {verb: 'GET'},
      returns: {type: 'object', root: true}

    }),
    Crypto.remoteMethod('CryptoLastInfo', {
      accepts: [{arg: 'cryptoSymbol', type: 'string', required: true}],
      http: {verb: 'GET'},
      returns: {type: 'object', root: true}
    }),
    Crypto.remoteMethod('detailInfo', {
      accepts: [
        {arg: 'cryptoSymbol', type: 'string', required: true},
        {arg: 'currency', type: 'string', required: true}
      ],
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

'use strict';
const request = require('request-promise');
var User = require('./user');
const apiKey =
  'b77606858f053810bcf46280591652316cd784a9fb65863e4a814ab4c3658915';

module.exports = function (Crypto) {
  (Crypto.AllMarketCrypto = async function () {
    try {
      const res = await request({
        method: 'GET',
        uri: 'https://min-api.cryptocompare.com/data/blockchain/list',
        qs: {
          api_key: apiKey,
        },
        json: true,
      });
      return res;
    } catch (err) {
      console.error(err);
    }
  }),
    (Crypto.histo = async function (id, time, currency) {
      try {
        if (!currency) {
          currency = 'EUR';
        }
        var timeStamp = null;
        let limit = null;
        switch (time) {
          case 'daily':
            timeStamp = 'day';
            limit = 60;
            break;
          case 'hourly':
            timeStamp = 'hour';
            limit = 48;
            break;
          case 'minute':
            timeStamp = 'minute';
            limit = 120;
            break;
        }

        // time = minute / hour / day
        let crypto = await Crypto.findById(id);
        const res = await request({
          method: 'GET',
          uri: 'https://min-api.cryptocompare.com/data/v2/histo' + timeStamp,
          qs: {
            api_key: apiKey,
            limit: limit,
            fsym: crypto.code,
            tsym: currency,
          },
          json: true,
        });
        return res;
      } catch (err) {
        console.error(err);
      }
    }),
    (Crypto.AllCrypto = async function (req, currency) {
      try {
        if (!currency) {
          currency = 'EUR';
        }
        let cryptos = await Crypto.find();

        await Promise.all(
          cryptos.map(async (crypto) => {
            let res = await request({
              method: 'GET',
              uri: 'https://min-api.cryptocompare.com/data/pricemultifull',
              qs: {
                api_key: apiKey,
                tsyms: currency,
                fsyms: crypto.code,
              },
              json: true,
            });
            crypto.updated_at = new Date();
            crypto.current_price = res.RAW[crypto.code][currency].PRICE;
            crypto.highest_price = res.RAW[crypto.code][currency].HIGH24HOUR;
            crypto.lowest_price = res.RAW[crypto.code][currency].LOW24HOUR;
            crypto.opening_price = res.RAW[crypto.code][currency].OPEN24HOUR;
          }),
        );
        return cryptos;
      } catch (err) {
        console.error(err);
      }
    }),
    (Crypto.cryptoById = async function (req, ids, currency) {
      try {
        if (!currency) {
          currency = 'EUR';
        }
        var app = Crypto.app;
        const token = await app.models.Token.find({
          where: { token: req.headers.token },
        });
        const user = await app.models.User.findById(token[0].fk_user_id);
        if (user.id) {
          let cryptos = [];
          for (var id in ids) {
            let crypto = await Crypto.findById(id);
            if (crypto !== null) {
              cryptos.push(crypto);
            }
          }
          await Promise.all(
            cryptos.map(async (crypto) => {
              if (crypto !== null) {
                let res = await request({
                  method: 'GET',
                  uri: 'https://min-api.cryptocompare.com/data/pricemultifull',
                  qs: {
                    api_key: apiKey,
                    tsyms: currency,
                    fsyms: crypto.code,
                  },
                  json: true,
                });
                crypto.updated_at = new Date();
                crypto.current_price = res.RAW[crypto.code][currency].PRICE;
                crypto.highest_price =
                  res.RAW[crypto.code][currency].HIGH24HOUR;
                crypto.lowest_price = res.RAW[crypto.code][currency].LOW24HOUR;
                crypto.opening_price =
                  res.RAW[crypto.code][currency].OPEN24HOUR;
              }
            }),
          );
          return cryptos;
        } else {
          return { error: 'User should be connected' };
        }
      } catch (err) {
        console.error(err);
      }
    }),
    (Crypto.detailInfo = async function (symbol, currency) {
      try {
        var result = {
          cryptos: [],
        };
        if (!currency) {
          currency = 'EUR';
        }
        const res = await request({
          method: 'GET',
          uri: 'https://min-api.cryptocompare.com/data/pricemultifull',
          qs: {
            api_key: apiKey,
            tsyms: currency,
            fsyms: symbol,
          },
          json: true,
        });

        for (var raw in res.RAW) {
          let crypto = await Crypto.findOne({
            where: { code: res.RAW[raw][currency].FROMSYMBOL },
          });
          crypto.update_at = new Date();
          crypto.current_price = res.RAW[raw][currency].PRICE;
          crypto.highest_price = res.RAW[raw][currency].HIGH24HOUR;
          crypto.lowest_price = res.RAW[raw][currency].LOW24HOUR;
          crypto.opening_price = res.RAW[raw][currency].OPEN24HOUR;
          result.cryptos.push(crypto);
        }
        return result;
      } catch (err) {
        console.error(err);
      }
    }),
    (Crypto.postFromSymbol = async function (req, data) {
      try {
        var app = Crypto.app;
        const token = await app.models.Token.find({
          where: { token: req.headers.token },
        });
        const user = await app.models.User.findById(token[0].fk_user_id);
        if (user.role === 'ADMIN') {
          const res = await request({
            method: 'GET',
            uri: 'https://min-api.cryptocompare.com/data/blockchain/list',
            qs: {
              api_key: apiKey,
            },
            json: true,
          });

          if (res.Data[data.symbol]) {
            const res2 = await request({
              method: 'GET',
              uri: 'https://min-api.cryptocompare.com/data/pricemultifull',
              qs: {
                api_key: apiKey,
                tsyms: data.currency,
                fsyms: data.symbol,
              },
              json: true,
            });
            const res3 = await request({
              method: 'GET',
              uri:
                'https://min-api.cryptocompare.com/data/blockchain/mining/calculator',
              qs: {
                api_key: apiKey,
                tsyms: data.currency,
                fsyms: data.symbol,
              },
              json: true,
            });
            let crypto = await Crypto.findOrCreate(
              {
                where: {
                  code: res2.RAW[data.symbol][data.currency].FROMSYMBOL,
                },
              },
              {
                code: res2.RAW[data.symbol][data.currency].FROMSYMBOL,
                name: res3.Data[data.symbol].CoinInfo.FullName,
                ico_url: res2.RAW[data.symbol][data.currency].IMAGEURL,
                created_at: new Date(),
                updated_at: new Date(),
              },
            );
            crypto.current_price = res2.RAW[data.symbol][data.currency].PRICE;
            crypto.highest_price =
              res2.RAW[data.symbol][data.currency].HIGH24HOUR;
            crypto.lowest_price =
              res2.RAW[data.symbol][data.currency].LOW24HOUR;
            crypto.opening_price =
              res2.RAW[data.symbol][data.currency].OPEN24HOUR;

            return crypto;
          } else {
            return { error: 'This coin does not exist' };
          }
        } else {
          return { error: 'User should be admin' };
        }
      } catch (err) {
        console.error(err);
      }
    }),
    (Crypto.getById = async function (req, id, currency) {
      try {
        if (!currency) {
          currency = 'EUR';
        }
        var app = Crypto.app;
        const token = await app.models.Token.find({
          where: { token: req.headers.token },
        });
        const user = await app.models.User.findById(token[0].fk_user_id);
        if (user.id) {
          const crypto = await Crypto.findOne({ where: { id: id } });
          const res = await request({
            method: 'GET',
            uri: 'https://min-api.cryptocompare.com/data/v2/histoday',
            qs: {
              fsym: crypto.code,
              tsym: currency,
              limit: '1',
              api_key: apiKey,
            },
            json: true,
          });
          const res2 = await request({
            method: 'GET',
            uri: 'https://min-api.cryptocompare.com/data/price',
            qs: {
              fsym: crypto.code,
              tsyms: currency,
              api_key: apiKey,
            },
            json: true,
          });

          crypto.current_price = res[currency];
          crypto.highest_price = res.Data.Data[0].high;
          crypto.lowest_price = res.Data.Data[0].low;
          crypto.opening_price = res.Data.Data[0].open;
          crypto.updated_ate = new Date();
          return crypto;
        } else {
          console.error('User Should be connected');
        }
      } catch (err) {
        console.error(err);
      }
    }),
    Crypto.remoteMethod('AllMarketCrypto', {
      http: { verb: 'GET' },
      returns: { type: 'object', root: true },
    }),
    Crypto.remoteMethod('cryptoById', {
      accepts: [
        { arg: 'req', type: 'object', http: { source: 'req' } },
        { arg: 'cryptoId', type: 'string', required: true },
        { arg: 'currency', type: 'string', required: true },
      ],
      http: { verb: 'GET' },
      returns: { type: 'object', root: true },
    }),
    Crypto.remoteMethod('AllCrypto', {
      accepts: [
        { arg: 'req', type: 'object', http: { source: 'req' } },
        { arg: 'currency', type: 'string', required: true },
      ],
      http: { verb: 'GET' },
      returns: { type: 'object', root: true },
    }),
    Crypto.remoteMethod('detailInfo', {
      accepts: [
        { arg: 'cryptoSymbol', type: 'string', required: true },
        { arg: 'currency', type: 'string', required: true },
      ],
      http: { verb: 'GET' },
      returns: { type: 'object', root: true },
    }),
    Crypto.remoteMethod('histo', {
      accepts: [
        { arg: 'cryptoId', type: 'string', required: true },
        { arg: 'period', type: 'string', required: true },
        { arg: 'currency', type: 'string', required: true },
      ],
      http: { verb: 'GET' },
      returns: { type: 'object', root: true },
    }),
    Crypto.remoteMethod('getById', {
      accepts: [
        { arg: 'cryptoId', type: 'string', required: true },
        { arg: 'currency', type: 'string', required: true },
      ],
      http: { verb: 'GET' },
      returns: { type: 'object', root: true },
    }),
    Crypto.remoteMethod('postFromSymbol', {
      accepts: [
        { arg: 'req', type: 'object', http: { source: 'req' } },
        { arg: 'data', type: 'object', http: { source: 'body' } },
      ],
      http: { verb: 'POST' },
      returns: { type: 'object', root: true },
    });
};

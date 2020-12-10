'use strict';
const request = require('request-promise');

module.exports = function(Currency) {
  (Currency.AllCurrency = async function () {
    try {
      const res = await request({
        method: 'GET',
        uri: 'https://openexchangerates.org/api/currencies.json',
        json: true,
      });
      return res;
    } catch (err) {
      console.error(err);
    }
  }),

  Currency.remoteMethod('AllCurrency', {
    http: {verb: 'GET'},
    returns: {type: 'object', root: true},
  });
};

'use strict';

var sha1 = require('sha1');
const { v1: uuidv1 } = require('uuid');
const request = require('request-promise-native');

module.exports = function (User) {
  User.register = async function (data) {
    try {
      if (!data.username || !data.password || !data.email)
        return { error: 'Missing credentials' };
      const checkUser = await User.findOne({
        where: { username: data.username },
      });
      if (checkUser) return { error: 'User already exists' };
      const admin = await User.findOne({
        where: { username: 'admin' },
      });
      const userRes = await User.create({
        username: data.username,
        password_hash: sha1(data.password),
        email: data.email,
        crypto_array: admin.crypto_array,
      });
      return { user: userRes };
    } catch (e) {
      return { error: 'An error occured' };
    }
  };

  User.login = async function (data) {
    var app = User.app;
    try {
      if (!data.username || !data.password)
        return { error: 'Missing credentials' };
      const checkUser = await User.findOne({
        where: { username: data.username },
      });
      if (!checkUser) return { error: 'User not found' };
      if (checkUser.password_hash !== sha1(data.password))
        return { error: 'Incorrect password' };
      const uuid = uuidv1();
      await app.models.Token.create({
        token: uuid,
        fk_user_id: checkUser.id,
        created_at: new Date(),
      });
      return { userToken: uuid };
    } catch (e) {
      return { error: 'An error occured' };
    }
  };

  User.githubOauthCall = async function (data) {
    try {
      const res = await request({
        method: 'POST',
        uri: 'https://github.com/login/oauth/access_token',
        body: {
          client_id: data.clientId,
          client_secret: data.clientSecret,
          code: data.code,
        },
        json: true,
      });
      return res;
    } catch (e) {
      return { error: 'an error occured' };
    }
  };

  User.githubOauthCallback = async function (data) {
    var app = User.app;
    try {
      const githubUser = await request({
        method: 'GET',
        uri: 'https://api.github.com/user',
        headers: {
          Authorization: `token ${data.accessToken}`,
          'User-Agent': 'CountOfMoney',
        },
        json: true,
      });
      const user = await User.findOrCreate(
        { where: { username: githubUser.login } },
        { username: githubUser.login },
      );
      const uuid = uuidv1();
      await app.models.Token.create({
        token: uuid,
        fk_user_id: user[0].id,
        created_at: new Date(),
      });
      return { userToken: uuid };
    } catch (e) {
      return { error: e };
    }
  };

  User.getUsers = async (id) => {
    try {
      if (!id) return { error: 'Invalid Parameter' };

      let user = await User.findOne({ where: { id: id } });

      return { user: user };
    } catch (error) {
      return { error: "User don't exist" };
    }
  };

  /* Update user profile custom route */
  User.editUser = async (data) => {
    try {
      if (!data.id) return { error: 'Missing user id' };
      if (data.keywords) {
        await User.updateAll(
          { id: data.id },
          {
            keywords_array: data.keywords,
          },
        );
      } else if (data.cryptos) {
        await User.updateAll(
          { id: data.id },
          {
            crypto_array: data.cryptos,
          },
        );
      } else {
        if (!data.username || !data.email)
          return { error: 'Missing parameters' };
        if (data.password)
          await User.updateAll(
            { id: data.id },
            {
              username: data.username,
              email: data.email,
              default_currency: data.currency,
              password_hash: sha1(data.password),
            },
          );
        else
          await User.updateAll(
            { id: data.id },
            {
              default_currency: data.currency,
              username: data.username,
              email: data.email,
            },
          );
      }
      const user = await User.findOne({
        where: { id: data.id },
      });
      return { user: user };
    } catch (error) {
      return { error: "Can't update user", e: error };
    }
  };

  User.remoteMethod('register', {
    accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
    returns: { type: 'object', root: true },
    http: { verb: 'POST' },
  });

  User.remoteMethod('login', {
    accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
    returns: { type: 'object', root: true },
    http: { verb: 'POST' },
  });

  User.remoteMethod('githubOauthCall', {
    accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
    returns: { type: 'object', root: true },
    http: { path: '/auth/github', verb: 'POST' },
  });

  User.remoteMethod('githubOauthCallback', {
    accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
    returns: { type: 'object', root: true },
    http: { path: '/auth/github/callback', verb: 'POST' },
  });

  User.remoteMethod('getUsers', {
    accepts: [{ arg: 'id', type: 'integer' }],
    returns: { type: 'object', root: true },
    http: { path: '/profile', verb: 'GET' },
  });

  User.remoteMethod('editUser', {
    accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
    returns: { type: 'object', root: true },
    http: { path: '/profile', verb: 'PUT' },
  });
};

'use strict';

var sha1 = require('sha1');
const { v1: uuidv1 } = require('uuid');

module.exports = function (User) {
  User.register = async function (data) {
    try {
      if (!data.username || !data.password || !data.email)
        return { error: 'Missing credentials' };
      const checkUser = await User.findOne({
        where: { username: data.username },
      });
      if (checkUser) return { error: 'User already exists' };
      const userRes = await User.create({
        username: data.username,
        password_hash: sha1(data.password),
        email: data.email,
      });
      return { user: userRes };
    } catch (e) {
      console.log('error: ', e);
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
      console.log('error: ', e);
      return { error: 'An error occured' };
    }
  };

  // User.getUserProfile = async function () {
  //   try {
  //     const user = await User.findOne()({
  //       where: { id: userId },
  //     });
  //     if (!user) return { error: 'User not found' };
  //     return { user: user };
  //   } catch (e) {}
  // };

  // User.updateUserProfile = async function (data) {
  //   try {
  //     const user = await User.findOne()({
  //       where: { id: userId },
  //     });
  //     if (!user) return { error: 'User not found' };
  //     await User.updateAll({ id: userId }, { data });
  //     return { user: user };
  //   } catch (e) {
  //     return { error: e };
  //   }
  // };

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

  // User.remoteMethod('getUserProfile', {
  //   accepts: [{ arg: 'userId', type: 'string', required: true }],
  //   returns: { type: 'object', root: true },
  //   http: { path: '/profile', verb: 'GET' },
  // });

  // User.remoteMethod('updateUserProfile', {
  //   accepts: [
  //     { arg: 'userId', type: 'string', required: true },
  //     { arg: 'data', type: 'object', http: { source: 'body' } },
  //   ],
  //   returns: { type: 'object', root: true },
  //   http: { path: '/profile', verb: 'PUT' },
  // });
};

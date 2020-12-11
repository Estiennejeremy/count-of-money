module.exports = function (app) {
  var mysql = app.dataSources.mysql;
  var user = app.models.User;
  const sha1 = require('sha1');

  mysql.autoupdate('article', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Article`.\n');
  });
  mysql.autoupdate('crypto', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Crypto`.\n');
  });
  mysql.autoupdate('currency', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Currency`.\n');
  });
  mysql.autoupdate('keyword', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Keyword`.\n');
  });
  mysql.autoupdate('token', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Token`.\n');
  });
  mysql.autoupdate('user', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Users`.\n');
    user.findOrCreate(
      { where: { username: 'admin' } },
      {
        username: 'admin',
        password_hash: sha1('admin'),
        role: 'ADMIN',
        //it's not an id for a keyword it's the default number of articles for not connected users
        keywords_array: [10],
      },
    );
  });
  mysql.autoupdate('feed', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Feed`.\n');
  });
};

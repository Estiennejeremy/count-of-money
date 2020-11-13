module.exports = function (app) {
  var mysql = app.dataSources.mysql;

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
  });
};

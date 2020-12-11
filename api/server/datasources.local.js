module.exports = {
  mysql: {
    host: process.env.DB_IP || '127.0.0.1',
    port: 3306,
    connectTimeout: 300000,
    acquireTimeout: 300000,
    database: 'countofmoney',
    password: process.env.DB_PASSWORD || 'password',
    name: 'mysql',
    user: process.env.DB_USERNAME || 'root',
    connector: 'mysql',
    // socketPath: process.env.DB_SOCKET_PATH || undefined,
  },
};

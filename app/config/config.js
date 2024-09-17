const _ = require('lodash');
require('./logging');
const defaults = require('./defaults');

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    db: {
      username: 'default',
      password: 'TzuqoIAHE28F',
      database: 'verceldb',
      host: 'ep-ancient-smoke-a4thmd5w-pooler.us-east-1.aws.neon.tech',
      port: 5432,
      dialect: 'postgres',
      logging: global.cli.logQuery,
      client: 'pg',
      dialectOptions: {
        ssl: {
          require: true, 
          rejectUnauthorized: false 
        }
      }
    },
    port: process.env.PORT || 5002,
    pm2: {
      name: process.env.PM2_NAME || 'portfolio_staging',
      instances: 1,
      watch: true,
    },
  },

  test: {
    db: {
      username: 'default',
      password: 'TzuqoIAHE28F',
      database: 'verceldb_test', 
      host: 'ep-ancient-smoke-a4thmd5w-pooler.us-east-1.aws.neon.tech',
      port: 5432,
      dialect: 'postgres',
      logging: global.cli.logQuery,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    },
  },
};

module.exports = _.defaultsDeep(defaults, config[env]);

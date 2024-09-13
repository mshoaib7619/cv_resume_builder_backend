const pm2Conf = require('./app/config/config').pm2;

const pm2Config = {
  apps: [{
    name: pm2Conf.name || 'portfolio_staging',
    script: './bin/www',
    args: ' ',
    exec_mode: 'cluster',
    watch: pm2Conf.watch && ['app', 'bin', 'app.js'],
    ignore_watch: ['node_modules/**', 'public/**', '**/*.ejs', '**/*.pug', 'sessions/**', 'logs/**'],
    instances: pm2Conf.instances || 1,
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    node_args: ' ',
    merge_logs: true,
    cwd: './',
    env: {
      NODE_ENV: 'development',
      BLUEBIRD_W_FORGOTTEN_RETURN: 0,
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
module.exports = pm2Config;

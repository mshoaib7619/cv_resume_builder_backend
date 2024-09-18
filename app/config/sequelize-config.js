const config = require('./config');

const env = 'development';  // Or 'test' if you are using test configuration

module.exports = {
  [env]: config.db,
};

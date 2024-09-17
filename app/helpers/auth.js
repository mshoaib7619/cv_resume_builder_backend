const bcrypt = require('bcryptjs');

const saltRounds = 10;

async function encryptPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

async function decryptPassword(password, databasePassword) {
  return bcrypt.compareSync(password, databasePassword);
}

module.exports = {
  encryptPassword,
  decryptPassword,
};


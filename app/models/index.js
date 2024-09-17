const { Sequelize, DataTypes } = require('sequelize');
const _ = require('lodash');
const config = require('../config/config');
const helpers = require('../helpers');

const db = {
  sequelize: new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    config.db
  ),
};

db.LoginToken = require('./LoginToken')(db.sequelize, DataTypes);
db.User = require('./User')(db.sequelize, DataTypes);
db.CandidateProfile = require('./CandidateProfile')(db.sequelize, DataTypes),
db.Project = require('./Project')(db.sequelize, DataTypes);
db.Qualification = require('./Qualification')(db.sequelize, DataTypes);
db.Skill = require('./Skill')(db.sequelize, DataTypes);
db.Experience = require('./Experience')(db.sequelize, DataTypes);
db.Reference = require('./Reference')(db.sequelize, DataTypes),
db.Language = require('./Language')(db.sequelize, DataTypes),
db.Objective = require('./Objective')(db.sequelize, DataTypes),


Object.keys(db).forEach((modelName) => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }

  const model = db[modelName];
  model.getOne = async (params) => {
    try {
      const result = await model.getAll(params);
      return (result.rows && _.first(result.rows)) || null;
    } catch (e) {
      global.cli.log(`model: error while getOne in ${modelName}: `, e);
      throw new Error(e.message);
    }
  };

  model.getAll = async (params) => {
    try {
      const where = helpers.seql.getRawParams(params, model.attributes);
      let options = { where };
      options = _.extend(options, helpers.seql.getPaginationOptions(params));
      const permissions = await model.findAndCountAll(options);
      return permissions;
    } catch (e) {
      global.cli.log(`model: error while getAll in ${modelName}: `, e);
      throw new Error(e.message);
    }
  };

  if (!model.delete) {
    model.delete = (id, transaction = null) =>
      model.destroy(
        {
          where: { id },
        },
        transaction
      );
  }

  if (!model.save) {
    model.save = async (params, userId, transaction = null) => {
      try {
        const data = helpers.seql.getRawParams(params, model.attributes);
        data.updatedBy = userId;
        if (!data.id) {
          data.createdBy = userId;
          return model.create(data, { transaction });
        }
        delete data.type;
        await model.update(data, { where: { id: data.id } }, { transaction });
        return model.getOne({ id: data.id });
      } catch (e) {
        global.cli.log(`model: error while saving ${modelName}: `, e.message);
        throw new Error(e.message);
      }
    };
  }
});

module.exports = db;

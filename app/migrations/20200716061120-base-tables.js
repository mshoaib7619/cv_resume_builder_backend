
const password = '$2b$10$kLvmxShsiPT8w6nY42FXRu4p/KvU.vNYDi/8cxo2f5nqfmVIP70U2';
const baseData =
  [
    {
      table: 'Users',
      data: [
        {
          id: 1,
          username: 'superadmin',
          password: password,
          firstName: 'Super',
          firstName: 'Admin',
          email: 'superadmin@email.com'
        },
      ]
    },
  ]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password is required.',
          },
        },
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password is required.',
          },
        },
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,

      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      createdBy: { type: Sequelize.INTEGER, defaultValue: 0 },
      updatedBy: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
      deletedAt: { type: Sequelize.DATE },
    });
    await queryInterface.createTable('LoginTokens', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'fkUserId',
      },
      token: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      expiredAt: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });

    for (let i = 0; i < baseData.length; i++) {
      await queryInterface.bulkInsert(baseData[i].table, baseData[i].data);
    }

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('LoginTokens');
  },
};

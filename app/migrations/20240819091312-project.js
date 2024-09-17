'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Projects', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      candidateProfileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'CandidateProfile',
            key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      createdBy: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Projects');
  }
};

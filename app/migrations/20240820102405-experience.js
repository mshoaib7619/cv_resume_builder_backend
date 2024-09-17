'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Experience', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
    organizationName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Organization name is required."
            },
        },
    },
    desigination: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Desigination is required."
            },
        },
    },
    description: {
        type: Sequelize.STRING(800),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Description is required."
            },
        },
    },
    city: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "City is required."
            },
        },
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Start Date is required."
            }
        },
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "End Date is required."
            }
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
    await queryInterface.dropTable('Experience');
  }
};

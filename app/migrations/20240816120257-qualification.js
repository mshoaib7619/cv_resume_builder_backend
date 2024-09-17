'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Qualification', {
   
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
    qualification: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Qualification name is required."
            },
        },
    },
    degree: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
          notEmpty: {
              args: true,
              msg: "Degree name is required."
          },
      },
   },
   city: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
        notEmpty: {
            args: true,
            msg: "City name is required."
        },
    },
  },
    school: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "School is required."
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
    totalMarks: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Total marks are required."
            },
        },
    },
    obtainMarks: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Obtained marks are required."
            },
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
    await queryInterface.dropTable('Qualification');
  }
};
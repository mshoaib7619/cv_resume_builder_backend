'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CandidateProfile', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Name is required."
            },
        },
    },
    phoneNumber: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Phone number is required."
            },
        },
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Email is required."
            },
        },
    },
    address: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Address is required."
            },
        },
    },
    dob: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Date of Birth is required."
            },
        },
    },
    jobTitle: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Job title is required."
            },
        },
    },
    summary: {
        type: Sequelize.STRING(500),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Summary is required."
            },
        },
    },
    hobby: {
        type: Sequelize.ARRAY(Sequelize.STRING), 
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Hobby is required."
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
    await queryInterface.dropTable('CandidateProfile');
  }
};

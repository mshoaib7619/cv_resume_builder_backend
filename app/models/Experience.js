
module.exports = (sequelize, DataTypes) => {
    const modelAttributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        candidateProfileId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CandidateProfile',
                key: 'id'
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        },
        organizationName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Organization name is required."
                },
            },
        },
        desigination: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Desigination is required."
                },
            },
        },
        description: {
            type: DataTypes.STRING(800),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Description is required."
                },
            },
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "City is required."
                },
            },
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Start Date is required."
                }
            },
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "End Date is required."
                }
            },
        },
        createdBy: { type: DataTypes.INTEGER, defaultValue: 0 },
        updatedBy: { type: DataTypes.INTEGER, defaultValue: 0 },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE },
        deletedAt: { type: DataTypes.DATE },
    };

    const Experience = sequelize.define('Experience', modelAttributes, {
        tableName: 'Experience',
        timestamps: true,
        paranoid: true
    });

    Experience.attributes = modelAttributes;

    Experience.associate = (db) => {
        Experience.belongsTo(db.CandidateProfile, { foreignKey: 'candidateProfileId', as: 'candidateProfile' });
    };

    return Experience;
};


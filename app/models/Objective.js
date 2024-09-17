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
            unique: true,
            references: {
                model: 'CandidateProfile',
                key: 'id'
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        },
        objective: {
            type: DataTypes.STRING(700),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Objective name is required."
                },
            },
        },
        createdBy: { type: DataTypes.INTEGER, defaultValue: 0 },
        updatedBy: { type: DataTypes.INTEGER, defaultValue: 0 },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE },
        deletedAt: { type: DataTypes.DATE },
    };

    const Objective = sequelize.define('Objective', modelAttributes, {
        tableName: 'Objective',
        timestamps: true,
        paranoid: true
    });

    Objective.attributes = modelAttributes;

    Objective.associate = (db) => {
        Objective.belongsTo(db.CandidateProfile, { foreignKey: 'candidateProfileId', as: 'candidateProfile' });
    };

    return Objective;
};


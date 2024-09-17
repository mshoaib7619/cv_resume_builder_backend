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
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Skill name is required."
                },
            },
        },
        createdBy: { type: DataTypes.INTEGER, defaultValue: 0 },
        updatedBy: { type: DataTypes.INTEGER, defaultValue: 0 },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE },
        deletedAt: { type: DataTypes.DATE },
    };

    const Skill = sequelize.define('Skill', modelAttributes, {
        tableName: 'Skill',
        timestamps: true,
        paranoid: true
    });

    Skill.attributes = modelAttributes;

    Skill.associate = (db) => {
        Skill.belongsTo(db.CandidateProfile, { foreignKey: 'candidateProfileId', as: 'candidateProfile' });
    };

    return Skill;
};


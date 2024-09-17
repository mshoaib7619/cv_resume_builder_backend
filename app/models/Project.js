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
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Title is required."
                },
            },
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Description is required."
                },
            },
        },
        createdBy: { type: DataTypes.INTEGER, defaultValue: 0 },
        updatedBy: { type: DataTypes.INTEGER, defaultValue: 0 },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE },
        deletedAt: { type: DataTypes.DATE },
    };

    const Project = sequelize.define('Project', modelAttributes, {
        tableName: 'Projects',
        timestamps: true,
        paranoid: true
    });

    Project.attributes = modelAttributes;

    Project.associate = (db) => {
        Project.belongsTo(db.CandidateProfile, { foreignKey: 'candidateProfileId', as: 'candidateProfile' });
    };

 
    return Project;

};

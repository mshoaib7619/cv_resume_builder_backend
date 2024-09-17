module.exports = (sequelize, DataTypes) => {
    const modelAttributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
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
                    msg: "Name is required."
                },
            },
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Phone number is required."
                },
            },
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Email is required."
                },
            },
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Address is required."
                },
            },
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Date of Birth is required."
                },
            },
        },
        // jobTitle: {
        //     type: DataTypes.STRING(50),
        //     allowNull: false,
        //     validate: {
        //         notEmpty: {
        //             args: true,
        //             msg: "Job title is required."
        //         },
        //     },
        // },
        summary: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Summary is required."
                },
            },
        },
        hobby: {
            type: DataTypes.ARRAY(DataTypes.STRING), 
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Hobby is required."
                },
            },
        },
        createdBy: { type: DataTypes.INTEGER, defaultValue: 0 },
        updatedBy: { type: DataTypes.INTEGER, defaultValue: 0 },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE },
        deletedAt: { type: DataTypes.DATE },
    };

    const CandidateProfile = sequelize.define('CandidateProfile', modelAttributes, {
        tableName: 'CandidateProfile',
        timestamps: true,
        paranoid: true
    });

    CandidateProfile.attributes = modelAttributes;

    CandidateProfile.associate = (db) => {
        CandidateProfile.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

        CandidateProfile.hasMany(db.Qualification, { foreignKey: 'candidateProfileId', as: 'qualifications' });

        CandidateProfile.hasMany(db.Experience,{ foreignKey: 'candidateProfileId' , as: "experience" });

        CandidateProfile.hasMany(db.Skill,{ foreignKey: 'candidateProfileId' , as: "skill" });

        CandidateProfile.hasMany(db.Reference,{ foreignKey: 'candidateProfileId' , as: "reference" });

        CandidateProfile.hasMany(db.Language,{ foreignKey: 'candidateProfileId' , as: "language" });

        CandidateProfile.hasMany(db.Project, { foreignKey: 'candidateProfileId', as: 'project' });

        CandidateProfile.hasOne(db.Objective,{ foreignKey: 'candidateProfileId' , as: "objective" });

    };


 
    return CandidateProfile;

};

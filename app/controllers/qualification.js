
module.exports.addQualification = async (req, res) => {
    try {
        let qualifications = req.body;
        const candidateProfileId = req.query.candidateProfileId;
        const userId = req.user.id;
        const savedQualifications = [];
        for (let data of qualifications) {
            const qualificationData = {
                ...data,
                candidateProfileId,
            };
            const qualification = await global.db.Qualification.save(qualificationData,userId);
            savedQualifications.push(qualification);
        }
        res.status(200).json({ message: 'Qualification save successfully', savedQualifications });
    } catch (e) {
        console.error('controller:qualification:addQualification:', e);
        res.status(500).json({ message: e.message });
    }
};


module.exports.allQualification = async (req, res) => {
    try {
        const candidateProfileId = req.params.candidateProfileId;
        const qualification = await global.db.Qualification.getAll({candidateProfileId});
        res.status(200).json({ qualification });
    } catch (e) {
        console.error('controller:qualification:allQualification:', e);
        res.status(500).json({ message: e.message });
    }
};


module.exports.qualificationById = async (req, res) => {
    try {
        const id = req.params.id;
        const qualification = await global.db.Qualification.getOne({id});
        res.status(200).json({ qualification });
    } catch (e) {
        console.error('controller:qualification:qualificationById:', e);
        res.status(500).json({ message: e.message });
    }
};

module.exports.deleteQualification = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await global.db.Qualification.delete(id);
        res.status(200).json({ message: 'Qualification deleted successfully' , deleted});
    } catch (e) {
        console.error('controller:qualification:deleteQualification:', e);
        res.status(500).json({ message: e.message });
    }
};

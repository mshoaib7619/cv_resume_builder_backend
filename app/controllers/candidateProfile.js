module.exports.addCandidateProfile = async (req, res) => {
    try {
        let data = req.body;
        const userId = req.user.id;
        const candidateProfileData = {
            ...data,
            userId, 
          };
        const candidateProfile = await global.db.CandidateProfile.save(candidateProfileData, userId);
        res.status(200).json({ message: 'Candidate profile save successfully', candidateProfile });
    } catch (e) {
        console.error('controller:candidateProfile:addCandidateProfile:', e);
        res.status(500).json({ message: e.message });
    }
};

module.exports.allCandidateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const candidateProfile = await global.db.CandidateProfile.getAll(userId);
        res.status(200).json({ candidateProfile });
    } catch (e) {
        console.error('controller:candidateProfile:allCandidateProfile:', e);
        res.status(500).json({ message: e.message });
    }
};

module.exports.candidateProfileById = async (req, res) => {
    try {
        const id = req.params.id;
        const candidateProfile = await global.db.CandidateProfile.getOne({id});
        res.status(200).json({ candidateProfile });
    } catch (e) {
        console.error('controller:candidateProfile:candidateProfileById:', e);
        res.status(500).json({ message: e.message });
    }
};

module.exports.deleteCandidateProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await global.db.CandidateProfile.delete(id);
        res.status(200).json({ message: 'Candidate Profile deleted successfully' , deleted});
    } catch (e) {
        console.error('controller:candidateProfile:deleteCandidateProfile:', e);
        res.status(500).json({ message: e.message });
    }
};

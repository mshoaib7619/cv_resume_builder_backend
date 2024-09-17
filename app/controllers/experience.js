module.exports.addExperience = async (req, res) => {
try{
    let experience = req.body
    const candidateProfileId = req.query.candidateProfileId;
    const userId = req.user.id

    const savedExperience = []
    for (let data of experience){
        const experienceData ={
            ...data,
            candidateProfileId,
        }
        const experience = await global.db.Experience.save(experienceData,userId) 
        savedExperience.push(experience)
    }
    res.status(200).json({ message: 'Experience Save Successfully', savedExperience})

} catch (e) {
    console.error('controller:experience:addExperience:', e);
    res.status(500).json({ message: e.message });
}
};


module.exports.allExperience = async (req, res) => {
    try {
        const candidateProfileId = req.params.candidateProfileId
        const experience = await global.db.Experience.getAll({candidateProfileId})
        res.status(200).json({ experience})
    } catch (e) {
        console.error('controller:experience:allExperience:', e);
        res.status(500).json({ message: e.message });
    }
}

module.exports.allExperience = async (req, res) => {
    try {
        const candidateProfileId = req.params.candidateProfileId
        const experience = await global.db.Experience.getAll({candidateProfileId})
        res.status(200).json({ experience})
    } catch (e) {
        console.error('controller:experience:allExperience:', e);
        res.status(500).json({ message: e.message });
    }
}

module.exports.experienceById = async (req, res) => {
    try {
        const id = req.params.id
        const experience = await global.db.Experience.getOne({id})
        res.status(200).json({experience})
    } catch (e) {
        console.error('controller:experience:experienceById:', e);
        res.status(500).json({ message: e.message });
    }
}

module,exports.deleteExperience = async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await global.db.Experience.delete(id)
        res.status(200).json({message: 'Experience Delete Successfully', deleted})
    } catch (error) {
        console.error('controller:experience:deleteExperience:', e);
        res.status(500).json({ message: e.message });
    }
}





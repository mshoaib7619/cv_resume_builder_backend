module.exports.addSkill = async (req, res) => {
    try {
        let skills = req.body;
        const candidateProfileId = req.query.candidateProfileId;
        const userId = req.user.id;
        const savedSkill = []
        for(let data of skills){
            const skillData = {
                ...data,
                candidateProfileId, 
            };
            const skill = await global.db.Skill.save(skillData, userId);
            savedSkill.push(skill);
        }
             res.status(200).json({ message: 'Skill save successfully', savedSkill });
    } catch (e) {
        console.error('controller:skill:addSkill:', e);
        res.status(500).json({ message: e.message });
    }
};

module.exports.allSkill = async (req, res) => {
    try {
        const candidateProfileId = req.params.candidateProfileId;
        const skill = await global.db.Skill.getAll({candidateProfileId});
        res.status(200).json({ skill });
    } catch (e) {
        console.error('controller:skil:allSkill:', e);
        res.status(500).json({ message: e.message });
    }
};

module.exports.deleteSkill = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await global.db.Skill.delete(id);
        res.status(200).json({ message: 'Skill deleted successfully' , deleted});
    } catch (e) {
        console.error('controller:skill:deleteSkill:', e);
        res.status(500).json({ message: e.message });
    }
};

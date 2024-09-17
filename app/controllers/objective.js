module.exports.addObjective = async (req,res) =>{
    try {
        const data = req.body;
        const candidateProfileId = req.query.candidateProfileId;
        const userId = req.user.id;
        const objectiveData = {
            ...data,
            candidateProfileId
        }
        const objective = await global.db.Objective.save(objectiveData,userId)
        res.status(200).json({message: "Objective Save Successfully",objective})
    } catch (e) {
        console.error('controller:objective:addObjective:', e);
        res.status(500).json({ message: e.message });
    }
}

module.exports.getObjective = async (req,res)=>{
    try {
        const candidateProfileId = req.params.candidateProfileId;
        const objective = await global.db.Objective.getAll({candidateProfileId})
        res.status(200).json({objective})
    } catch (error) {
        console.error('controller:objective:allObjective:', e);
        res.status(500).json({ message: e.message });
    }
}


module.exports.deleteObjective = async (req,res) => {
    try {
        const id = req.params.id;
        const deleted = await global.db.Objective.delete(id)
        res.status(200).json({deleted})
    } catch (error) {
        console.error('controller:objective:deteleObjective:', e);
        res.status(500).json({ message: e.message });
    }
}
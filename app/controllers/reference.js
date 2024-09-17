module.exports.addReference = async (req,res) =>{
    try {
        const references = req.body;
        const candidateProfileId = req.query.candidateProfileId;
        const userId = req.user.id;

        const savedReferences = []
        for(let data of references){
            const referenceData ={
                ...data,
                candidateProfileId,
            }
            const reference = await global.db.Reference.save(referenceData,userId);
            savedReferences.push(reference);
        }
        res.status(200).json({message:'Reference save successfully',savedReferences});
    } catch (e) {
        console.error('controller:reference:addReference:', e);
        res.status(500).json({ message: e.message });
    }
}

module.exports.getAllReference = async (req,res)=>{

    try {
        const candidateProfileId = req.params.candidateProfileId;
        const references = await global.db.Reference.getAll({candidateProfileId})
        res.status(200).json({references})
    } catch (e) {
        console.error('controller:reference:getReference:', e);
        res.status(500).json({ message: e.message });
    }
}

module.exports.referenceById = async (req,res)=>{
    try {
        const id = req.params.id;
        const references = await global.db.Reference.getAll({id})
        res.status(200).json({references})
    } catch (e) {
        console.error('controller:reference:getReference:', e);
        res.status(500).json({ message: e.message });
    }
}

module.exports.deteleReference = async (req,res)=>{
    try {
        const id = req.params.id
        const deleted = await global.db.Reference.delete(id)
        res.status(200).json({message:'Delete successfully',deleted})
    } catch (e) {
        console.error('controller:reference:deleteReference:', e);
        res.status(500).json({ message: e.message });
    }
}
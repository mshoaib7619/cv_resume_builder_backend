module.exports.addLanguage =async (req,res) =>{
    try {
        const languages = req.body;
        const candidateProfileId = req.query.candidateProfileId;
        const userId = req.user.id;

        const savedLanguage = []
        for(let data of languages) {
            const languageData={
                ...data,
                candidateProfileId
            }
            const language = await global.db.Language.save(languageData,userId)
            savedLanguage.push(language)
        }
        res.status(200).json({message:'Language sava successfully', savedLanguage})
    } catch (e){
        console.error('controller:language:addLanguage:', e);
        res.status(500).json({ message: e.message });    
    }
}

module.exports.allLanguage =async (req,res) =>{

    try {
        const candidateProfileId = req.params.candidateProfileId;
        const languages = await global.db.Language.getAll({candidateProfileId})
        res.status(200).json({languages})
    } catch (e) {
        console.error('controller:language:allLanguage:', e);
        res.status(500).json({ message: e.message });    
    }
}


module.exports.languageById =async (req,res) =>{

    try {
        const id = req.params.id;
        const language = await global.db.Language.getOne({id})
        res.status(200).json({language})
    } catch (e) {
        console.error('controller:language:languageById:', e);
        res.status(500).json({ message: e.message });    
    }
}

module.exports.deleteLanguage = async(req,res) =>{
    try {
        const id = req.params.id
        const deleted = await global.db.Language.delete(id)
        res.status(200).json({message:'Language Delete Successfully',deleted})
    } catch (e) {
        console.error('controller:language:deleteLanguage:', e);
        res.status(500).json({ message: e.message }); 
    }
}
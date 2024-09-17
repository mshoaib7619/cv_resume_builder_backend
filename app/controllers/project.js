module.exports.addProject = async (req, res) => {
    try {
        let project = req.body;
        const candidateProfileId = req.query.candidateProfileId;
        const userId = req.user.id;
        const savaProject = []
        for (let data of project ){
            const projectData = {
            ...data,
            candidateProfileId,
            userId, 
          };
          const project = await global.db.Project.save(projectData, userId);
          savaProject.push(project)
        }
        res.status(200).json({ message: 'Project Save successfully', savaProject });
    } catch (e) {
        console.error('controller:project:addProject:', e);
        res.status(500).json({ message: e.message });
    }
};

module.exports.allProject = async (req, res) => {
    try {
        const candidateProfileId = req.params.candidateProfileId;
        const projects = await global.db.Project.getAll({candidateProfileId});
        res.status(200).json({ projects });
    } catch (e) {
        console.error('controller:project:allProject:', e);
        res.status(500).json({ message: e.message });
    }
};

module.exports.projectById = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await global.db.Project.getOne({id});
        res.status(200).json({ project });
    } catch (e) {
        console.error('controller:project:projectById:', e);
        res.status(500).json({ message: e.message });
    }
};

module.exports.deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await global.db.Project.delete(id);
        res.status(200).json({ message: 'Project deleted successfully' , deleted});
    } catch (e) {
        console.error('controller:project:deleteProject:', e);
        res.status(500).json({ message: e.message });
    }
};

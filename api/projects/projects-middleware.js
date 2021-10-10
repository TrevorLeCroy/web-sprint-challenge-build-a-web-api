// add middlewares here related to projects
const projectsModel = require('../projects/projects-model');

async function validateProjectID(req, res, next) {
    const id = req.params.id;
    const project = await projectsModel.get(id);
    if(!project) {
        res.status(404).json({
            message: 'project not found'
        });
    }
    req.project = project;
    next();
}

const validateProject = async (req, res, next) => {
    const body = req.body;
    if(!body.name || !body.description) {
        res.status(400).json({
            message: 'missing required fields'
        });
    }
    next();
}

module.exports = {
   validateProject,
   validateProjectID 
};
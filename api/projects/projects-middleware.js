// add middlewares here related to projects
const projectsModel = require('../projects/projects-model');

async function validateProjectID(req, res, next) {
    const id = req.params.id;
    const project = await projectsModel.get(id);
    if(!project || (project == null || undefined)) {
        res.status(404).send();
    }
    req.project = project;
    next();
}

async function validateUpdateProject(req, res, next) {
    const body = req.body;
    if(!body.name || !body.description ||
        (body.name === null || undefined) || (body.description === null || undefined) ||
        (body.completed === null || undefined)) {
        res.status(400).send();
    }
    next();
}

async function validateProject(req, res, next) {
    const body = req.body;
    if(!body.name || !body.description || (body.name === null || undefined) || 
       (body.description === null || undefined)) {
        res.status(400).send();
    }
    next();
}

module.exports = {
   validateProject,
   validateUpdateProject,
   validateProjectID, 
};
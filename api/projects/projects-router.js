// Write your "projects" router here!
const express       = require('express');
const projectsModel = require('./projects-model');
const actionsModel  = require('../actions/actions-model');
const middleware    = require('./projects-middleware');
const { validateProjectID, validateProject } = require('./projects-middleware');
const { response } = require('../server');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await projectsModel.get();
        res.status(200).send(projects);
    } catch {
        res.status(500).json({
            message: 'Couln\'t fetch projects'
        });
    }
});

router.get('/:id', validateProjectID, async (req, res) => {
    try {
        const project = req.project;
        res.status(200).send(project);
    } catch {
        res.status(500).json({
            message: 'error retrieving project'
        });
    }
});

router.post('/', validateProject, async (req, res) => {
    try {
        const projects = await projectsModel.get();
        
        const newProject = {
            id: projects.length+1,
            name: req.body.name,
            description: req.body.description 
        }

        const createdProject = await projectsModel.insert(newProject);
        res.status(201).send(createdProject);
    } catch {
        res.status(500).json({
            message: 'error creating project'
        });
    }
});

router.put('/:id', validateProjectID, validateProject, async (req, res) => {
    try {
        const id = req.params.id;

        const updatedProject = {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed,
        };

        const nowUpdatedProject = await projectsModel.update(id, updatedProject);
        console.log(nowUpdatedProject);
        res.status(200).send(nowUpdatedProject);
    } catch {
        res.status(500).json({
            message: 'error updating project'
        });
    }
});

router.delete('/:id', validateProjectID, async (req, res) => {
    try {
        const id = req.params.id;

        await projectsModel.remove(id);
        
        res.status(200).send(req.project);
    } catch {
        res.status(500).json({
            message: 'error deleting project'
        });
    }
});

router.get('/:id/actions', validateProjectID, async (req, res) => {
    try {
        const id = req.params.id;

        const project = await projectsModel.get(id);
        const actions = await actionsModel.get();
        const projectActions = actions.filter(action => action.project_id === project.id);
        
        res.status(200).send(projectActions);
    } catch {
        res.status(500).json({
            message: 'error fetching actions'
        });
    }
});


module.exports = router;
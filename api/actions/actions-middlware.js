// add middlewares here related to actions
// add middlewares here related to projects
const actionsModel = require('./actions-model');

async function validateActionID(req, res, next) {
    const id = req.params.id;
    const action = await actionsModel.get(id);
    if(!action || (action == null || undefined)) {
        res.status(404).send();
    }
    req.action = action;
    next();
}

async function validateUpdateAction(req, res, next) {
    const body = req.body;
    if(!body.notes || !body.description ||
        (body.notes === null || undefined) || (body.description === null || undefined) ||
        (body.completed === null || undefined)) {
        res.status(400).send();
    }
    next();
}

async function validateAction(req, res, next) {
    const body = req.body;
    if(!body.notes || !body.description || (body.notes === null || undefined) || 
       (body.description === null || undefined)) {
        res.status(400).send();
    }
    next();
}

module.exports = {
   validateAction,
   validateUpdateAction,
   validateActionID, 
};
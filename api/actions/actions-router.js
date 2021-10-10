// Write your "actions" router here!
const express = require('express');
const { validateActionID, validateAction, validateUpdateAction } = require('./actions-middlware');
const actionsModel = require('./actions-model')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const actions = await actionsModel.get();
        res.status(200).send(actions);
    } catch {
        res.status(503).send();
    }
});

router.get('/:id', validateActionID, async (req, res) => {
    try {
        const id = req.params.id;

        const action = await actionsModel.get(id)
        res.status(200).send(action);
    } catch {
        res.status(500).send();
    }
});

router.post('/', validateAction, async (req, res) => {
    try {
        const action = {
            notes: req.body.notes,
            description: req.body.description,
            completed: req.body.completed
        };

        const newAction = await actionsModel.insert(action);
        res.status(201).send(newAction);
    } catch {
        res.status(500).send();
    }
});

router.put('/:id', validateActionID, validateUpdateAction, async (req, res) => {
    try {
        const id = req.params.id;

        const action = {
            notes: req.body.notes,
            description: req.body.description
        };

        const updatedAction = await actionsModel.update(id, action);
        res.status(200).send(updatedAction);
    } catch {
        res.status(500).send();
    }
});

router.delete('/:id', validateActionID, async (req, res) => {
    try {
        const id = req.params.id;

        const deletedAction = await actionsModel.get(id);
        await actionsModel.remove(id);
        res.status(200).send(deletedAction);
    }
    catch {
        res.status(500).send();
    }

});

module.exports = router;
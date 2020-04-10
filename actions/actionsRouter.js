const express = require('express');
const router = express.Router();
const Action = require('../data/helpers/actionModel');
const Project = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    Action.get()
    .then(actions => {
        res.status(201).json(actions);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id', validateActionId, (req, res) => {
    Action.get(req.params.id)
    .then(action => {
        res.status(201).json(action);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.post('/', validateProjectMatch, validateAction, (req, res) => {
    Action.insert(req.body)
    .then(newAction => {
        res.status(201).json(newAction);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.put('/:id', validateActionId, validateAction, (req, res) => {
    Action.update(req.params.id, req.body)
    .then(changedAction => {
        res.status(201).json(changedAction);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.delete('/:id', validateActionId, (req, res) => {
    Action.remove(req.params.id)
    .then(() => {
        res.status(201).json({ message: 'Action successfully deleted' });
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

// Middleware to validate the action id to see if it exists
function validateActionId(req, res, next){
    Action.get(req.params.id)
    .then(action => {
        if(action){
            next();
        }else{
            res.status(404).json({ message: 'The action does not exist' })
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
}

// Middleware function to validate that a project exists when adding an action
function validateProjectMatch(req, res, next){
    Project.get(req.body.project_id)
    .then(project => {
        if(project){
            next();
        }else{
            res.status(404).json({ message: 'The project does not exist' })
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
}

function validateAction(req, res, next){
    if(req.body.project_id && req.body.description && req.body.notes){
        next();
    }else{
        res.status(400).json({ message: 'Project ID, description, or notes are missing. Cannot POST' });
    }
}

module.exports = router;
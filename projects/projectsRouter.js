const express = require('express');
const router = express.Router();
const Project = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    Project.get()
    .then(projects => {
        res.status(201).json(projects);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.get('/:id', validateProjectId, (req, res) => {
    Project.get(req.params.id)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    Project.getProjectActions(req.params.id)
    .then(actions => {
        res.status(201).json(actions);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.post('/', validateProject, (req, res) => {
    Project.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    Project.update(req.params.id, req.body)
    .then(changedProject => {
        res.status(201).json(changedProject);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.delete('/:id', validateProjectId, (req, res) => {
    Project.remove(req.params.id)
    .then(() => {
        res.status(201).json({ message: 'The project has been successfully deleted' })
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

// Midleware to validate a new project
function validateProject(req, res, next){
    if(req.body.name && req.body.description){
        next();
    }else{
        res.status(400).json({ message: 'Name or description for project is missing' });
    }
}

// Middleware to validate incoming id - check to see if it exists
function validateProjectId(req, res, next){
    Project.get(req.params.id)
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

module.exports = router;
const express = require('express');
const server = express();
const projectsRouter = require('../projects/projectsRouter');
const actionsRouter = require('../actions/actionsRouter');

server.use(express.json());
server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);

module.exports = server;
// Core Module
const path = require('path');

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const rootDir = require('../utils/pathUtil');
const hostController = require('../controllers/hostController');

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.get("/edit-home", hostController.getEditHome);
hostRouter.get("/host-home-list", hostController.getHostHomeList);

module.exports = hostRouter;
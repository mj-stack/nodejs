// Core Module
const path = require('path');

// External Module
const express = require('express');
const homePageRouter = express.Router();

// Local Module
const rootDir = require('../utils/pathUtil')

homePageRouter.get("/", (req, res, next) => {
  console.log('Response middleware', req.url, req.method);
  res.sendFile(path.join(rootDir, 'views', 'homePage.html'));
});

module.exports = homePageRouter;
// Core Module
const path = require('path');

// External Module
const express = require('express');
const contactUsPageRouter = express.Router();

// Local Module
const rootDir = require('../utils/pathUtil');

contactUsPageRouter.get("/contact-us", (req, res, next) => {
  console.log(req.url, req.method);
  res.sendFile(path.join(rootDir, 'views', 'contactUs.html'));
});

contactUsPageRouter.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir, 'views', 'formSubmitted.html'));
});

module.exports = contactUsPageRouter;
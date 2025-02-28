// Core Module
const path = require('path');

// External Module
const express = require('express');

// Local Module
const homePageRouter = require('./routes/homePage');
const contactUsPageRouter = require('./routes/contactUsPage');
const rootDir = require('./utils/pathUtil');

const app = express();

app.use(express.urlencoded());
app.use(homePageRouter);
app.use(contactUsPageRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', '404.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is now live');
})
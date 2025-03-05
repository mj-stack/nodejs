// Core Module
const path = require('path');

// External Module
const express = require('express');

// Local Module
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil.js');
const errorController = require('./controllers/error.js')
const mongoConnect = require('./utils/databaseUtil.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(storeRouter);
app.use('/host', hostRouter);
app.use(express.static(path.join(rootDir, 'public')));

app.use(errorController.getError);

const PORT = 3000;
mongoConnect(client => {
  console.log(client);
  app.listen(PORT, () => {
    console.log(`Server is now listening at https://localhost:${PORT}`);
  });
})
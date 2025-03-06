const path = require('path');
const rootDir = require('../utils/pathUtil');

exports.getError = (req, res, next) =>{
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
}
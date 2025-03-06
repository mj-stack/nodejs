const path = require('path');
const rootDir = require('../utils/pathUtil');
const Home = require('../models/home');

exports.getAddHome = (req, res, next) =>{
  res.sendFile(path.join(rootDir, 'views', 'host/addHome.html'));
};

exports.postAddHome = (req, res, next) =>{
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();
  res.sendFile(path.join(rootDir, 'views', 'host/homeAdded.html'));
}

exports.getEditHome = (req, res, next) =>{
  res.sendFile(path.join(rootDir, 'views', 'host/edit-Home.html'));
};

exports.getHostHomeList = (req, res, next) =>{
  res.sendFile(path.join(rootDir, 'views', 'host/host-home-list.html'));
};
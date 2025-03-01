const path = require('path');
const rootDir = require('../utils/pathUtil');
const Home = require('../models/home');

// User
exports.getHomes = (req, res, next) =>{
  Home.fetchAll((registeredHomes) =>
    res.sendFile(path.join(rootDir, 'views', 'store/home.html'))
  );
}

exports.getBookings = (req, res, next) =>{
  Home.fetchAll((registeredHomes) =>
    res.sendFile(path.join(rootDir, 'views', 'store/bookings.html'))
  );
}

exports.getFavouriteList = (req, res, next) =>{
  Home.fetchAll((registeredHomes) =>
    res.sendFile(path.join(rootDir, 'views', 'store/favourite-list.html'))
  );
}

exports.getHomeDetail = (req, res, next) =>{
  Home.fetchAll((registeredHomes) =>
    res.sendFile(path.join(rootDir, 'views', 'store/home-detail.html'))
  );
}

exports.getHomeList = (req, res, next) =>{
  Home.fetchAll((registeredHomes) =>
    res.sendFile(path.join(rootDir, 'views', 'store/home-list.html'))
  );
}

exports.getReserve = (req, res, next) =>{
  Home.fetchAll((registeredHomes) =>
    res.sendFile(path.join(rootDir, 'views', 'store/reserve.html'))
  );
}
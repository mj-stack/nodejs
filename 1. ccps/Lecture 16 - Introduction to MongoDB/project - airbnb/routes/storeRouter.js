// External Module
const express = require('express');
const storeRouter = express.Router();

// Local Module
const storeController = require('../controllers/storeController');


storeRouter.get("/", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourite-list", storeController.getFavouriteList);
storeRouter.get("/home-detail", storeController.getHomeDetail);
storeRouter.get("/home-list", storeController.getHomeList);
storeRouter.get("/reserve", storeController.getReserve);

module.exports = storeRouter;
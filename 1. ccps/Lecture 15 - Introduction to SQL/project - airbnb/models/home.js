// Core Module
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const { data } = require('autoprefixer');

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      const homeDataPath = path.join(rootDir, 'data', 'home.json');
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {console.log('File writing concluded', err)});
    });
  }
  
  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, 'data', 'home.json');
    fs.readFile(homeDataPath, (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return callback([]); // Return an empty array on error
      }

      try {
          callback(JSON.parse(data));
      } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          callback([]); // Return empty array if JSON is invalid
      }
    });
  }
}
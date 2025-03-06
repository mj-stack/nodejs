const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const Mongo_URL = "mongodb+srv://root:root@mukuljoshi.ycghv.mongodb.net/?retryWrites=true&w=majority&appName=MukulJoshi";

const mongoConnect = (callback) => {
  MongoClient.connect(Mongo_URL).then(client => {
    callback(client);
  }).catch(err => {
    console.log("Error while connecting to Mongo", err);
  });
}

module.exports = mongoConnect;
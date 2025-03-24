const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Favourite", favouriteSchema);

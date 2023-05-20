const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://akuntsievich:34NmZaX8ReQFpZvi@cluster0.bfxvyj9.mongodb.net/?retryWrites=true&w=majority"
  );
};

module.exports = connect;

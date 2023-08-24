const mongoose = require("mongoose");
require("dotenv").config();


const MONGODB_URL = process.env.mongoUrl;
// const connection = mongoose.connect("mongodb://localhost:27017");
const connection = mongoose.connect(MONGODB_URL);



module.exports = {
  connection,
};
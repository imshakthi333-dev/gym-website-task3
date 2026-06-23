const mongoose = require("mongoose");

const supplementSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  category: String,
  stock: Number
});

module.exports = mongoose.model("Supplement", supplementSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
  productId: String,
  productName: String,
  salePrice: Number,
  productImage: String
});

module.exports = mongoose.model('goods',productSchema);

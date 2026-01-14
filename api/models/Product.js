const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const productSchema = new mongoose.Schema({
  //cuerpo del esquema lo que debes de enviar
  name: { type: String, required: true },
  amount: { type: Number, required: true },//precio unitario
  stock: { type: Number, required: true },//cantidad disponible
  _store: { type: ObjectId, ref: "Store" },
  createdAt: { type: Number, required: true },
  lastUpdate: { type: Number },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
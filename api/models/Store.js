const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  //cuerpo del esquema lo que debes de enviar
  name: { type: String, required: true },
  createdAt: { type: Number, required: true },
  lastUpdate: { type: Number},
});

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
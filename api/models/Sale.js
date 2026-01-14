const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const saleSchema = new mongoose.Schema({
  //cuerpo del esquema lo que debes de enviar
  total: { type: Number, required: true },
  quantity: { type: Number, required: true },
  productos: [
    {
        _product: { type: ObjectId,required: true, ref: "Product" },
        quantity: { type: Number, required: true},
        total: { type: Number, required: true}
    }
  ],
  _store: { type: ObjectId, ref: "Store", required: true },
  createdAt: { type: Number, required: true },
  lastUpdate: { type: Number },
});

const Sale = mongoose.model("Sale", saleSchema);
module.exports = Sale;
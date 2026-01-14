const Product = require("../models/Product");
const Store = require("../models/Store");
const self = module.exports;

// CREAR producto

self.create = async (req, res) => {
  try {
    const product = new Product(req.body);
    product.createdAt = new Date().getTime();

    const response = await product.save();
    res.status(200).send(response);

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

// ACTUALIZAR producto
self.update = async (req, res) => {
  try {
    const _id = req.params.PRODUCT_ID;
    const body = req.body;

    await Product.updateOne(
      { _id },
      {
        $set: body,
        lastUpdate: new Date().getTime()
      }
    );

    const responseDetail = await Product.findOne({ _id });
    res.status(200).send(responseDetail);

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// LISTA DE producto
self.retrieve = async (req, res) => {
  try {
    const response = await Product.find().populate({
      path: "_escuela", 
      select: {nombre: 1,tipoEscuela: 1},
      populate: { 
        path: "_estado" ,
        select: {nombre: 1}, }
    })
      .lean();

    res.status(200).send(response);

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// LISTA PAGINADA DE producto
self.retrievePaginate = async (req, res) => {
  try {
    const page = Number(req.body.page) || 1;
    const itemsPerPage = Number(req.body.itemsPerPage) || 10;

    const response = await Product.find()
      .lean()
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.status(200).send(response);

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// DETALLE DE producto
self.detail = async (req, res) => {
  try {
    const _id = req.params.PRODUCT_ID;
    //traer product
    let product = await Product.findOne({ _id }).lean(); //populate("_escuela");
    //traer su store
    const store = await Store.findOne({ _id: product._store }).lean();
    product.store = store;
    // traer sus pagos
    //const pagos = await Pago.find({ _product: _id }).lean();
    //product.pagos = pagos;

    res.status(200).send(product);

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};



// ELIMINAR producto
self.delete = async (req, res) => {
  try {
    const _id = req.params.PRODUCT_ID;

    const response = await Product.deleteOne({ _id });
    res.status(200).send(response);

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

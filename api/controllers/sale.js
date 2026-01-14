const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Store = require("../models/Store");


const self = module.exports;

// CREAR venta
self.create = async (req, res) => {
  try {
    const { _store, productos } = req.body;

    let totalVenta = 0;
    let totalCantidad = 0;
    const productosFinal = [];

    // Recorremos productos enviados
    for (const item of productos) {

      // 1. Buscar producto
      const product = await Product.findById(item._product);

      if (!product) {
        return res.status(400).send({
          error: "Producto no encontrado"
        });
      }

      // 2. Validar stock
      if (product.stock < item.quantity) {
        return res.status(400).send({
          error: `Stock insuficiente para ${product.name}`
        });
      }

      // 3. Precio unitario
      const price = product.amount;

      // 4. Totales por producto
      const totalProducto = price * item.quantity;

      // 5. Acumuladores
      totalVenta += totalProducto;
      totalCantidad += item.quantity;

      // 6. Armamos producto final
      productosFinal.push({
        _product: product._id,
        price,
        quantity: item.quantity,
        total: totalProducto
      });

      // 7. Descontar stock
      product.stock -= item.quantity;
      await product.save();
    }

    // 8. Crear venta
    const sale = new Sale({
      _store,
      productos: productosFinal,
      total: totalVenta,
      quantity: totalCantidad,
      createdAt: new Date().getTime()
    });

    const response = await sale.save();
    res.status(200).send(response);

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};


// ACTUALIZAR venta
self.update = async (req, res) => {
  try {
    const _id = req.params.SALE_ID;
    /*productos es un arreglo con:
     [
       { _product: ObjectId, quantity: Number }
     ]*/
    const { productos } = req.body;
    // Si no se envían productos o el arreglo está vacío,
    // no tiene sentido actualizar la venta
    if (!productos || productos.length === 0) {
      return res.status(400).send({ error: "Productos requeridos" });
    }
    //Variables acumuladoras
    let totalSale = 0;
    let totalQuantity = 0;

    // Recalcular totales
    for (let item of productos) {
      /* Se busca en la colección Product para:
       - verificar que exista
       - obtener su precio unitario (amount)
       - validar stock*/

      const product = await Product.findById(item._product);

      if (!product) {
        return res.status(400).send({ error: "Producto no encontrado" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).send({
          error: `Stock insuficiente para ${product.name}`
        });
      }

      // total por producto
      item.total = product.amount * item.quantity;

      totalSale += item.total;
      totalQuantity += item.quantity;
    }

    // actualizar venta
    await Sale.updateOne(
      { _id },
      {
        $set: {
          productos,
          total: totalSale,
          quantity: totalQuantity,
          lastUpdate: new Date().getTime()
        }
      }
    );

    const responseDetail = await Sale.findById(_id);
    res.status(200).send(responseDetail);

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};


// LISTA DE venta
self.retrieve = async (req, res) => {
  try {
    const response = await Sale.find().populate({
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

// LISTA PAGINADA DE venta
self.retrievePaginate = async (req, res) => {
  try {
    const page = Number(req.body.page) || 1;
    const itemsPerPage = Number(req.body.itemsPerPage) || 10;

    const response = await Sale.find()
      .lean()
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.status(200).send(response);

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// DETALLE DE venta
self.detail = async (req, res) => {
  try {
    const _id = req.params.SALE_ID;
    //traer sale
    let sale = await Sale.findOne({ _id }).lean(); //populate("_escuela");
    //traer store
    const store = await Store.findOne({ _id: sale._store }).lean();
    sale.store = store;
    // traer sus productos (solo productos), se recorre el array con map y se obtiene un array de ids 
    const productIds = sale.productos.map(p => p._product);

    const products = await Product.find({_id: { $in: productIds }})  .lean();
    sale.products = products;

    res.status(200).send(sale);

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};



// ELIMINAR venta
self.delete = async (req, res) => {
  try {
    const _id = req.params.SALE_ID;

    const response = await Sale.deleteOne({ _id });
    res.status(200).send(response);

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

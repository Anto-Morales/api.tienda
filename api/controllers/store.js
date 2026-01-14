const Store = require("../models/Store");
const Product = require("../models/Product");
const self = module.exports;

//req lo q mandamos y podemos cachar
//permite crear una Store
self.create = async (req, res) => {
    try {
        const store = new Store(req.body);
        store.createdAt = new Date().getTime();
        const response = await store.save();

        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(400, error.message);
    }
};

//permite actualizar una store
self.update = async (req, res) => {
    try {
        const _id = req.params.STORE_ID;
        const body = req.body;

        //vamos a realizar o tomar la query
        await Store.updateOne(
            { _id },
            { 
              $set: body,
              lastUpdate: new Date().getTime()
            }
        );

        const responseDetail = await Store.findOne({ _id });
        //responseDetail devuelve el objeto actualizado
        res.status(200).send(responseDetail);
    } catch (error) {
        res.status(400, error.message);

    }
};

//permite obtener lista de una Store
self.retrieve = async (req, res) => {
    try {
        const response = await Store.find().lean();
        res.status(200).send(response);
    } catch (error) {
        
        res.status(400, error.message);
    }
};

//permite obtener una lista paginada de Stores
self.retrievePaginate = async (req, res) => {
    try {
        const page = req.body.page;
        //itemsPerPage es cuantos elementos por pagina
        const itemsPerPage = req.body.itemsPerPage;

        const response = await Store.find()
        .lean()
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage);

        res.status(200).send(response);
    } catch (error) {
        res.status(400, error.message);
    }
};
                    
//permite obtener el detalle de una Store
self.detail = async (req, res) => {
    try {
        //id recibido
        const _id = req.params.STORE_ID;
        //traer store
        let store = await Store.findOne({ _id}).lean();
        //traer productos
        const products = await Product.find({ _store: _id}).lean();
            store.products = products;

        res.status(200).send(store);
    } catch (error) {
         console.log(error);
        res.status(400, error.message);
    }
};


//permite eliminar una Store
self.delete = async (req, res) => {
    try {
        const _id= req.params.STORE_ID;
        const response = await Store.deleteOne({ _id });
        res.status(200).send(response);
    } catch (error) {
        res.status(400, error.message);
    }
};
       
   
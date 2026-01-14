const express = require("express");
const { IAMAuth } = require("aloux-iam");
const router = express.Router();

const store = require("./controllers/store");
const product = require("./controllers/product");
const sale = require("./controllers/sale");

// Rutas Store
router.post("/store", store.create);
router.get("/store", store.retrieve);
router.post("/store/paginate", store.retrievePaginate);
router.get("/store/:STORE_ID", store.detail);
router.delete("/store/:STORE_ID", store.delete);
router.patch("/store/:STORE_ID", store.update);


// Rutas Product
router.post("/product", product.create);
router.get("/product/", product.retrieve);
router.post("/product/paginate", product.retrievePaginate);
router.get("/product/:PRODUCT_ID", product.detail);
router.delete("/product/:PRODUCT_ID", product.delete); 
router.patch("/product/:PRODUCT_ID", product.update);
     

// Rutas Sale
router.post("/sale", sale.create);
router.get("/sale/", sale.retrieve);
router.post("/sale/paginate", sale.retrievePaginate);
router.get("/sale/:SALE_ID", sale.detail);
router.delete("/sale/:SALE_ID", sale.delete);
router.patch("/sale/:SALE_ID", sale.update);


module.exports = router;
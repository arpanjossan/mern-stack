const express = require("express");

const {getAllProducts,createdProduct,updateProduct, deleteProduct,getProductDetails} = require("../controller/productController")

const router = express.Router()

router.route("/products").get(getAllProducts);

router.route("/products/new").post(createdProduct);

router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

// router.route("/product/:id").get(getProductDetails);


module.exports = router 
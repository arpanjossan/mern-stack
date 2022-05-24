const express = require("express");
const {getAllProducts,createdProduct,updateProduct, deleteProduct,getProductsDetails} = require("../controller/productController")

const router = express.Router()

router.route("/products").get(getAllProducts);

router.route("/products/new").post(createdProduct);

router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductsDetails);




module.exports = router 
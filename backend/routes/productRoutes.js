const express = require("express");

const {getAllProducts,createdProduct,updateProduct, deleteProduct,getProductDetails} = require("../controller/productController");
const { isAuthanticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router()

router.route("/products").get(isAuthanticatedUser,authorizeRoles('admin') ,getAllProducts);

router.route("/products/new").post( isAuthanticatedUser,createdProduct);

router.route("/product/:id").put( isAuthanticatedUser,updateProduct).delete( isAuthanticatedUser,deleteProduct).get( isAuthanticatedUser,getProductDetails);

// router.route("/product/:id").get(getProductDetails);


module.exports = router 
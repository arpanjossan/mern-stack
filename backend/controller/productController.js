const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// ----------Create Product ------------

exports.createdProduct = catchAsyncErrors(async (req, res,next) => {
  const product = await Product.create(req.body);
   if(!product){
    return next(new ErrorHandler("Product not found", 404));

   }
  res.status(200).json({
    success: true,
    product,
  });
});

// ------- GET All Products --------

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  let resultPerPage = 5;
  const productCount = await Product.countDocuments()
  console.log(req.query);
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  console.log(products);
  if (!products || products.length < 1) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // let products =  await Product.find();

  res.status(200).json({ products, success: true, productCount  });
  console.log("all Product controller");
});

//--------Get Product Details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//-------Update Product ----------

exports.updateProduct = catchAsyncErrors(async (req, res ,next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));

  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//------------Delete Product -------------

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));

  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete successfully",
  });
});

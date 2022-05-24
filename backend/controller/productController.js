const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError")


// ----------Create Product ------------

exports.createdProduct = catchAsyncError(async (req,res)=>{

    const product = await Product.create(req.body);
    res.status(200).json({
        success:true,
        product
    })
  
})

// ------- GET All Products --------

exports.getAllProducts = catchAsyncError(async(req,res)=>{
    let products =  await Product.find();

    res.status(200).json({message:"Route is working",
    success:true,
    products
})
    console.log("all Product controller")
})


//--------Get Product Details



exports.getProductsDetails = async(req,res ,next)=>{

    let product =  await Product.findById(req.params.id);
   
    if(!product){
        return next(new ErrorHander("Product not Found" , 404))
    }

    res.status(200).json({
   success:true,
   product

    })

 
    console.log("single Product controller")
}




//-------Update Product ----------

exports.updateProduct = async(req,res)=>{
 let product = await Product.findById(req.params.id)

 if(!product){
     return res.status(500).json({
         success:false,
         message:"Product not found"
     })
 }
 product = await Product.findByIdAndUpdate(req.params.id,req.body,{
     new:true,
     runValidators:true,
     useFindAndModify:false
     
 });
 res.status(200).json({
     success:true,
     product
 })

}

//------------Delete Product -------------

exports.deleteProduct =async(req,res)=>{

let product =  await Product.findById(req.params.id)
if(!product){
return res.status(500).json({
    success:false,
    message:"Product not found"
})
}

await product.remove();

res.status(200).json({
    success:true,
    message:"Product Delete successfully"
})

}
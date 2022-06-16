const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } =   req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user =  await User.findOne({ email }).select("+password");
  console.log(user,"////////////");
  if (!user) {
    return next(new ErrorHandler("Inavlid email or Password", 401));
  }
  const isPasswordMatched = await  user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Inavlid email or Password", 401));
  }
   sendToken(user , 200 , res)
 
});

//register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample id",
      url: "profile pic",
    },
  });
  sendToken(user , 200 , res)
});


exports.logout = catchAsyncErrors(async(req,res,next)=>{
    console.log("hello");
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
    // res.cookie("token" , null , {
    //     expire : Date.now(),
    //     httpOnly :true
    // });
    res.status(200).json({
        sucess:true,
        message : "Logged Out"
    })
})
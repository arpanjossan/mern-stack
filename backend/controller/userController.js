const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const { findOne } = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user, "////////////");
  if (!user) {
    return next(new ErrorHandler("Inavlid email or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Inavlid email or Password", 401));
  }
  sendToken(user, 200, res);
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
  sendToken(user, 200, res);
});

// logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
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
    sucess: true,
    message: "Logged Out",
  });
});

// Forgot Password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  console.log("hittttt");
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not Found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}\n\n If you have  not requested this email then , please ignore it`;
  console.log(message);
  try {
    await sendEmail({
      email: user.email,
      subject: `High Password Recovery`,
      message,
    });
    console.log("done");
    res.status(200).json({
      sucess: true,
      message: `Email sent to ${user.email} Successfully`,
    });
  } catch {
    user.resetPasswordUrl = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
  }
});

// RESET PASSWORD
exports.resetPassword = async (req, res, next) => {

    // Creating Token Hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

console.log(resetPasswordToken,"pass");
    const user =  await User.findOne({
        resetPasswordToken ,
        resetPasswordExpire:{$gt :Date.now()}
    })
    console.log(user ,"user");
    if(!user){
        return next(new ErrorHandler("Reset Password Token is Invalid or has been expired"))
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Reset Password does not match"))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user ,200 , res)
};

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        status :true,
        user
    })
})

//  Update Password -------------------------------------------



exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    console.log("========",req.user);
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("old Password is incorrect", 400));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler(" Password does not match", 400));


    }
    user.password = req.body.newPassword;

    await user.save()

   sendToken(user ,200 ,res)
})



//  -------------- Update User Profile --------------------

exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{

const newUserData = {
    name : req.body.name,
    email : req.body.email,
}

//    we will add cloudnary later


const user = await User.findByIdAndUpdate(req.user.id , newUserData ,{
    new :true ,
    runValidators:true,
    useFindAndModify : false
})
res.status(200).json({
    sucess:true,
    message : " Upadted sucessfully"
})

//    sendToken(user ,200 ,res)
})

// ---------Get all Users

exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{
const users =  User.find();

res.status(200).json({
    sucess:true,
    users
})

})

// ---------Get single user(admin)--------------------
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const users =  User.findById(req.params.id);
    
    if(users){
        return next(new ErrorHandler(`User does not exist with Id :${req.params.id}`));


    }
    res.status(200).json({
        sucess:true,
        users
    })
    
    })
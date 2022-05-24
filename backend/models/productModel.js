const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const  productScheme = mongoose.Schema({
    name:{
        type : String,
        required :[true ,"Please Enter Product Name"]
    },
    description :{
        type : String,
        required :[true ,"Please Enter product Description"]
    },
    price :{
        type:Number ,
        required :[true,"Please Enter Product price "],
        maxLength :[8,"Price connect exceed  8 character "]
    },
    rating:{
        type:Number,
        default :0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
    
       uri:{
            type:String,
            required:true
        },
    }],
    category:{
        type:String,
        required:[true ,"Please Enter  Productr category "],

    },
    Stock:{
        type:Number,
        required : [true,"Please enter Product Stock"],
        default:1
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type : String,
                required:true
                    }
        }
    ],
    createdAt:{ 
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model("Product",  productScheme)
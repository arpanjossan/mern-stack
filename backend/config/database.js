const mongoose = require("mongoose");
const dotenv = require("dotenv")


// dotenv.config({path:"./config.env"})
dotenv.config({path:"backend/config/config.env"})


const connectDatabase =()=>  {
    mongoose.connect(
    process.env.DB, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex:true,
    }
).then((data)=>{
console.log("connected to db" , data.connection.host);
})
  }

 module.exports = connectDatabase

// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
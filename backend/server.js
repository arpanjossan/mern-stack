const app = require("../backend/app")
const express = require("express")

const dotenv = require("dotenv")
const connectDatabase = require("./config/database")








//---------Connecting to Database
connectDatabase()  


//----Setting Path for env
dotenv.config({path:"backend/config/config.env"})

 let server = app.listen(process.env.PORT,()=>{

    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})


//---------Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error ${err.message}`);
    console.log("Shutting Down the Server1");

    server.close(()=>{
        process.exit(1);
    });
});


// -------- Handling uncaught Exception
process.on("uncaughtException",err=>{
    console.log(`Error 1 ${err.message}`);
    console.log("Shutting Down the Server2");

    
        process.exit(1);
  
});



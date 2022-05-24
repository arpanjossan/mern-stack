const app = require("../backend/app")
const express = require("express")

const dotenv = require("dotenv")
const connectDatabase = require("./config/database")

connectDatabase()
dotenv.config({path:"backend/config/config.env"})

app.listen(process.env.PORT,()=>{

    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})



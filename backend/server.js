// const app = require("../backend/app")
const express = require("express")

const dotenv = require("dotenv")

// dotenv.config({path:"backend/config/config.env"})
// app.listen(process.env.PORT,()=>{

//     console.log(`Server is working on http://localhost:${process.env.PORT}`);
// })
// const express = require("express");
// const app = express();
const app = express();
const PORT = 3004
app.listen(PORT , ()=>{
    console.log("start" , PORT);
})
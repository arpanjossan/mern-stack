const express = require("express")
const app = express();
app.use(express.json())

const errorMiddleware = require("./middleware/error")
// Router Imports

const product = require("./routes/productRoutes")
app.use("/api/v1" , product)

//-----Midlleware for Error -------------------------------------
app.use(errorMiddleware)


module.exports = app


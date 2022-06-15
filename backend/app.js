const express = require("express")
const app = express();
app.use(express.json())

const errorMiddleware = require("./middleware/error")
// Router Imports

const product = require("./routes/productRoutes")
const user = require("./routes/userRoutes")

app.use("/api/v1" , product)
app.use("/api/v1" , user)


//-----Midlleware for Error -------------------------------------
app.use(errorMiddleware)


module.exports = app


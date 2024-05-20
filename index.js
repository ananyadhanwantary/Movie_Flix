const express=require("express")
const bodyParser = require("body-parser")
const RegisterRoutes=require("./routes/routes.RegisterLogin")
const movieRoutes=require("./routes/routes.moviesUser")
const adminUserRoutes=require("./routes/routes.adminUser")
const mongoose=require("mongoose")
require("dotenv").config()

const app=express()
const port=process.env.PORT
const uri = process.env.DBURI

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(uri)
.then(()=>console.log("connection successful"))

app.use(bodyParser.json())
app.use("/api/user",RegisterRoutes)
app.use("/api/user",movieRoutes)
app.use("/api/admin",adminUserRoutes)

app.listen(port,()=>console.log(`server listening at ${port}`))
const express=require("express")
const bodyParser = require("body-parser")
const movieAdminRoutes=require("./routes/routes.movieAdmin")
const adminUserRoutes=require("./routes/routes.adminUser")
const movieUserRoutes=require("./routes/routes.moviesUser")
const signup=require('./routes/routes.AuthRoute.js')
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
app.use("/api/movie/",movieUserRoutes)
app.use("/api/users/",signup)
app.use("/api/admin/movie/",movieAdminRoutes)
app.use("/api/admin/",adminUserRoutes)

app.listen(port,()=>console.log(`server listening at ${port}`))
const express=require("express")
const bodyParser = require("body-parser")
const movieAdminRoutes=require("./routes/routes.movieAdmin")
const adminUserRoutes=require("./routes/routes.adminUser")
const movieUserRoutes=require("./routes/routes.MovieUser")
const signup=require('./routes/routes.AuthRoute.js')
const userRoutes=require('./routes/routes.userRoute.js')
const mongoose=require("mongoose")
require("dotenv").config()
const cors=require("cors")
const cookieParser=require("cookie-parser")

const app=express()
app.use(cookieParser())
const port=process.env.PORT
const uri = process.env.DBURI

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(uri)
.then(()=>console.log("connection successful"))
app.use(cors())
app.use(bodyParser.json())
app.use("/api/movie",movieUserRoutes)
app.use("/api",signup)
app.use("/api/admin/movie",movieAdminRoutes)
app.use("/api/admin",adminUserRoutes)
app.use("/api/user",userRoutes)

app.listen(port,()=>console.log(`server listening at ${port}`))
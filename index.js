const express=require("express")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

require("dotenv").config()
const port=process.env.PORT

const RegisterRoutes=require("./routes/routes.RegisterLogin")
const movieRoutes=require("./routes/routes.moviesUser")
const adminUserRoutes=require("./routes/routes.adminUser")

const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/MoviesDB")
.then(()=>console.log("connection successful"))


app.use("/api/user/",RegisterRoutes)
app.use("/api/user/",movieRoutes)

app.use("/api/admin",adminUserRoutes)

app.listen(port,()=>console.log(`server listening at ${port}`))
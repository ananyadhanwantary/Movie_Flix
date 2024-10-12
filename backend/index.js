const express = require("express");
const bodyParser = require("body-parser");
const movieAdminRoutes = require("./routes/routes.movieAdmin");
const adminUserRoutes = require("./routes/routes.adminUser");
const movieUserRoutes = require("./routes/routes.movieUser");
const signup = require('./routes/routes.AuthRoute');
const userRoutes = require('./routes/routes.userRoute');
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

const port = process.env.PORT;
const uri = process.env.DBURI;

mongoose.connect(uri)
  .then(() => console.log("MongoDB connection successful"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/movie", movieUserRoutes);
app.use("/api", signup);
app.use("/api/admin/movie", movieAdminRoutes);
app.use("/api/admin", adminUserRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));

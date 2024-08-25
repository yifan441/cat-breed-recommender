if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

// Require express and express layouts
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// Require routers
const indexRouter = require("./routes/index.js")

// Set views?
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// Connect routers?
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
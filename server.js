if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

// Require express and express layouts
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// Require routers
const indexRouter = require("./routes/index.js")
const catRouter = require("./routes/cats.js")

// ??
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({limit: "10mb", extended: "false"})); // parse query string

// Connect routers?
app.use("/", indexRouter);
app.use("/cats", catRouter);

app.listen(process.env.PORT || 3000);
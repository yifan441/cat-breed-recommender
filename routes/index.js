const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.ejs"); // can ommit .ejs b/c we set view engine to "ejs"
})

module.exports = router;
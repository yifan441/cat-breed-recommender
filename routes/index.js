const express = require("express");
const router = express.Router();

// Get Initial Landing Page
router.get("/", (req, res) => {
  res.render("index.ejs"); // technically can ommit .ejs b/c we set view engine to "ejs"
})

// Get Form page
router.get("/form", (req, res) => {
  res.render("partials/form.ejs")
})

// Get Results Page
router.get("/results", async (req, res) => {
  const queryString = req._parsedUrl.search; 
  const url = "https://api.api-ninjas.com/v1/cats" + queryString;
  // const TEST_HTTP_CODES_URL = "https://httpstat.us/500";

  try{
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'X-Api-Key': process.env.API_KEY,
      }
    })
    if(!response.ok){
      throw response.status;
    }
    const catBreeds = await response.json();
    res.render("partials/results.ejs", {data: catBreeds});
  } 
  catch(errorStatus){
    console.error(`an error occured lmao, status code: ${errorStatus}`);
    res.render("partials/error.ejs", {errorStatusCode: errorStatus});
  }

})

module.exports = router;
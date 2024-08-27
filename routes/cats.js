const express = require("express");
const router = express.Router();

// Cat breed form
router.get("/", (req, res) => {
  res.render("cats/index")
})

// Find suitable cat breeds
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
    res.render("cats/results.ejs", {data: catBreeds});
  } 
  catch(errorStatus){
    console.error(`an error occured lmao, status code: ${errorStatus}`);
    res.render("partials/error.ejs", {errorStatusCode: errorStatus});
  }

})

module.exports = router;
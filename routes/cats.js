const express = require("express");
const router = express.Router();

// Cat breed form
router.get("/", (req, res) => {
  res.render("cats/index", {test: "this is how you send data to .ejs files"})
})

// Find suitable cat breeds
router.get("/results", async (req, res) => {
  const queryString = req._parsedUrl.search; 
  // const testingString = "?name=siamese"; 
  const url = "https://api.api-ninjas.com/v1/cats" + queryString;
  
  try{
    const results = await fetch(url, {
      method: "GET",
      headers: {
        'X-Api-Key': process.env.API_KEY
      }
    })
    if(!results.ok){
      throw new Error(`Response status: ${results.status}`);
    }
    const catBreeds = await results.json();
    console.log(catBreeds);
    res.render("cats/results.ejs", {data: catBreeds});
  } catch(error){
    console.error(`something went wrong lmao\n=> ${error.message}`)
  }

})

module.exports = router;
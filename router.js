const express = require("express");
const router = express.Router();
const articles = require("./data/articles.json");

//Page d'accueil
router.get("/", (request, response) => {
    response.render("index.ejs", {
      articlesData: articles,
    });
  });

//Rendu de chaque article selon leur ID
router.get("/article/:id", (request, response) => {
    const articleID = request.params.id;
    console.log(articleID);
  
    let articleAsked;
    // console.log(articleAsked);

    articleAsked = articles.filter((e) => e.id.toString() === articleID).pop();
    
  
    if (!articleAsked) {
      response.status(404).send("Article not found");
    }
    response.render("article.ejs", { article: articleAsked, articlesData: articles, });
  });
  
  //Filtrage des articles par categorie
router.get("/:category", (request, response) => {
  const category = request.params.category;
  console.log(category);

  let categoryAsked;

  categoryAsked = articles.filter((e) => e.category === category);
  // console.log(categoryAsked)
  

  if (!categoryAsked) {
    response.status(404).send("Article not found");
  }
  response.render("index.ejs", { articlesData: categoryAsked });
});

module.exports = router;
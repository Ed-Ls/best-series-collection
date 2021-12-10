const express = require("express");
const router = require('./router');
const app = express();
const articles = require("./data/articles.json");
const port = 3000;

//send static docs with the response
app.use(express.static("static"));

//use ejs to render views
app.set("views", "./views");
app.set("view engine", "ejs");

//Get Categories for the header
let articlesCategories = [];
let categoriesUnique;

for (article of articles){
articlesCategories.push(article.category);
categoriesUnique = [...new Set(articlesCategories)];
}

// console.log(categoriesUnique)

app.locals.categoriesUnique = categoriesUnique;

//Requests with router
app.use(router);

//Middleware pour la 404 globale
app.use((request, response, next) => {
  response.status = 404;
  response.send("Page not found");
});

app.listen(port, () => {
  console.log(`Best Series : http://localhost:${port}`);
})

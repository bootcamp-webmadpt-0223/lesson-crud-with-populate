// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// default value for title local
const projectName = "lesson-crud-populate-starter-new";
const capitalized = string =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with IronGenerator`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

const postRoutes = require("./routes/post.routes");
app.use("/", postRoutes);

const commentRoutes = require("./routes/comment.routes");
app.use("/", commentRoutes);

app.use((req, res, next) => {
  console.log("middleware");
});

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

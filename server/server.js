const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");

const app = express();

// Remplacer avec ton url mlab
const MONGO_URI =
  "mongodb://nicolascoulon:Nicolas75@ds117362.mlab.com:17362/dbnico001";
if (!MONGO_URI) {
  throw new Error("unvalid mongo db url");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useMongoClient: true
});
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab"))
  .on("error", error => console.log("Error on connect on MongoLab:", error));

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true // enable graphiql, in prod false & all data are in json and accessible , api style
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;

const path = require("path"),
  express = require("express"),
  //mongoose = require('mongoose'),
  morgan = require("morgan"),
  bodyParser = require("body-parser");
//exampleRouter = require('../routes/examples.server.routes');

module.exports.init = () => {
  // initialize app
  const app = express();

  // enable request logging for development debugging
  // app.use(morgan('dev'));

  // body parsing middleware
  app.use(bodyParser.json());

  //PROD UNCOMMENT
  // app.use(express.static(path.join(__dirname, "../../../build")));

  // console.log(__dirname);

  // // Handle React routing, return all requests to React app
  // app.get("/", function (req, res) {
  //   res.sendFile(path.join(__dirname, "../../../build", "index.html"));
  // });

  return app;
};

const fetch = require("node-fetch");
const https = require("https");

module.exports = function(app) {
  app.get("/api/admin/generate-password/", (req, res) => {
    https
      .get(
        "https://www.passwordrandom.com/query?command=password&format=json&count=2",
        resp => {
          let resData = "";
          resp.on("data", data => {
            resData += data;
          });

          resp.on("end", () => {
            res.status(200);
            res.json(JSON.parse(resData));
          });
        }
      )
      .on("error", err => {
        console.log(err);
      });
    // .then(res => {
    //   res.json();
    // })
    // .then(json => {
    //   console.log(json);
    //   res.status(200);
    //   res.json(json);
    // })
    // .catch(err => {
    //   res.status(500);
    //   res.json(err);
    // });
  });
};

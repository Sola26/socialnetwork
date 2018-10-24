const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const db = require("./db");
app.use(compression());
app.use(bodyParser.json());

app.use(
  cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
  })
);

app.use(express.static("public"));

if (process.env.NODE_ENV != "production") {
  app.use(
    "/bundle.js",
    require("http-proxy-middleware")({
      target: "http://localhost:8081/"
    })
  );
} else {
  app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(function(req, res, next) {
  if (!req.session.userId && req.url !== "/welcome") {
    res.redirect("/welcome");
  } else {
    next();
  }
});

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/welcome", function(req, res) {
  if (!req.body.password) {
    res.json({});
  } else {
    db.hashPassword(req.body.password)
      .then(hashedPw => {
        db.insertNewUser(
          req.body.first,
          req.body.last,
          req.body.email,
          hashedPw
        )
          .then(result => {
            req.session.loggedIn = true;
            req.session.userId = result.rows[0].id;
            req.session.first = req.body.first;
            req.session.last = req.body.last;
            res.redirect("/profile");
          })
          .catch(err => {
            console.log("err in first catch: ", err);
          });
      })
      .catch(err => {
        console.log("err in last catch: ", err);
      });
  }
});

// app.get("/welcome", function(req, res) {
//   if (req.session.userId) {
//     res.redirect("/");
//   } else {
//     res.sendFile(__dirname + "/index.html");
//   }
// });

app.listen(8080, function() {
  console.log("I'm listening.");
});

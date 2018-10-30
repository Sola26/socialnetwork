const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const db = require("./db.js");
const s3 = require("./s3");
const s3Url = require("./config.json");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

//////////////////////////////////////////////////////////////

app.use(compression());
app.use(bodyParser.json());

app.use(
  cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
  })
);

//////////////////////////////////////////////////////////////

app.use(express.static("public"));

////////////////////////////////////////////////////////////

const diskStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + "/uploads");
  },
  filename: function(req, file, callback) {
    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

const uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 2097152
  }
});

//////////////////////////////////////////////////////////////

app.use(csurf());

app.use(function(req, res, next) {
  res.cookie("mytoken", req.csrfToken());
  next();
});

//////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////

app.use(function(req, res, next) {
  if (!req.session.userId && req.url !== "/welcome") {
    res.redirect("/welcome");
  } else {
    next();
  }
});

//////////////////////////////////////////////////////////////

app.post("/welcome", function(req, res) {
  if (!req.body.password) {
    res.json({
      success: false
    });
  } else {
    db.hashPassword(req.body.password)
      .then(hashedPw => {
        return db
          .insertNewUser(
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            hashedPw
          )
          .then(result => {
            req.session.loggedIn = true;
            req.session.userId = result.rows[0].id;
            req.session.first = req.body.firstname;
            req.session.last = req.body.lastname;
            res.redirect("/profile");
          })
          .catch(err => {
            console.log("err in first catch in register: ", err);
          });
      })
      .catch(err => {
        console.log("err in last catch: ", err);
      });
  }
});

//////////////////////////////////////////////////////////////

// app.post("/login", function(req, res) {
//   if (!req.body.password) {
//     res.json({
//       success: false
//     });
//   } else {
//     db.getPassword(req.body.email)
//       .then(results => {
//         let password = results.rows[0].password;
//         db.checkPassword(req.body.password, password)
//           .then(result => {
//             console.log("result: ", result);
//             req.session.loggedIn = true;
//
//             res.redirect("/profile");
//           })
//           .catch(err => {
//             console.log("err in login: ", err);
//           });
//       })
//       .catch(err => {
//         console.log("err in last catch: ", err);
//       });
//   }
// });
// app.post("/login", (req, res) => {
//   if (!req.body.password) {
//     res.json({
//       success: false
//     });
//   } else {
//     db.getPassword(req.body.email)
//       .then(result => {
//         console.log("req.body.password: ", req.body.password);
//         let password = result.rows[0].password;
//         console.log(password);
//         db.checkPassword(req.body.password, password)
//           .then(getPassword => {
//             if (getPassword) {
//               req.session.loggedIn = true;
//               res.json({ success: true });
//             } else {
//               res.json({ success: false });
//             }
//           })
//           .catch(err => {
//             console.log("err in first catch: ", err);
//           });
//       })
//       .catch(err => {
//         console.log("err in last catch login post: ", err);
//       });
//   }
// });

app.post("/login", (req, res) => {
  db.getPassword(req.body.email)
    .then(result => {
      console.log("HASHED PW: ", result.rows[0].password);
      db.checkPassword(req.body.password, result.rows[0].password)
        .then(userRegistered => {
          console.log("User registered:", userRegistered);
          if (userRegistered) {
            req.session.user = {};
            req.session.user.id = result.rows[0].id;
            res.json({ success: true });
          } else {
            res.json({ success: false });
          }
        })
        .catch(err => {
          console.log("Error in checkPassword: ", err);
        });
    })
    .catch(err => {
      console.log("Error in the getPassword: ", err);
    });
});

//////////////////////////////////////////////////////////////
//
app.get("/user", function(req, res) {
  db.getUserById(req.session.userId)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(error => {
      console.log(error);
    });
});

//////////////////////////////////////////////////////////////

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
  console.log("req.session.user.id: ", req.session.user.id);
  const imgUrl = s3Url.s3Url + req.file.filename;
  db.uploadImages(imgUrl, req.session.user.id)
    .then(results => {
      console.log("results: ", results);
      res.json({ imgUrl });
    })
    .catch(error => {
      console.log(error);
    });
});

app.post("/usersbio", function(req, res) {
  db.uploadBio(req.body.bio, req.session.userID)
    .then(result => {
      res.json({ result });
    })
    .catch(err => {
      console.log("err in getUsersBio: ", err.message);
    });
});

//////////////////////////////////////////////////////////////

app.get("/logout", (req, res) => {
  req.session = null;
  console.log(req.session);
  res.redirect("/");
});

//////////////////////////////////////////////////////////////

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// app.get("/register", function(req, res) {
//   if (req.session.userId) {
//     res.redirect("/");
//   } else {
//     res.sendFile(__dirname + "/index.html");
//   }
// });

app.listen(8080, function() {
  console.log("I'm listening.");
});

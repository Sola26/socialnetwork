const spicedPg = require("spiced-pg");

const bcrypt = require("bcryptjs");

let secrets;
if (process.env.NODE_ENV === "production") {
  secrets = process.env;
} else {
  secrets = require("./secrets");
}

const dbUrl =
  process.env.DATABASE_URL ||
  `postgres:${secrets.dbUser}:${secrets.dbPassword}@localhost:5432/social`;
const db = spicedPg(dbUrl);

////////////////////////////////////////////////////////////////////////////////////

exports.insertNewUser = function(firstname, lastname, email, password) {
  const q = `
        INSERT INTO users
        (firstname, lastname, email, password)
        VALUES
        ($1, $2, $3, $4)
        RETURNING id
    `;

  const params = [
    firstname || null,
    lastname || null,
    email || null,
    password || null
  ];

  return db.query(q, params);
};

////////////////////////////////////////////////////////////////////////////////////

exports.getPassword = function(usersemail) {
  const q = `SELECT password FROM users WHERE email = $1`;
  const params = [usersemail];
  return db.query(q, params);
};

////////////////////////////////////////////////////////////////////////////////////

exports.hashPassword = function(plainTextPassword) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(function(err, salt) {
      if (err) {
        return reject(err);
      }
      bcrypt.hash(plainTextPassword, salt, function(err, hash) {
        if (err) {
          return reject(err);
        }
        resolve(hash);
      });
    });
  });
};

////////////////////////////////////////////////////////////////////////////////////

exports.checkPassword = function(
  textEnteredInLoginForm,
  hashedPasswordFromDatabase
) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(
      err,
      doesMatch
    ) {
      if (err) {
        reject(err);
      } else {
        resolve(doesMatch);
      }
    });
  });
};

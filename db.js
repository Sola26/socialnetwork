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

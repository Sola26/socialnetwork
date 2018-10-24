DROP TABLE IF EXISTS users;

CREATE TABLE users (
   id SERIAL primary key,
   firstname VARCHAR(255) NOT NULL,
   lastname VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL
);

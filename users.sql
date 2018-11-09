DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    image TEXT,
    bio TEXT
);

DROP TABLE IF EXISTS friendships CASCADE;


CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL ,
    accepted BOOLEAN DEFAULT false
);


DROP TABLE IF EXISTS chat CASCADE;

CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    chat_message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO chat (id, sender_id, chat_message, created_at) VALUES (
    '1',
    '1',
    'test',
    '2018-11-07 18:00:43.322284'
);

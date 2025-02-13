const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('twitterClone.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Database connected successfully');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS user (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        gender TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS follower (
        follower_id INTEGER PRIMARY KEY AUTOINCREMENT,
        follower_user_id INTEGER NOT NULL,
        following_user_id INTEGER NOT NULL,
        FOREIGN KEY (follower_user_id) REFERENCES user (user_id),
        FOREIGN KEY (following_user_id) REFERENCES user (user_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS tweet (
        tweet_id INTEGER PRIMARY KEY AUTOINCREMENT,
        tweet TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES user (user_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS reply (
        reply_id INTEGER PRIMARY KEY AUTOINCREMENT,
        tweet_id INTEGER NOT NULL,
        reply TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tweet_id) REFERENCES tweet (tweet_id),
        FOREIGN KEY (user_id) REFERENCES user (user_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS like (
        like_id INTEGER PRIMARY KEY AUTOINCREMENT,
        tweet_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tweet_id) REFERENCES tweet (tweet_id),
        FOREIGN KEY (user_id) REFERENCES user (user_id)
    )`);

    console.log('Tables created successfully');
});

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed');
    }
});

# Twitter-API

Twitter Clone API
This is a Twitter Clone API built using Node.js, Express.js, and SQLite. It provides endpoints for user authentication, tweeting, following users, liking tweets, and viewing feeds.

Features
User Registration and Login with JWT Authentication
Create, View, and Delete Tweets
Follow and Unfollow Users
Like and Reply to Tweets
View Timeline Feed of Followed Users
Tech Stack
Node.js - Backend runtime environment
Express.js - Web framework for Node.js
SQLite - Lightweight relational database
bcrypt - Password hashing
jsonwebtoken - JWT authentication
Prerequisites
Ensure you have the following installed on your system:

Node.js (v14 or later)
SQLite3
Installation
Clone the repository
bash
Copy
Edit
npm install
Initialize the Database
Create the SQLite database using the schema provided:

sql
Copy
Edit
CREATE TABLE user (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  username TEXT UNIQUE,
  password TEXT,
  gender TEXT
);

CREATE TABLE tweet (
  tweet_id INTEGER PRIMARY KEY AUTOINCREMENT,
  tweet TEXT,
  user_id INTEGER,
  date_time DATETIME,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE like (
  like_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  tweet_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id)
);

CREATE TABLE reply (
  reply_id INTEGER PRIMARY KEY AUTOINCREMENT,
  tweet_id INTEGER,
  user_id INTEGER,
  reply TEXT,
  FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE follower (
  follower_id INTEGER PRIMARY KEY AUTOINCREMENT,
  follower_user_id INTEGER,
  following_user_id INTEGER,
  FOREIGN KEY (follower_user_id) REFERENCES user(user_id),
  FOREIGN KEY (following_user_id) REFERENCES user(user_id)
);
Start the server
bash
Copy
Edit
npm start
The server will run at http://localhost:3000

Environment Variables
Create a .env file in the root directory and add the following:

ini
Copy
Edit
JWT_SECRET=Bhanuprakash
API Endpoints
1. User Registration
Endpoint: /register/
Method: POST
Description: Register a new user.
Request Body:
json
Copy
Edit
{
  "username": "john_doe",
  "password": "password123",
  "name": "John Doe",
  "gender": "male"
}
2. User Login
Endpoint: /login/
Method: POST
Description: User login and receive a JWT token.
Request Body:
json
Copy
Edit
{
  "username": "john_doe",
  "password": "password123"
}
Response:
json
Copy
Edit
{
  "jwtToken": "your_jwt_token"
}
3. Create a Tweet
Endpoint: /user/tweets/
Method: POST
Description: Create a new tweet.
Headers:
json
Copy
Edit
{
  "Authorization": "Bearer your_jwt_token"
}
Request Body:
json
Copy
Edit
{
  "tweet": "Hello World!"
}
4. Get User's Tweets
Endpoint: /user/tweets/
Method: GET
Description: Get all tweets of the authenticated user.
Headers:
json
Copy
Edit
{
  "Authorization": "Bearer your_jwt_token"
}
5. Get Latest Tweets Feed
Endpoint: /user/tweets/feed/
Method: GET
Description: Get the latest tweets of people whom the user follows.
Headers:
json
Copy
Edit
{
  "Authorization": "Bearer your_jwt_token"
}
6. Follow a User
Endpoint: /user/following/
Method: GET
Description: Get the list of all people the user follows.
Headers:
json
Copy
Edit
{
  "Authorization": "Bearer your_jwt_token"
}
Error Handling
400 Bad Request - Invalid input or request parameters.
401 Unauthorized - Invalid or missing JWT token.
404 Not Found - Requested resource not found.
500 Internal Server Error - Server errors or database issues.
Project Structure
php
Copy
Edit
twitter-clone-api/
│   index.js         # Entry point of the application
│   package.json     # Dependencies and scripts
│   README.md        # Project documentation
└───database/
│       twitterClone.db  # SQLite database
└───node_modules/    # Installed dependencies
Dependencies
json
Copy
Edit
"dependencies": {
  "bcrypt": "^5.0.1",
  "express": "^4.17.1",
  "jsonwebtoken": "^8.5.1",
  "sqlite": "^4.0.23",
  "sqlite3": "^5.0.2"
}
Security Considerations
Ensure strong passwords using bcrypt with a salt factor of 10.
JWT tokens are signed with a secret (Bhanuprakash) – keep this secret secure and private.
SQL queries use template literals – consider using parameterized queries to prevent SQL injection.
Author
G Bhanuprakash
Feel free to reach out at: bhanuprakash7984@gmail.com

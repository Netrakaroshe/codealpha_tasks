# URL Shortener (Task 1)

## About

This is a simple backend project where I built a URL shortener using Node.js, Express, and MongoDB.

The main idea is to take a long URL, generate a short code for it, store it in the database, and then use that short code to redirect back to the original URL.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## Features

* Accepts long URLs from user
* Generates a unique 6-character short code
* Stores URL mapping in MongoDB
* Redirects short URL to original URL
* Handles duplicate short code cases

---

## API Endpoints

### Create Short URL

**POST** `/api/url/shorten`

Request body:

```json
{
  "originalUrl": "https://example.com"
}
```

Response:

```json
{
  "message": "Url shortened successfully",
  "shortUrl": "http://localhost:3000/abc123"
}
```

---

### Redirect URL

**GET** `/:shortCode`

Example:

```
http://localhost:3000/abc123
```

This will redirect to the original URL stored in the database.

---

## How it works

1. User sends a long URL
2. Server generates a random 6-character code
3. Stores original URL and short code in MongoDB
4. When user visits short URL, server finds original URL
5. User is redirected automatically

---

## What I learned

* How routing works in Express
* How MongoDB stores and retrieves data
* How URL redirection works
* How to structure a backend project

---

## Future Improvements

* Add URL validation
* Track number of clicks
* Add expiration time for links
* Improve short code generation logic

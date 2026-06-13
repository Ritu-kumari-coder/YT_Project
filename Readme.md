# YouTube Backend API

A scalable backend application inspired by YouTube, built using **Node.js**, **Express.js**, and **MongoDB**. The project provides RESTful APIs for user management, video uploads, subscriptions, likes, comments, playlists, tweets, and channel analytics.

## Features

### Authentication & Authorization

* JWT-based authentication
* Access and refresh token management
* Secure route protection using middleware
* User profile management

### Video Management

* Upload videos and thumbnails
* Update video details
* Delete videos
* Publish/unpublish videos
* Video search functionality
* Filtering and sorting support
* Pagination for video listings

### Social Features

* Like and unlike videos
* Like and unlike comments
* Like and unlike tweets
* Subscribe and unsubscribe to channels
* Create and manage playlists
* Add and remove videos from playlists
* Comment on videos

### Dashboard & Analytics

* Total channel views
* Total videos uploaded
* Subscriber count
* Total likes received
* Channel statistics using MongoDB aggregation pipelines

### Additional Features

* Tweet creation and management
* Cloud-based media storage
* Centralized error handling
* Reusable middleware architecture

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* bcrypt

### Media Storage

* Cloudinary
* Multer

### Utilities

* MongoDB Aggregation Pipeline
* Async Handler Middleware

---

## Architecture

```text
Client
   │
   ▼
Express Routes
   │
   ▼
Controllers
   │
   ▼
Mongoose Models
   │
   ▼
MongoDB Database

Authentication
      │
      ▼
JWT Middleware

Media Upload
      │
      ▼
Cloudinary
```

---

## Project Structure

```text
src/
│
├── controllers/
│   ├── user.controller.js
│   ├── video.controller.js
│   ├── comment.controller.js
│   ├── like.controller.js
│   ├── playlist.controller.js
│   ├── subscription.controller.js
│   ├── tweet.controller.js
│   └── dashboard.controller.js
│
├── models/
├── routes/
├── middlewares/
├── utils/
├── db/
└── app.js
```

---

## Key Learning Outcomes

* REST API Design
* JWT Authentication & Authorization
* MongoDB Aggregation Pipelines
* Database Schema Design
* Middleware Architecture
* File Upload Handling
* Pagination, Filtering & Sorting
* Cloud Media Management
* Secure Backend Development

---

## API Modules

### User

* Register User
* Login User
* Logout User
* Update Profile
* Change Password
* Get Channel Profile

### Videos

* Upload Video
* Update Video
* Delete Video
* Get Video By ID
* Search Videos
* Filter Videos
* Paginated Video Feed

### Comments

* Create Comment
* Update Comment
* Delete Comment
* Get Video Comments

### Likes

* Toggle Video Like
* Toggle Comment Like
* Toggle Tweet Like

### Subscriptions

* Subscribe Channel
* Unsubscribe Channel
* Get Subscribers
* Get Subscribed Channels

### Playlists

* Create Playlist
* Update Playlist
* Delete Playlist
* Add Video To Playlist
* Remove Video From Playlist

### Dashboard

* Get Channel Statistics
* Get Uploaded Videos

---

## Environment Variables

Create a `.env` file:

```env
PORT=8000

MONGODB_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd youtube-backend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## Future Improvements

* Redis caching
* Notification system
* Watch history
* Recommendation engine
* Video view tracking optimization
* Real-time updates using WebSockets
* API documentation using Swagger
* Unit and Integration Testing

---

## Author

Developed as a backend engineering project to learn scalable API development, authentication systems, database design, and MongoDB aggregation pipelines.

# start the backend journey in MERN. 

backend with javascript.

## Here's the algo for the whole project - **youtubeClone**

  This is the clone for youtube with the following functionalities : 

  ### - **User Functionality**
  
  * **User Registration & Login**
  
    * Sign up with email and password
    * Login with authentication
    * Token-based session management (`refreshToken`)
  * **Profile Management**
  
    * Edit username, full name, avatar, cover image
    * View other users’ profiles
  
  
  ### - **Video Functionality**
  
  * **Video Upload**
  
    * Upload a video file with title, description, thumbnail
    * Set video as published/unpublished
  * **Video Viewing**
  
    * Play videos
    * View video details: title, description, views, duration
    * View published videos only
  * **Watch History**
  
    * Track recently watched videos
  * **Video Search & Filtering**
  
    * Search by title, owner, or tags (tags not present, but can be added later)
  
  ### - **Comment Functionality**
  
  * **Add Comments**
  
    * Users can comment on videos
  * **Edit/Delete Comments**
  
    * Only the comment owner can update/delete
  * **View Comments**
  
    * Show list of comments under each video
  
  ### - **Like System**
  
  * **Like Videos, Comments, and Tweets**
  
    * Like functionality is polymorphic (`video`, `comment`, `tweet`)
  * **View Like Counts**
  
    * Count likes on each item
  * **Unlike**
  
    * Toggle like status
  
  ### - **Playlist Functionality**
  
  * **Create Playlists**
  
    * Add name, description
  * **Add/Remove Videos from Playlist**
  * **View Playlist**
  
    * Show videos in a playlist
  * **Edit/Delete Playlist**
  
  ### - **Subscription System**
  
  * **Subscribe to Channels**
  
    * Users can subscribe to other users (channels)
  * **Unsubscribe**
  * **View Subscriptions**
  
    * List of subscribed channels
  * **Subscriber Count**
  
  ### - **Tweet/Micro-post Functionality**
  
  * **Post Tweets**
  
    * Users can create short content posts (like YouTube community posts)
  * **Edit/Delete Tweets**
  * **Comment and Like Tweets**
  
  ### - **Analytics & Engagement**
  
  * **Video Views**
  
    * Track view count
  * **Video Duration**
  
    * Show length of video
  * **User Engagement**
  
    * Comments, likes, and watch history

---

## File structure followed 

  ```
    ├── 📁 public/
    │   └── 📁 temp/
    ├── 📁 src/
    │   ├── 📁 controllers/
    │   │   └── user.controller.js
    │   ├── 📁 db/
    │   │   └── index.js
    │   ├── 📁 middlewares/
    │   │   └── multer.middleware.js
    │   ├── 📁 models/
    │   │   ├── user.models.js
    │   │   └── video.models.js
    │   ├── 📁 routes/
    │   │   └── user.routes.js
    │   ├── 📁 utils/
    │   │   ├── ApiErrorHandler.js
    │   │   ├── ApiResponseHandler.js
    │   │   ├── asyncHandler.js
    │   │   └── cloudinary.js
    │   ├── app.js
    │   ├── constants.js
    │   └── index.js
    ├── .env
    ├── .gitignore
    ├── .prettierignore
    ├── .prettierrc
    ├── package.json
    ├── package-lock.json
    └── Readme.md

```
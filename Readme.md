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

## **Controller Logic :**

-**User Controller** :
* Registration :-
  1. Get data fields (username , fullname , email , password , avatar , coverImage[optional] ) from the frontend in form-data.
  2. Validate the fields if any required field is empty. Used modern javascript function some() to check the data fields dynamically.
  3. Check if user already exits in db with same email and username.
     ```
     const existUser = await User.findOne({
            $or:
            [{username},{email}]
        })```
  4. Add the middleware for the upload of image in `user.route.js` before directing to `user.controller.js` This will upload the image temporarily in the browser using multer.
  5. Just like express provide `req.body` , middleware function multer will also provide the `req.files` with names `avatar` and `coverImage`.
  6. Check for the image or file for avatar and coverImage. 
      ```  console.log(req.files)
        let avatarLocalPath = req.files?.avatar[0]?.path
        let coverImageLocalPath = ""; 
        if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
            coverImageLocalPath = req.files?.coverImage[0]?.path
        }  
      ```
  7. Upload file in the cloudinary and fetch the string url of the images.
  8. Create object with user info and urls to save them in the db using `User.create`.
    ```
    const user =  await User.create({
            fullname,
            username : username.toLowerCase(),
            email,
            password,
            avatar : avatar.url,
            coverImage : coverImage?.url || ""
        })
    ```
  9. Check if the user is created in the db using `findById` and remove the fields like `password` and `-refreshToken`.
  10. Error handling is done in the standardized  manner using utils class like `ApiError`.
  11. Send the response is user is created successfully through `ApiResponse`.

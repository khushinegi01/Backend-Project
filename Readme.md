# start the backend journey in MERN. 

Backend with javascript.

## Here's the Flow for the whole project - **youtubeClone**

  This is the clone for youtube with the following functionalities : 

  ### - **User Functionality**
  
  * **User Registration & Login**
    - Sign up with email and password
    - Login with authentication
    - Token-based session management (`refreshToken`)
      
  * **Profile Management**
    - Edit username, full name, avatar, cover image
    - View other users’ profiles
  
  ### - **Video Functionality**
  
  * **Video Upload**
    - Upload a video file with title, description, thumbnail
    - Set video as published/unpublished
      
  * **Video Viewing**
    - Play videos
    - View video details: title, description, views, duration
    - View published videos only
      
  * **Watch History**
    - Track recently watched videos
      
  * **Video Search & Filtering**
    - Search by title, owner, or tags (tags not present, but can be added later)
  
  ### - **Comment Functionality**
  
  * **Add Comments**
    - Users can comment on videos
      
  * **Edit/Delete Comments**
    - Only the comment owner can update/delete
   
  * **View Comments**
    - Show list of comments under each video
  
  ### - **Like System**
  
  * **Like Videos, Comments, and Tweets**
    - Like functionality is polymorphic (`video`, `comment`, `tweet`)
      
  * **View Like Counts**
    - Count likes on each item
      
  * **Unlike**
    - Toggle like status
  
  ### - **Playlist Functionality**
  
  * **Create Playlists**
    - Add name, description
      
  * **Add/Remove Videos from Playlist**
    
  * **View Playlist**
    - Show videos in a playlist
      
  * **Edit/Delete Playlist**
  
  ### - **Subscription System**
  
  * **Subscribe to Channels**
    - Users can subscribe to other users (channels)
      
  * **Unsubscribe**
    
  * **View Subscriptions**
    - List of subscribed channels
      
  * **Subscriber Count**
  
  ### - **Tweet/Micro-post Functionality**
  
  * **Post Tweets**
    - Users can create short content posts (like YouTube community posts)
      
  * **Edit/Delete Tweets**

  * **Comment and Like Tweets**
  
  ### - **Analytics & Engagement**
  
  * **Video Views**
    - Track view count
      
  * **Video Duration**
    - Show length of video
      
  * **User Engagement**
    - Comments, likes, and watch history

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


* Register User :-
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

---

* Login User:-
    1. Get the credentials `{ username, email , password }` from the users from request body.
    2. Check if credentails is empty, here we are checking both email and username as valid credentials for login.
    3. If the username and email returns user from the db using findOne, we will go for the password verification , if not throw error that user doesn't exist.
    4. The password is verified with the help of the method `isPasswordCorrect(password)` in the user modal.
    5. This method uses bcrypt's compare function to compare the password provided in the parameter with the user password in stored in db.
    6. If the `isPasswordCorrect` return false , throw error `Invalid Password`.
    7. After successfully verifying the user , we need to generate the tokens `{accessToken , refreshToken}` for the valid user with the help of function created as `generateRefreshTokenAndAccessToken()` which takes user._id as parameter.
    ```
          const generateRefreshTokenAndAccessToken = async function(userId){
              try {
                  const user = await User.findById(userId)
                  const accessToken = await user.generateAccessToken() // called the method from the user model
                  const refreshToken = await user.generateRefreshToken() // called the method from the user model
                 user.refreshToken = refreshToken;
                 await user.save({ validateBeforeSave: false });
                 return {accessToken , refreshToken}
              }
              catch(error) {
                  throw new ApiError(500 , "Something Went Wrong in Logging In User :: ")
              }
          
          }
    ```
    8. Now that the user token are created the successfully , we need to call the db function findOne again to remove the password and the other unnesscerary fields from the user. There is also another way to do so if db call is expensive , i.e. edit the user from before. 
    ```
          const loggedUser = await User.findById(user._id).select(
          "-password -refreshToken"
          )
    ```
    9. After filtering the user data , now let set tokens in the cookies and return the `loggedUser` in the response along with 200 response status.
    ```
      res
       .status(200)
       .cookie("accessToken" , accessToken , options)
       .cookie("refreshToken" , refreshToken , options)
       .json(
        new ApiResponse(
            200,
            {
                accessToken ,refreshToken , loggedUser
            },
            "User Logged In Successful."
        )
       )
    ```
    10. Error handling with ApiError and response through ApiResponse , options in cookies set the cookie in httpOnly and secure.
 
---


* Logout User :-
    1. For logging out the user we need to remove the tokens for the cookies (accessToken and refreshToken) and from the db (refreshtoken).
    2. To remove the value to refreshToken in the db , we can use `findByIdAndUpdate` function to find the user with the id taken from the req.user and updating the refreshToken to null.This will replace the value refreshToken in db to null.
    3. To clear the value from the cookie , we will use `clearCookie`.
    ```
     res
       .status(200)
       .clearCookie("accessToken" ,options)
       .clearCookie("refreshToken" , options)
       .json(
        new ApiResponse(
            200,
            "User Logout Successful."
        )
       )
    ```

---


* Regerenate Access Token  :-
    1. This controller function handle the situation that in specific time if the user has logged once ,he/she doesn't have to login again and again. The controller will verify the user refreshToken from cookie and decode the token with the help sercret key, this will return user id which will find the user in db.
    2.  after getting the user from db and cookie we will compare them ,and if match we will generate new accessToken and refreshToken using `generateRefreshTokenAndAccessToken`.
    3.  Set the newly generated Token in cookie and response.
 
---


* Change User Password :-
    1. This controller help the user to change their password.
    2. Get the current password and new password from the req.body.
    3. Get the user information from the db through req.user._id.
    4. Now validate the current password field send by user with the password from the user info through method `isPasswordCorrect`.
    5. Now , replace the password and save the password without validation before save set as false.


---


* Get Current User :-
    1. Since the user already exist in the request body , we can get the user from `req.user` .
    2. Send the response return as
       ```javascript
             return res.status(200)
              .json(
                  new ApiResponse(
                      200 , 
                      req.user,
                      "Current User Fetched"
                  )
              )
        ```

---

* Update User Details :-
    1. Get the fields that are to be updated from the `req.body`.
    2. Validate that the fields are provided otherwise send error message through ApiError class.
    3. If the user exist use the mongoose function `findByIdAndUpdate` , this function finds the user on the basis of the mongo generated id with the help of `req.user._id` and uses set function to set the new values .
    4. Use the `new : true` option which tells Mongoose to return the updated document, not the original.
    5. We use .select("-password -refreshToken") to exclude sensitive information like the password and refresh token from the returned user object.
    6. And then , send the response through the ApiResponse class , sending the status code along with the user object and fetched message .
 
---


* Update User Avatar :-
    1. Get the avatarLocalPath from the req.file.path option provided by the multer middleware .
    2. Check that the file path exit otherwise throw the error through the ApiError class.
    3. By `uploadToCloudinary` function created in the `utils/cloudinary.js` file upload the file by sending the local path to the function , this will upload the image in the cloudinary server and will provide object containing the public url to fetch the file in `avatar` variable.
    4. Check that avatar contains values , and if not throw error.
    5. To set the avatar url in db , use the `findByIdAndUpdate` option to get the user with new updated avatar url and filter data removing the sensitive data like password and refreshToken.
    6. And then , send the response through the ApiResponse class , sending the status code along with the user object and fetched message .

---


* Update User CoverImage :-
     1. This function follows the similar step as update avatar .
 
---

 
* Get User Channel :-
      1. Get the username from the url using `req.parmam.username`.
      2. 

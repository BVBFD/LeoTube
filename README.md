***

# LeoTube CRUD Project

## Video Upload Websites

> This is the Video Upload Websites where you can upload video and watch.

> I code this websites designed with `HTML`, `Styled-Components CSS`, `TypeScript`, `React`, `NodeTS`, `Redux Toolkit`, `Firebase Storage`, `Firebase Auth`. 

> And, I hosted this website's client and server by `VPS from Hostinger` being manipulated by `Nginx`.

> This is on developing progress stage now.

<br>

### 1. Login with Session Storage - MongoDB

***

https://user-images.githubusercontent.com/83178592/192127797-18289b3c-088e-4b4f-bcbf-ad23a7a5d24d.mp4

<br>

- The Login System is implemented by the `Redux Toolkits` on Client and `Session`, `JWT Token` on Server.
- When you typed the ID and PassWord on the Client Side, the Server Side will look for the User Data from the MongoDB.
- After having found User Data from MongoDB, It compares the saved `bcrypted password` with incoming password data from Client Side.
- If all the process above has passed, the unique "_id " of the User data would be changed into `JWT Token` and saved in `Session Storage` of MongoDB.
- And, The JWT Token will be always returned to the Client as a header data in order to be tested if the user is editable user or not.
- I saved the `IP address` of initial login place for securities reasons in the Session storage _- on developing now_ 

<br>

### 2. Logout with Session Storage - MongoDB

***

https://user-images.githubusercontent.com/83178592/192127800-59386317-82b7-4fa0-b08d-980976942821.mp4

<br>

- When you click the Logout button on the client side, the User Data will be deleted from `Redux Toolkits State`.
- And, the User Data will be deleted from `Session Storage` which is existed in `MongoDB` by `connect-mongo` module on the Server Side.

<br>

### 3. Upload Video and Img by Firebase Storage

***

https://user-images.githubusercontent.com/83178592/192129238-47a9c36c-766e-4568-ba2e-c84cc53aa622.mp4

<br>

- I uploaded video, image materials in the `firebase storage` at first.
- And then, It returns the `URL` of the uploaded materials.
- After all the processes above, the uploaded video data will be saved in `MongoDB` as well.
- On the Server Side, It test the `JWT Token` as `middleware` if the user has the right to edit and add video.

<br>

### 4. Search

***

https://user-images.githubusercontent.com/83178592/192129477-e10bd0e8-1b51-4738-89f4-2e28184f18f4.mp4

<br>

- It will search Data from the input typed string data.
- It will search Data no matter that It is `Uppercase`, `Lowercase` or `whitespace` and `special lettter` in the string data.

<br>

### 5. Like and Dislike

***

https://user-images.githubusercontent.com/83178592/192129666-49f93a2e-27b8-4bdd-80bb-cb1185ce35f9.mp4

<br>

- You can click the `like`, the `dislike` and the `subscribe` button like above.
- Whenever clicking the button, the changed data is reflected on server side as well. 

<br>

***

[Visit To the Leotube](http://37.44.244.229:81/)

_I created this websites to practice how to upload video and image materials in the websites._

_`This project is on developing.` I will develope this websites for uploading my videos for tutoring IT Tech._

_I will develop this website by using this website to show my videos to public._

***

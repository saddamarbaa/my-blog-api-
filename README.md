# **Blog API Application Project**

## Tech Stack

**Server:** Node, Express, Typescript, MongoDB, Mongoose, JWT

# API FEATURES

- Authentication & Authorization
- Post CRUD operations
- Comment functionality
- System blocking user if inactive for 30 days
- Admin can block a user
- A user can block different users
- A user who block another user cannot see his/her posts
- Last date a post was created
- Check if a user is active or not
- Check last date a user was active
- Changing user award base on number of posts created by the user
- A user can follow and unfollow another user
- Get following and followers count
- Get total profile viewers count
- Get posts created count
- Get blocked counts
- Get all users who views someone's profile
- Admin can unblock a blocked user
- Update password
- Profile photo uploaded
- A user can close his/her account

# ENDPOINTS

- [API Authentication](#API-Authentication)

  - [ Register a new API client](#Register-a-new-API-client)
  - [ login](#User-Login)

- [Users](#api)

  - [Get my profile](#get-my-profile)
  - [Get all users](#Get-all-users)
  - [View a user profile Count](#view-a-user-profile)
  - [Following a user](#Following-a-user)
  - [#UnFollowing-a-user](#UnFollowing-a-user)
  - [Update user password](#Update-user-password)
  - [Update your profile](#Update-your-profile)
  - [Block another user](#Block-user)
  - [Unblock another user](#Unblock-user)
  - [Admin blocking a user](#Admin-blocking-a-user)
  - [Admin Unblocking a user](#Admin-unblocking-a-user)
  - [Delete your account](#Delete-your-account)
  - [Upload Profile Photo](#Upload-Profile-Photo)

- [Posts](#Posts-API-Refeference)

  - [Create Post](#Create-Post)
  - [Get All Posts](#Get-All-Posts)
  - [Get Single Post](#Get-Single-Post)
  - [Toggle Post like](#Toggle-Post-like)
  - [Toggle Post dislike](#Toggle-Post-dislike)
  - [Update Post](#Update-Post)
  - [Delete Post](#Delete-Post)

- [Comments](#Comment-API-Reference)
  - [Create comment](#Create-Comment)
  - [Update post](#Update-Comment)
  - [Delete post](#Delete-Comment)

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run server
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URL`

##### baseURL = `https://blog-api-v3-inovotek.onrender.com/`

# API Authentication

Some endpoints may require authentication for example. To create a create/delete/update post, you need to register your API client and obtain an access token.

The endpoints that require authentication expect a bearer token sent in the `Authorization header`.

**Example**:

`Authorization: Bearer YOUR TOKEN`

## Register a new API client

```http
POST /api/v1/auth/signup
```

The request body needs to be in JSON format.

# **API Reference**

## **User Signup**

```http
POST /api/v1/auth/signup
```


| Parameter         | Type      | Description                           | Required |
| `authentication` | `string` | Your token    | no       |
| :---------------- | :-------- | :------------------------------------ | :------- |
| `firstName`       | `string`  | User's first name (3-15 characters)   | yes      |
| `lastName`        | `string`  | User's last name (3-15 characters)    | yes      |
| `email`           | `string`  | Valid email address                   | yes      |
| `password`        | `string`  | Minimum 6 characters                  | yes      |
| `confirmPassword` | `string`  | Must match the password               | yes      |
| `bio`             | `string`  | User's bio (max 500 characters)       | no       |
| `skills`          | `array`   | Array of skills (optional)            | no       |
| `profileUrl`      | `string`  | Valid URL for profile picture         | no       |
| `acceptTerms`     | `boolean` | Accept the terms and conditions       | no       |
| `phoneNumber`     | `string`  | Phone number (E.164 format)           | no       |
| `gender`          | `string`  | Gender: male, female, or other        | no       |
| `userAward`       | `string`  | Award options based on defined values | no       |
| `plan`            | `string`  | Plan options based on defined values  | no       |
| `dateOfBirth`     | `date`    | User's date of birth                  | no       |

Example Request Body:

```javascript
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "password": "yourpassword",
  "confirmPassword": "yourpassword",
  "bio": "This is my bio",
  "skills": ["JavaScript", "Node.js"],
  "profileUrl": "http://example.com/profile.jpg",
  "acceptTerms": true,
  "phoneNumber": "+1234567890",
  "gender": "male",
  "userAward": "Best Developer",
  "plan": "premium",
  "dateOfBirth": "1990-01-01"
}

```



## **Verify Email**

```http
POST /api/v1/auth/verify-email/:userId/:token

```

| Parameter         | Type      | Description                           | Required |
| `authentication`  | `string`  | Your token    | no       |
| :---------------- | :-------- | :------------------------------------ | :------- |
| `userId`          | `string`  | The ID of the user whose email is being verified   | yes      |
| `token`           | `string`  | The email verification token | yes      |

Example request body:

```javascript
POST /api/v1/auth/verify-email/12345/your-verification-token
```


## **User Login**

```http
POST /api/v1/auth/login
```

| Parameter        | Type     | Description   | Required |
| :--------------- | :------- | :------------ | :------- |
| `authentication` | `string` | Your token    | no       |
| `email`          | `string` | Your email    | yes      |
| `password`       | `string` | Your password | yes      |

Example request body:

```javascript
{
  "email":"your email"
  "password":"your password"
}
```


## **User Logout**

```http
POST /api/v1/auth/logout
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------  | :------- |
| `authentication` | `string` | Your authToken     | no   |
| `refreshToken`   | `string` | Your refreshToken   | yes     |

Example request body:

```javascript
{
  "refreshToken":"your refreshToken"
}
```


## **Delete Account**

```http
POST /api/v1/auth/remove/:userId
```

| Parameter        | Type     | Description      | Required |
| :--------------- | :------- | :------------                      | :------- |
| `authentication` | `string` | Your authToken     | yes           |
| `userId`         | `string` | The ID of the user to be deleted   | yes     |


Example request body:'

To delete a user, send a DELETE request with the userId in the URL path:

```javascript
{
 DELETE /api/v1/auth/remove/60b73f8a4f1c2b001c45d1d5
}
```



## **Update Account**

```http
PATCH  /api/v1/auth/update/:userId
```


| Parameter         | Type      | Description                           | Required |
| `authentication` | `string` | Your token    | yes       |
| :---------------- | :-------- | :------------------------------------ | :------- |
| `firstName`       | `string`  | User's first name (3-15 characters)   | no       |
| `lastName`        | `string`  | User's last name (3-15 characters)    | no      |
| `email`           | `string`  | Valid email address                   | no       |
| `bio`             | `string`  | User's bio (max 500 characters)       | no       |
| `skills`          | `array`   | Array of skills (optional)            | no       |
| `profileUrl`      | `string`  | Valid URL for profile picture         | no       |
| `phoneNumber`     | `string`  | Phone number (E.164 format)           | no       |
| `gender`          | `string`  | Gender: male, female, or other        | no       |
| `userAward`       | `string`  | Award options based on defined values | no       |
| `plan`            | `string`  | Plan options based on defined values  | no       |
| `dateOfBirth`     | `date`    | User's date of birth                  | no       |

Example Request Body:

```javascript
{
 PATCH  /api/v1/auth/updat/60b73f8a4f1c2b001c45d1d5
}
```

```javascript
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "bio": "This is my bio",
  "skills": ["JavaScript", "Node.js"],
  "profileUrl": "http://example.com/profile.jpg",
  "acceptTerms": true,
  "phoneNumber": "+1234567890",
  "gender": "male",
  "userAward": "Best Developer",
  "plan": "premium",
  "dateOfBirth": "1990-01-01"
}

```



## **Get new access and refresh token**

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------  | :------- |
| `authentication` | `string` | Your authToken     | no   |
| `refreshToken`   | `string` | Your refreshToken    | yes     |

Example request body:

```javascript
{
  "refreshToken":"your refreshToken"
}
```



## **Get my profile**

```http
GET /api/v1/auth/profile
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |




## **Forgot Password**

```http
POST /api/v1/auth/forget-password
```


| Parameter         | Type      | Description              Required |
| `authentication`  | `string` | Your token    | no       |
| :---------------- | :-------- | :------------------------------------ | :------- |
| `refreshToken`    | `string`  | Your refresh token      | yes       |
| `email`           | `string`  | Valid email address     | yes       |

 Example Request Body:

```javascript
{
  "refreshToken": "eyJhbGciOi",
  "email": "testverstion5@gmail.com"
}

```



## **Rest Password**

```http
POST /api/v1/auth/reset-password/:userId/:token
```


| Parameter         | Type      | Description                           | Required |
| `authentication` | `string` | Your token    | no       |
| :---------------- | :-------- | :------------------------------------ | :------- |
| `userId`          | `string`  | User id    | yes                     |
| `token`           | `string`  | The rest password verification token | yes      |
| `password`        | `string`  | Minimum 6 characters                  | yes      |
| `confirmPassword` | `string`  | Must match the password               | yes      |


Example Request Body:

```javascript

POST /api/v1/auth/reset-password/userid/token
```

```javascript
{
  "password": "12345test8",
  "confirmPassword":  "12345test8"
}





## **Get all users**

```http
GET /api/v1/users/users
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | no       |

## **view a user profile**

```http
GET /api/v1/users/profile-viewers/:id
```

| Parameter        | Type     | Description                                 | Required |
| :--------------- | :------- | :------------------------------------------ | :------- |
| `authentication` | `string` | Your token                                  | yes      |
| `id`             | `string` | ID of the user you want to view his profile | yes      |

#### **Following a user**

```http
GET /api/v1/users/following/:id
```

| Parameter        | Type     | Description                       | Required |
| :--------------- | :------- | :-------------------------------- | :------- |
| `authentication` | `string` | Your token                        | yes      |
| `id`             | `string` | ID of the user you want to follow | yes      |

## **UnFollowing a user**

```http
GET /api/v1/users/unfollowing/:id
```

| Parameter        | Type     | Description                       | Required |
| :--------------- | :------- | :-------------------------------- | :------- |
| `authentication` | `string` | Your token                        | yes      |
| `id`             | `string` | ID of the user you want to follow | yes      |


```

## **Block another user**

```http
PUT /api/v1/users/block/:id
```

| Parameter        | Type     | Description                      | Required |
| :--------------- | :------- | :------------------------------- | :------- |
| `authentication` | `string` | Your token                       | yes      |
| `id`             | `string` | Id of the user you want to block | yes      |

## **Unblock user**

```http
PUT /api/v1/users/unblock/:id
```

| Parameter        | Type     | Description                        | Required |
| :--------------- | :------- | :--------------------------------- | :------- |
| `authentication` | `string` | Your token                         | yes      |
| `id`             | `string` | Id of the user you want to unblock | yes      |

## **Admin blocking a user**

```http
PUT /api/v1/users/admin-block/:id
```

| Parameter        | Type     | Description                      | Required |
| :--------------- | :------- | :------------------------------- | :------- |
| `authentication` | `string` | Your token                       | yes      |
| `id`             | `string` | Id of the user you want to block | yes      |

## **Admin unblocking a user**

```http
PUT /api/v1/users/admin-unblock/:id
```

| Parameter        | Type     | Description                        | Required |
| :--------------- | :------- | :--------------------------------- | :------- |
| `authentication` | `string` | Your token                         | yes      |
| `id`             | `string` | Id of the user you want to unblock | yes      |



## **Upload Profile Photo**

```http
  DELETE /api/v1/users/profile-photo-upload
```

| Parameter        | Type     | Description     | Required |
| :--------------- | :------- | :-------------- | :------- |
| `authentication` | `string` | Your token      | yes      |
| `profilePhoto`   | `string` | Image to upload | yes      |

# **Posts API Refeference**

## **Create Post**

```http
  POST /api/v1/posts
```

| Parameter        | Type     | Description        | Required |
| :--------------- | :------- | :----------------- | :------- |
| `authentication` | `string` | Your token         | yes      |
| `title`          | `string` | Post title         | yes      |
| `description`    | `string` | Post description   | yes      |
| `category`       | `string` | ID of the category | yes      |
| `photo`          | `string` | Image of the post  | yes      |

Example request body:

```javascript
{
  "title":"value",
  "description":"value",
  "category":"value",
  "photo":"photo",
}
```

## **Get All Posts**

```http
  GET /api/v1/posts
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | no       |

## **Get Single Post**

```http
  GET /api/v1/posts/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the post | yes      |

## **Toggle Post like**

```http
  GET /api/v1/postslikes/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the post | yes      |

## **Toggle Post dislike**

```http
  GET /api/v1/posts/dislikes/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the post | yes      |

## **Update Post**

```http
  PUT /api/v1/posts/:id
```

| Parameter        | Type     | Description             | Required |
| :--------------- | :------- | :---------------------- | :------- |
| `authentication` | `string` | Your token              | yes      |
| `id`             | `string` | ID of the post          | yes      |
| `title`          | `string` | title of the post       | yes      |
| `description`    | `string` | description of the post | yes      |
| `category`       | `string` | category of the post    | yes      |
| `photo`          | `string` | photo of the post       | yes      |

Example request body:

```javascript
{
  "title":"value",
  "description":"value",
  "category":"value",
  "photo":"photo",
}
```

## **Delete Post**

```http
  GET /api/v1/posts/dislikes/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the post | yes      |

# **Comment API Reference**

## **Create Comment**

```http
  POST /api/v1/comments/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the post | yes      |

## **Delete Comment**

```http
  DELETE /api/v1/comments/:id
```

| Parameter        | Type     | Description       | Required |
| :--------------- | :------- | :---------------- | :------- |
| `authentication` | `string` | Your token        | yes      |
| `id`             | `string` | ID of the comment | yes      |

## **Update Comment**

```http
  PUT /api/v1/comments/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the post | yes      |

## Feedback

If you have any feedback, please reach out to us at saddamarbaas@gmail.com



## 🔗 Social Links

[![linkedin](https://img.shields.io/badge/linkedin-Code?style=for-the-badge&logo=linkedin&logoColor=white&color=0077B5)](https://www.linkedin.com/in/saddamarbaa/)

[![twitter](https://img.shields.io/badge/twitter-Code?style=for-the-badge&logo=twitter&logoColor=white&color=1DA1F2)](https://twitter.com/ArbaaSaddam)

## Author

- [@saddamarbaa](https://github.com/saddamarbaa)

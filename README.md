# **Blog REST API**

An open-source RESTful API built with Node.js, Express, MongoDB, and TypeScript, offering user authentication, blog management, and advanced features like filtering, pagination, sorting, and search.

# **Tech Stack**

### **Backend Framework & Libraries**

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database for storing and managing data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **TypeScript**: Superset of JavaScript that adds static typing, enabling better development tools and error checking.
- **JWT (jsonwebtoken)**: JSON Web Token for handling authentication and authorization.

### **Security & Middleware**

- **bcrypt**: Library for hashing passwords to store them securely.
- **cookie-parser**: Middleware for handling cookies in requests.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
- **helmet**: Helps secure Express apps by setting various HTTP headers.
- **dotenv**: Loads environment variables from `.env` files into `process.env`.
- **dotenv-safe**: Ensures required environment variables are set.

### **Validation & Error Handling**

- **Joi**: Data validation library for JavaScript, used for request validation.
- **http-errors**: Simplifies creating HTTP errors for better error handling.

### **File Uploading**

- **multer**: Middleware for handling `multipart/form-data`, used for file uploads (like profile images).

### **Logging & Monitoring**

- **morgan**: HTTP request logger middleware for Node.js.

### **Swagger for API Documentation**

- **swagger-jsdoc**: Generates API documentation from JSDoc comments.
- **swagger-ui-express**: Middleware to serve Swagger UI for API documentation.

### **Utilities & Other Libraries**

- **uuid**: Library for generating unique identifiers, useful for handling user sessions or database records.
- **node-fetch**: A lightweight library for making HTTP requests.
- **resend**: Tool for handling email sending and verification.
- **yamljs**: A library for parsing and writing YAML files.
- **check-lint**: Linter checker for code quality.
- **colors**: Library for adding color to console logs.
- **tsconfig-paths**: TypeScript module to support path mapping in `tsconfig.json`.

### **Dev Tools & Testing**

- **ESLint**: Linter for identifying and fixing problems in JavaScript code.
- **Prettier**: Code formatter to maintain consistent code style.
- **Jest**: JavaScript testing framework, used for unit and integration tests.
- **Supertest**: Library for testing HTTP requests and responses.
- **Nodemon**: Tool for automatically restarting the Node.js application when file changes are detected.
- **ts-jest**: A Jest transformer for TypeScript.
- **ts-node**: TypeScript execution engine for Node.js.
- **simple-git-hooks**: Simple tool to manage git hooks, such as pre-commit or pre-push hooks.
- **rimraf**: Used for removing files or directories recursively, similar to `rm -rf`.

### **Code Quality & Formatting**

- **eslint-plugin-import**: ESLint plugin for ensuring proper import syntax and organization.
- **eslint-plugin-prettier**: Integrates Prettier with ESLint.
- **eslint-plugin-simple-import-sort**: Sorts imports for better organization and readability.
- **eslint-config-airbnb-base**: Airbnb’s base ESLint configuration for JavaScript/TypeScript.
- **eslint-config-prettier**: Configures ESLint to work with Prettier.
- **eslint-import-resolver-typescript**: Resolves TypeScript paths in ESLint.

---

# **API Features**

### **Authentication & Authorization**

- User can sign up, log in, and log out.
- Token-based authentication (JWT).
- Users can refresh their tokens.
- Password reset functionality.
- Email verification during signup.

### **Post CRUD Operations**

- Create, read, update, and delete posts.
- Admin can perform post management actions (create, update, delete, clear all posts, delete posts for a user).

### **Comment Functionality**

- Users can comment on posts.
- Admin can delete comments in posts or clear all comments for a specific post.

### **User Management**

- System blocks a user if inactive for 30 days.
- Admin can block or unblock a user.
- A user can block other users.
- A user who blocks another user cannot see their posts.
- Users can follow and unfollow other users.
- Users can update their password.
- Users can upload a profile photo.
- Users can close their account.

### **Admin Management**

- **Admin User Management**:
  - Admin can add, get, update, or remove users.
  - Admin can view all users.
  - Admin can update user details (like profile and permissions).
- **Admin Post Management**:
  - Admin can create, read, update, or delete posts.
  - Admin can delete all posts for a specific user.
  - Admin can clear all posts in the system.
- **Admin Comment Management**:
  - Admin can delete all comments in a post.
  - Admin can delete specific comments in a post.

### **Post and User Activity Tracking**

- Track the last date a post was created.
- Check if a user is active or not.
- Check the last date a user was active.
- Change user awards based on the number of posts created by the user.

### **User Statistics**

- Get following and followers count.
- Get total profile viewers count.
- Get the number of posts created.
- Get blocked users count.
- Get all users who view someone's profile.

---

# ENDPOINTS

- [API Authentication](#API-Authentication)

  - [User Signup](#user-signup)
  - [User Login](#user-login)
  - [User Logout](#user-logout)
  - [Refresh Token](#refresh-token)
  - [Remove Account](#remove-account)
  - [Get Profile](#get-profile)
  - [Upload Profile Photo](#Upload-Profile-Photo)
  - [Verify Email](#verify-email)
  - [Update User Profile](#update-user-profile)
  - [Forget Password](#forget-password)
  - [Reset Password](#reset-password)

- [Users](#users-api-reference)

  - [Get all users](#Get-all-users)
  - [View a user profile Count](#view-a-user-profile)
  - [Following a user](#Following-a-user)
  - [UnFollowing-a-user](#UnFollowing-a-user)
  - [Block another user](#Block-user)
  - [Unblock another user](#Unblock-user)

- [Admin](#admin-api-reference)

  - [Admin Block a User](#admin-blocking-a-user)
  - [Admin Unblock a User](#admin-unblocking-a-user)
  - [Admin Delete User Account](#admin-delete-user-account)
  -

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

## **Getting Started**

### **Prerequisites**

- Node.js (v20.1.0.x or higher)
- MongoDB (Running locally or via MongoDB Atlas)

## Run Locally

Clone the project

```bash
  git clone https://github.com/saddamarbaa/node-express-mongodb-typescript-blog-rest-api
```

Go to the project directory

```bash
  cd node-express-mongodb-typescript-blog-rest-api
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

To run this project, you will need to add the necessary environment variables to your .env file by checking .env.example for reference.

# API Authentication

Some endpoints may require authentication. For example, to create, delete, or update a post, you need to register your API client and obtain an access token.

Upon successful login, the server will return both the access token and refresh token, which are stored as cookies.

## Making Authenticated Requests

For future requests, you need to pass the token in the `Authorization` header, or it will automatically be retrieved from cookies.

### **Example Authorization Header**:

```http
Authorization: Bearer YOUR_TOKEN
```

Alternatively, if the Authorization header is not provided, the token will be checked in the cookies:

- `authToken` (primary token)
- `accessToken` (backup token)

If neither token is provided, the request will be denied with an authentication error.

The request body needs to be in JSON format.

# **Authentication API Reference**

## **User Signup**

```http
POST /api/v1/auth/signup
```

| Parameter | Type | Description | Required |
| `authentication` | `string` | Your token | no |
| :---------------- | :-------- | :------------------------------------ | :------- |
| `firstName` | `string` | User's first name (3-15 characters) | yes |
| `lastName` | `string` | User's last name (3-15 characters) | yes |
| `email` | `string` | Valid email address | yes |
| `password` | `string` | Minimum 6 characters | yes |
| `confirmPassword` | `string` | Must match the password | yes |
| `bio` | `string` | User's bio (max 500 characters) | no |
| `skills` | `array` | Array of skills (optional) | no |
| `profileUrl` | `string` | Valid URL for profile picture | no |
| `acceptTerms` | `boolean` | Accept the terms and conditions | no |
| `phoneNumber` | `string` | Phone number (E.164 format) | no |
| `gender` | `string` | Gender: male, female, or other | no |
| `userAward` | `string` | Award options based on defined values | no |
| `plan` | `string` | Plan options based on defined values | no |
| `dateOfBirth` | `date` | User's date of birth | no |

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
GET /api/v1/auth/verify-email/:userId/:token

```

| Parameter | Type | Description | Required |
| `authentication` | `string` | Your token | no |
| :---------------- | :-------- | :------------------------------------ | :------- |
| `userId` | `string` | The ID of the user whose email is being verified | yes |
| `token` | `string` | The email verification token | yes |

Example request body:

```javascript
GET /api/v1/auth/verify-email/:userId/:token
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

| Parameter        | Type     | Description       | Required |
| :--------------- | :------- | :---------------- | :------- |
| `authentication` | `string` | Your authToken    | no       |
| `refreshToken`   | `string` | Your refreshToken | yes      |

Example request body:

```javascript
{
  "refreshToken":"your refreshToken"
}
```

## **Delete Account**

```http
DELETE /api/v1/auth/remove/:userId
```

| Parameter        | Type     | Description                      | Required |
| :--------------- | :------- | :------------------------------- | :------- |
| `authentication` | `string` | Your authToken                   | yes      |
| `userId`         | `string` | The ID of the user to be deleted | yes      |

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

| Parameter | Type | Description | Required |
| `authentication` | `string` | Your token | yes |
| :---------------- | :-------- | :------------------------------------ | :------- |
| `firstName` | `string` | User's first name (3-15 characters) | no |
| `lastName` | `string` | User's last name (3-15 characters) | no |
| `email` | `string` | Valid email address | no |
| `bio` | `string` | User's bio (max 500 characters) | no |
| `skills` | `array` | Array of skills (optional) | no |
| `profileUrl` | `string` | Valid URL for profile picture | no |
| `phoneNumber` | `string` | Phone number (E.164 format) | no |
| `gender` | `string` | Gender: male, female, or other | no |
| `userAward` | `string` | Award options based on defined values | no |
| `plan` | `string` | Plan options based on defined values | no |
| `dateOfBirth` | `date` | User's date of birth | no |

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

| Parameter        | Type     | Description       | Required |
| :--------------- | :------- | :---------------- | :------- |
| `authentication` | `string` | Your authToken    | no       |
| `refreshToken`   | `string` | Your refreshToken | yes      |

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

## **Upload Profile Photo**

```http
  DELETE /api/v1/users/profile-photo-upload
```

| Parameter        | Type     | Description     | Required |
| :--------------- | :------- | :-------------- | :------- |
| `authentication` | `string` | Your token      | yes      |
| `profilePhoto`   | `string` | Image to upload | yes      |

## **Forgot Password**

```http
POST /api/v1/auth/forget-password
```

| Parameter | Type | Description Required |
| `authentication` | `string` | Your token | no |
| :---------------- | :-------- | :------------------------------------ | :------- |
| `refreshToken` | `string` | Your refresh token | yes |
| `email` | `string` | Valid email address | yes |

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

| Parameter | Type | Description | Required |
| `authentication` | `string` | Your token | no |
| :---------------- | :-------- | :------------------------------------ | :------- |
| `userId` | `string` | User id | yes |
| `token` | `string` | The rest password verification token | yes |
| `password` | `string` | Minimum 6 characters | yes |
| `confirmPassword` | `string` | Must match the password | yes |

Example Request Body:

```javascript
POST / api / v1 / auth / reset - password / userId / token;
```

```javascript
{
  "password": "12345test8",
  "confirmPassword":  "12345test8"
}
```

# **Users API Reference**

## **Get all users**

```http
GET /api/v1/user/users
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

## **View a user profile**

```http
GET /api/v1/user/:id
```

| Parameter        | Type     | Description                                 | Required |
| :--------------- | :------- | :------------------------------------------ | :------- |
| `authentication` | `string` | Your token                                  | yes      |
| `id`             | `string` | ID of the user you want to view his profile | yes      |

## **Following a user**

```http
PUT /api/v1/user/:userId/follow
```

| Parameter        | Type     | Description                       | Required |
| :--------------- | :------- | :-------------------------------- | :------- |
| `authentication` | `string` | Your token                        | yes      |
| `id`             | `string` | ID of the user you want to follow | yes      |

## **UnFollowing a user**

```http
PUT /api/v1/user/:userId/un-follow
```

| Parameter        | Type     | Description                       | Required |
| :--------------- | :------- | :-------------------------------- | :------- |
| `authentication` | `string` | Your token                        | yes      |
| `id`             | `string` | ID of the user you want to follow | yes      |

## **Block another user**

```http
PUT /api/v1/user/:userId/block
```

| Parameter        | Type     | Description                      | Required |
| :--------------- | :------- | :------------------------------- | :------- |
| `authentication` | `string` | Your token                       | yes      |
| `id`             | `string` | Id of the user you want to block | yes      |

## **Unblock user**

```http
PUT /api/v1/user/:userId/unblock
```

| Parameter        | Type     | Description                        | Required |
| :--------------- | :------- | :--------------------------------- | :------- |
| `authentication` | `string` | Your token                         | yes      |
| `id`             | `string` | Id of the user you want to unblock | yes      |

# **Admin API Reference**

## **Admin Create User**

```http
  POST /api/v1/admin/users/add
```

| Parameter         | Type      | Description                                     | Required |
| :---------------- | :-------- | :---------------------------------------------- | :------- |
| `authentication`  | `string`  | Admin token                                     | yes      |
| `firstName`       | `string`  | User's first name                               | yes      |
| `lastName`        | `string`  | User's last name                                | yes      |
| `dateOfBirth`     | `string`  | User's date of birth (YYYY-MM-DD)               | no       |
| `email`           | `string`  | User's email address                            | yes      |
| `bio`             | `string`  | User's biography                                | no       |
| `skills`          | `array`   | User's skills (e.g., `["JavaScript", "React"]`) | no       |
| `profileUrl`      | `string`  | User's profile image URL                        | no       |
| `acceptTerms`     | `boolean` | Whether the user accepts terms and conditions   | no       |
| `phoneNumber`     | `string`  | User's phone number                             | no       |
| `gender`          | `string`  | User's gender                                   | no       |
| `role`            | `string`  | User's role (e.g., 'user', 'admin')             | yes      |
| `password`        | `string`  | User's password                                 | yes      |
| `confirmPassword` | `string`  | User's password confirmation                    | yes      |

Example request body:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "email": "john.doe@example.com",
  "bio": "Full-stack developer",
  "skills": ["JavaScript", "Node.js", "React"],
  "profileUrl": "https://example.com/johndoe.jpg",
  "acceptTerms": true,
  "phoneNumber": "+123456789",
  "gender": "male",
  "role": "user",
  "password": "password123",
  "confirmPassword": "password123"
}
```

## **Admin Update User**

```http
   PUT /api/v1/admin/users/update/:userId
```

| Parameter         | Type      | Description                                     | Required |
| :---------------- | :-------- | :---------------------------------------------- | :------- |
| `authentication`  | `string`  | Admin token                                     | yes      |
| `userId`          | `string`  | ID of the user to be updated                    | yes      |
| `firstName`       | `string`  | User's first name                               | no       |
| `lastName`        | `string`  | User's last name                                | no       |
| `dateOfBirth`     | `string`  | User's date of birth (YYYY-MM-DD)               | no       |
| `email`           | `string`  | User's email address                            | no       |
| `bio`             | `string`  | User's biography                                | no       |
| `skills`          | `array`   | User's skills (e.g., `["JavaScript", "React"]`) | no       |
| `profileUrl`      | `string`  | User's profile image URL                        | no       |
| `profileImage`    | `file`    | User's profile image file (multipart/form-data) | no       |
| `acceptTerms`     | `boolean` | Whether the user accepts terms and conditions   | no       |
| `phoneNumber`     | `string`  | User's phone number                             | no       |
| `gender`          | `string`  | User's gender                                   | no       |
| `status`          | `string`  | User's status (active, inactive)                | no       |
| `role`            | `string`  | User's role (e.g., 'user', 'admin')             | no       |
| `plan`            | `string`  | User's subscription plan                        | no       |
| `userAward`       | `string`  | Award or recognition for the user               | no       |
| `password`        | `string`  | New password (if updating)                      | no       |
| `confirmPassword` | `string`  | New password confirmation (if updating)         | no       |

Example request body:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "email": "john.doe@example.com",
  "bio": "Senior full-stack developer",
  "skills": ["JavaScript", "Node.js", "React", "TypeScript"],
  "profileUrl": "https://example.com/johndoe_updated.jpg",
  "acceptTerms": true,
  "phoneNumber": "+123456789",
  "gender": "male",
  "status": "active",
  "role": "admin",
  "plan": "premium",
  "userAward": "Best Developer 2024",
  "password": "newPassword123",
  "confirmPassword": "newPassword123"
}
```

Example request body (Multipart/form-data):
To upload a profile image instead of passing profileUrl:

```bash
curl -X PUT "https://api.example.com/api/v1/admin/users/updat/{userId}" \
-H "Authorization: Bearer {adminToken}" \
-F "firstName=John" \
-F "lastName=Doe" \
-F "email=john.doe@example.com" \
-F "bio=Senior full-stack developer" \
-F "skills[]=JavaScript" \
-F "skills[]=Node.js" \
-F "profileImage=@/path/to/profile-image.jpg" \
-F "phoneNumber=+123456789" \
-F "gender=male" \
-F "status=active" \
-F "role=admin" \
-F "password=newPassword123" \
-F "confirmPassword=newPassword123"
```

---

## **Admin Delete User**

```http
   DELETE /api/v1/admin/users/remove/:userId
```

| Parameter        | Type     | Description                  | Required |
| :--------------- | :------- | :--------------------------- | :------- |
| `authentication` | `string` | Admin token                  | yes      |
| `userId`         | `string` | ID of the user to be deleted | yes      |

### Example request:

```bash
curl -X DELETE "https://api.example.com/api/v1/admin/users/remove/{userId}" \
-H "Authorization: Bearer {adminToken}"
```

---

## **Admin Get User**

```http
   GET /api/v1/admin/users/:userId
```

| Parameter        | Type     | Description                    | Required |
| :--------------- | :------- | :----------------------------- | :------- |
| `authentication` | `string` | Admin token                    | yes      |
| `userId`         | `string` | ID of the user to be retrieved | yes      |

### Example request:

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/{userId}" \
-H "Authorization: Bearer {adminToken}"
```

### Example response (JSON):

```json
{
  "userId": "12345",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "email": "john.doe@example.com",
  "bio": "Full-stack developer",
  "skills": ["JavaScript", "Node.js", "React"],
  "profileUrl": "https://example.com/johndoe.jpg",
  "acceptTerms": true,
  "phoneNumber": "+123456789",
  "gender": "male",
  "status": "active",
  "role": "user",
  "plan": "premium",
  "userAward": "Best Developer 2024"
}
```

---

## **Admin Get Users**

```http
   GET /api/v1/admin/users?limit=20&page=1&filterBy=role&role=admin&search=jhon
```

| Parameter        | Type      | Description                             | Required |
| :--------------- | :-------- | :-------------------------------------- | :------- |
| `authentication` | `string`  | Admin token                             | yes      |
| `limit`          | `integer` | Number of users to retrieve per page    | no       |
| `page`           | `integer` | Page number for pagination              | no       |
| `filterBy`       | `string`  | Field by which to filter (e.g., `role`) | no       |
| `role`           | `string`  | Role to filter users by                 | no       |
| `search`         | `string`  | Search term to filter users             | no       |

### Example request:

```bash
curl -X GET "https://api.example.com/api/v1/admin/users?limit=20&page=1&filterBy=role&role=admin&search=jhon" \
-H "Authorization: Bearer {adminToken}"
```

### Example response (JSON):

```json
{
  "page": 1,
  "limit": 20,
  "totalUsers": 100,
  "users": [
    {
      "userId": "12345",
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1990-01-01",
      "email": "john.doe@example.com",
      "bio": "Full-stack developer",
      "skills": ["JavaScript", "Node.js", "React"],
      "profileUrl": "https://example.com/johndoe.jpg",
      "acceptTerms": true,
      "phoneNumber": "+123456789",
      "gender": "male",
      "status": "active",
      "role": "admin",
      "plan": "premium",
      "userAward": "Best Developer 2024"
    },
    {
      "userId": "67890",
      "firstName": "Jane",
      "lastName": "Smith",
      "dateOfBirth": "1992-03-12",
      "email": "jane.smith@example.com",
      "bio": "Backend developer",
      "skills": ["Java", "Spring", "MySQL"],
      "profileUrl": "https://example.com/janesmith.jpg",
      "acceptTerms": true,
      "phoneNumber": "+987654321",
      "gender": "female",
      "status": "active",
      "role": "admin",
      "plan": "premium",
      "userAward": "Top Contributor 2024"
    }
  ]
}
```

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

# **Posts API Reference**

## **Create Post**

```http
  POST /api/v1/posts
```

| Parameter        | Type     | Description             | Required               |
| :--------------- | :------- | :---------------------- | :--------------------- |
| `authentication` | `string` | Your token              | yes                    |
| `title`          | `string` | Post title              | yes                    |
| `description`    | `string` | Post description        | yes                    |
| `category`       | `string` | ID of the category      | yes                    |
| `photoUrl`       | `string` | Image URL for the post  | yes                    |
| `file`           | `file`   | Image file for the post | yes (if no `photoUrl`) |

Example request body:

```json
{
  "title": "My First Post",
  "description": "This is a detailed description of the post.",
  "category": "coding",
  "photoUrl": "https://example.com/image.jpg"
}
```

## **Update Post**

```http
  PATCH /api/v1/posts/{postId}
```

| Parameter        | Type     | Description             | Required                           |
| :--------------- | :------- | :---------------------- | :--------------------------------- |
| `authentication` | `string` | Your token              | yes                                |
| `title`          | `string` | Post title              | no                                 |
| `description`    | `string` | Post description        | no                                 |
| `category`       | `string` | ID of the category      | no                                 |
| `photoUrl`       | `string` | Image URL for the post  | no                                 |
| `file`           | `file`   | Image file for the post | no (if `photoUrl` is not provided) |

Example request body:

```json
{
  "title": "Updated Post Title",
  "description": "Updated description of the post.",
  "category": "coding",
  "photoUrl": "https://example.com/updated-image.jpg"
}
```

Or, if you're uploading a file (in this case, `photoUrl` is omitted and the image will be uploaded instead):

```json
{
  "title": "Updated Post Title",
  "description": "Updated description of the post.",
  "category": "coding"
}
```

## **Get All Posts**

```http
  GET /api/v1/posts
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | no       |

## **Get timeline posts for auth user**

```http
  GET /api/v1/posts/timeline
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

## **Get Single Post**

```http
  GET /api/v1/posts/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | no       |
| `id`             | `string` | ID of the post | yes      |

## **Update Post**

```http
  PATCH /api/v1/posts/:id
```

| Parameter        | Type     | Description             | Required |
| :--------------- | :------- | :---------------------- | :------- |
| `authentication` | `string` | Your token              | yes      |
| `id`             | `string` | ID of the post          | no       |
| `title`          | `string` | title of the post       | no       |
| `description`    | `string` | description of the post | no       |
| `category`       | `string` | category of the post    | no       |
| `photoUrl`       | `string` | photo of the post       | no       |

Example request body:

```javascript
{
  "title":"value",
  "description":"value",
  "category":"value",
  "photoUrl":"photo",
}
```

## **Delete Post**

```http
  DELETE /api/v1/posts/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the post | yes      |

## **Get auth user posts**

```http
  GET /api/v1/posts/user-posts
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

## **Delete auth user posts**

```http
  DELETE /api/v1/posts/user-posts
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

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

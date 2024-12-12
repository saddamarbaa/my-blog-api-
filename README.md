# **Blog REST API**

An open-source, scalable, and fully-featured RESTful API built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**. It provides a seamless experience for user authentication, blog post management, and advanced features such as filtering, pagination, sorting, and full-text search.

This API is designed to support a wide range of blog functionalities, including user account management, content creation, commenting, and moderation, with robust admin capabilities for user and post management. It's optimized for performance and easy to extend for custom use cases.

## **Key Features**

- **User Authentication & Authorization**: Signup, login, password reset, JWT token-based authentication.
- **Blog Management**: Create, read, update, delete posts, and manage user-generated content.
- **Advanced Features**: Filtering, sorting, and pagination for posts and comments, along with full-text search functionality.
- **Admin Capabilities**: User and post management, user blocking, and comment moderation.

# Table of Contents

- [Author](#author)
- [Tech Stack](#tech-stack)
- [API Features](#api-features)
- [Endpoints](#endpoints)
- [API Reference](#api-reference)
- [Rate Limiting and Throttling](#rate-limiting-and-throttling)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Project Status](#project-status)
- [Related Projects](#related-projects)
- [Feedback](#feedback)
- [Support](#support)
- [Screenshots](#screenshots)
- [License](#license)

---

# **Author**

This project is developed by:

- [Saddam Arbaa](https://github.com/saddamarbaa)
<!--- [Team Member Name](https://github.com/team-member)-->

For more information, visit [GitHub Profile](https://github.com/saddamarbaa).

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

- Users can sign up, log in, and log out using JWT (JSON Web Token).
- Token-based authentication with support for JWT tokens for secure access.
- Users can refresh their tokens to maintain sessions.
- Password reset functionality with email verification.
- Email verification during signup to ensure user authenticity.
- **Account Locking**: Account lockout after multiple failed login attempts to prevent brute force attacks.

### **Post CRUD Operations**

- Users can create, read, update, and delete posts.
- Admins can perform comprehensive post management actions:
  - Create, read, update, delete posts.
  - Admin can clear all posts for a specific user.
  - Admin can delete all posts in the system.
  - Admin can moderate posts based on user reports or content policies.

### **Comment Functionality**

- Users can comment on posts.
- Users can update or delete their own comments.
- Admins can delete comments on posts or clear all comments for a specific post.
- Admins can moderate comments based on specific criteria (e.g., offensive language or spam).

### **User Management**

- **User Account Locking**: Automatically lock or suspend a user account if it’s inactive for 30 days.
- Admins can block or unblock users, with actions tracked for accountability.
- A user can block or unblock another user. When a user blocks someone:
  - The blocked user cannot view or interact with their posts.
  - Blocked users cannot follow or message the user who blocked them.
- Users can follow and unfollow other users.
- Users can update their profile information, including changing their password.
- Users can upload a profile photo or update it.
- Users can deactivate or permanently close their accounts.
- Users can manage their privacy settings (who can see their posts, profile, etc.).

### **Admin Management**

- **Admin User Management**:
  - Admins can add, retrieve, update, and delete users.
  - Admins can get a list of all users, including filtering and sorting by various criteria (e.g., role, activity level).
  - Admins can view and manage user roles and permissions (e.g., admin, user).
  - Admins can deactivate or permanently delete users.
- **Admin Post Management**:
  - Admins can create, read, update, or delete posts.
  - Admins can delete all posts for a specific user.
  - Admins can clear all posts in the system.
  - Admins can moderate posts and flag inappropriate content.
- **Admin Comment Management**:
  - Admins can delete all comments for a specific post.
  - Admins can delete specific comments based on content or user.
  - Admins can manage user-generated reports for posts or comments.

### **Post and User Activity Tracking**

- Track the last date a post was created or updated.
- Track whether a user is active based on their interaction frequency (e.g., post creation, comment activity).
- Track the last date a user was active.
- Admins can get activity reports about users and posts (e.g., number of posts, comments, etc.).
- Award users based on activity (e.g., badges for the most posts or most comments).
- Track user engagement metrics like likes, comments, and shares on posts.
- Analytics for admins to see trends in user activity, content creation, and interaction.

### **User Statistics**

- **User Profile Insights**:
  - Get the number of followers and following for a user.
  - Get the total profile views count for a user.
  - Get the total number of posts a user has created.
  - Get the total number of comments made by a user.
  - Get the total number of posts liked by a user.
- **Blocked Users**:
  - Get a list of users who have blocked the authenticated user.
  - Get the total number of blocked users by a specific user.
- **User Engagement**:
  - Get a list of all users who have viewed someone's profile (if privacy settings allow).
  - Track post interactions (likes, shares) per user.
  - Get the number of times a user’s posts have been shared.

### **Other Features**

- **Search Functionality**:
  - Users can search for posts, users, comments, and tags.
  - Admins can search for posts and users using filters like role, activity, and content type.
- **Notifications**:
  - Users can receive notifications for post likes, comments, mentions, follows, and other interactions.
  - Admins can send system-wide notifications (e.g., policy changes, user alerts).
- **Content Moderation**:

  - Admins can flag posts or comments based on keywords, reports, or other indicators.
  - Implement content filters (e.g., profanity filters, image moderation) for posts and comments.
  - Users can report posts and comments as inappropriate.

- **User Privacy**:

  - Users can adjust the visibility of their posts and profile (e.g., public, friends-only, private).
  - Users can manage their notification preferences and opt-in or opt-out of certain types of notifications.

- **Performance & Rate Limiting**:
  - Rate limiting on certain API endpoints (e.g., post creation, login attempts) to prevent abuse.
  - API endpoints are optimized for performance and scalability to handle large volumes of data and users.

# Endpoints

- [API Authentication](#api-authentication)

  - [User Signup](#user-signup)
  - [User Login](#user-login)
  - [User Logout](#user-logout)
  - [Refresh Token](#refresh-token)
  - [Remove Account](#remove-account)
  - [Get Profile](#get-profile)
  - [Upload Profile Photo](#upload-profile-photo)
  - [Verify Email](#verify-email)
  - [Update User Profile](#update-account)
  - [Forget Password](#forget-password)
  - [Reset Password](#reset-password)

- [Users](#users-api-reference)

  - [Get all users](#get-all-users)
  - [View a user profile Count](#view-a-user-profile)
  - [Following a user](#following-a-user)
  - [UnFollowing a user](#unfollowing-a-user)
  - [Block another user](#block-user)
  - [Unblock another user](#unblock-user)

- [Admin](#admin-api-reference)

  - [Admin Create User](#admin-create-user)
  - [Admin Update User](#admin-update-user)
  - [Admin Block a User](#admin-block-a-user)
  - [Admin Unblock a User](#admin-unblock-a-user)
  - [Admin Delete User Account](#admin-delete-user)
  - [Admin Get User](#admin-get-user)
  - [Admin Get All Users](#admin-get-users)
  - [Admin Create Post](#admin-create-post)
  - [Admin Update Post](#admin-update-post)
  - [Admin Delete Post](#admin-delete-post)
  - [Admin Get Post](#admin-get-post)
  - [Admin Get Posts](#admin-get-posts)
  - [Admin Delete All Posts for User](#admin-delete-all-posts-for-user)
  - [Admin Clear All Posts](#admin-clear-all-posts)
  - [Admin Delete Comment for Post](#admin-delete-comment-for-post)
  - [Admin Delete Single Comment](#admin-delete-single-comment)

- [Posts](#posts-api-reference)
  - [Create Post](#create-post)
  - [Get Posts](#get-all-posts)
  - [Get Post](#get-single-post)
  - [Get Timeline Posts](#get-timeline-posts-for-auth-user)
  - [Delete Post](#delete-post)
  - [Get User Posts](#get-auth-user-posts)
  - [Delete User Posts](#delete-auth-user-posts)
  - [Update Post](#update-post)
  - [Like Post](#toggle-post-like)
  - [Add Comment in Post](#add-comment-in-post)
  - [Update Comment in Post](#update-comment-in-post)
  - [Get Comment in Post](#get-comment-in-post)
  - [Get User Comment in Post](#get-user-comment-in-post)
  - [Get All Comment in Post](#get-all-comment-in-post)
  - [Delete Comment in Post](#delete-comment-in-post)
  - [Delete User Comment in Post](#delete-user-comment-in-post)
  - [Delete All Comment in Post](#delete-all-comments-in-post)

# **Getting Started**

Follow these steps to get the project up and running:

### **Prerequisites**

Make sure you have the following installed on your machine:

- **Node.js** (v20.1.0.x or higher)
- **MongoDB** (Running locally or via MongoDB Atlas)

### Run Locally

1. **Clone the project**:

```bash
  git clone https://github.com/saddamarbaa/node-express-mongodb-typescript-blog-rest-api
```

2. **Go to the project directory**:

```bash
  cd node-express-mongodb-typescript-blog-rest-api
```

3. **Install dependencies**:

```bash
  npm install
```

4. **Set Up Environment Variables**:

```bash
  Copy `.env.example` to `.env` and update the necessary values:
```

5. **Run the Application Locally**:
   Start the server in development mode:

```bash
  npm run server
```

6.  **Access the API**::

- Once the server is running, you can make API requests to `http://localhost:8000/api/v1`
- Use tools like Postman or cURL to test the endpoints.

7. **Swagger API Documentation**:

- You can also access the interactive API documentation via Swagger at: ` http://localhost:8000/docs`

8. **Authentication**:

- To authenticate, generate a token via the `/auth/login/` endpoint.
- Include the token in the `Authorization` header as `Bearer <your-token>`.

9. **Test the API**:
   Refer to the **API Reference** section for detailed information on the available endpoints and request/response formats.

# Environment Variables

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

# **Rate Limiting and Throttling**

The API allows up to 100 requests per minute per user. If you exceed this limit, you will receive a `429 Too Many Requests` response.

# API Reference

## **Authentication API Reference**

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

#### **Description:**

- **Endpoint:** `POST /api/v1/auth/signup`
- **Functionality:** Registers a new user with the provided information and send verification email.

#### Example Request Body:

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

#### **Description:**

- **Endpoint:** `POST /api/v1/auth/verify-email/:userId/:token`
- **Functionality:** Verifies the user's email using the provided verification code sent to the user's email address.

## **User Login**

```http
POST /api/v1/auth/login
```

| Parameter        | Type     | Description   | Required |
| :--------------- | :------- | :------------ | :------- |
| `authentication` | `string` | Your token    | no       |
| `email`          | `string` | Your email    | yes      |
| `password`       | `string` | Your password | yes      |

#### **Description:**

- **Endpoint:** `POST /api/v1/auth/login`
- **Functionality:** Authenticates the user and returns a token for further use.

#### **Example request body**

```json
{
  "email": "user@example.com",
  "password": "userpassword123"
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

#### **Description:**

- **Endpoint:** `POST /api/v1/auth/logout`
- **Functionality:** Logs out the current user by invalidating the authentication token.

#### Example request body:

```javascript
{
  "refreshToken":"your refreshToken"
}
```

## **Remove Account**

```http
DELETE /api/v1/auth/remove/:userId
```

| Parameter        | Type     | Description                      | Required |
| :--------------- | :------- | :------------------------------- | :------- |
| `authentication` | `string` | Your authToken                   | yes      |
| `userId`         | `string` | The ID of the user to be deleted | yes      |

#### **Description:**

- **Endpoint:** `DELETE /api/v1/auth/remove/:userId`
- **Functionality:** Deletes the account of the user associated with the provided authentication token.

#### Example request body:

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

#### **Description:**

- **Endpoint:** `PATCH  /api/v1/auth/update/:userId`
- **Functionality:** Updates the account information for the user associated with the provided authentication token. The user can update their info.

#### Example Request Body:

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

## **Refresh Token**

```http
POST /api/v1/auth/refresh-token
```

| Parameter        | Type     | Description       | Required |
| :--------------- | :------- | :---------------- | :------- |
| `authentication` | `string` | Your authToken    | no       |
| `refreshToken`   | `string` | Your refreshToken | yes      |

#### **Description:**

- **Endpoint:** `POST /api/v1/auth/refresh-token`
- **Functionality:** Refreshes the access and refresh tokens using a valid refresh token. This helps the user to continue using the API without re-authenticating.

#### Example request body:

```javascript
{
  "refreshToken":"your refreshToken"
}
```

## **Get Profile**

```http
GET /api/v1/auth/profile
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

#### **Description:**

- **Endpoint:** `GET /api/v1/auth/profile`
- **Functionality:** Fetches the profile details of the currently authenticated user using the provided authentication token..

## **Upload Profile Photo**

```http
 POST  /api/v1/auth/profile-photo-upload
```

| Parameter        | Type     | Description     | Required |
| :--------------- | :------- | :-------------- | :------- |
| `authentication` | `string` | Your token      | yes      |
| `profilePhoto`   | `string` | Image to upload | yes      |

#### **Description:**

- **Endpoint:** `POST /api/v1/auth/profile-photo-upload`
- **Functionality:** Allows the user to upload a new profile photo by sending a file along with the authentication token.

#### Example Request Body:

Form-data should be used to upload the image file.

```javascript
Content-Type: multipart/form-data
Authorization: Bearer {authentication_token}
file: {image_file}
```

## **Forget Password**

```http
POST /api/v1/auth/forget-password
```

| Parameter | Type | Description Required |
| `authentication` | `string` | Your token | no |
| :---------------- | :-------- | :------------------------------------ | :------- |
| `refreshToken` | `string` | Your refresh token | yes |
| `email` | `string` | Valid email address | yes |

#### **Description:**

- **Endpoint:** `POST /api/v1/auth/forget-password`
- **Functionality:** Sends a password reset link to the provided email address if it's associated with a registered user.

#### Example Request Body:

```javascript
{
  "refreshToken": "eyJhbGciOi",
  "email": "testverstion5@gmail.com"
}

```

## **Reset Password**

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

#### **Description:**

- **Endpoint:** `POST /api/v1/auth/reset-password/:userId/:token`
- **Functionality:** Resets the password for the user identified by `userId` using the provided `token` and new `password`.

#### Example Request Body:

```javascript
POST /api/v1/auth/reset-password/:userId/:token
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

**Description:**

- **Endpoint:** `GET /api/v1/user/users`
- **Functionality:** Retrieves a list of all users in the system. Requires authentication.

## **View a user profile**

```http
GET /api/v1/user/:id
```

| Parameter        | Type     | Description                                 | Required |
| :--------------- | :------- | :------------------------------------------ | :------- |
| `authentication` | `string` | Your token                                  | yes      |
| `id`             | `string` | ID of the user you want to view his profile | yes      |

**Description:**

- **Endpoint:** `GET /api/v1/user/:id`
- **Functionality:** Retrieves the profile information of a user by their user ID. Requires authentication.

## **Following a user**

```http
PUT /api/v1/user/:userId/follow
```

| Parameter        | Type     | Description                       | Required |
| :--------------- | :------- | :-------------------------------- | :------- |
| `authentication` | `string` | Your token                        | yes      |
| `id`             | `string` | ID of the user you want to follow | yes      |

**Description:**

- **Endpoint:** `PUT /api/v1/user/:userId/follow`
- **Functionality:** Allows the authenticated user to follow another user by their `userId`. Requires authentication.

## **UnFollowing a user**

```http
PUT /api/v1/user/:userId/un-follow
```

| Parameter        | Type     | Description                       | Required |
| :--------------- | :------- | :-------------------------------- | :------- |
| `authentication` | `string` | Your token                        | yes      |
| `id`             | `string` | ID of the user you want to follow | yes      |

**Description:**

- **Endpoint:** `PUT /api/v1/user/:userId/un-follow`
- **Functionality:** Allows the authenticated user to unfollow another user by their `userId`. Requires authentication.

## **Block user**

```http
PUT /api/v1/user/:userId/block
```

| Parameter        | Type     | Description                      | Required |
| :--------------- | :------- | :------------------------------- | :------- |
| `authentication` | `string` | Your token                       | yes      |
| `id`             | `string` | Id of the user you want to block | yes      |

#### **Description:**

- **Endpoint:** `PUT /api/v1/user/:userId/block`
- **Functionality:** Blocks the specified user, preventing further interactions such as following or messaging. Requires authentication.

## **Unblock user**

```http
PUT /api/v1/user/:userId/unblock
```

| Parameter        | Type     | Description                        | Required |
| :--------------- | :------- | :--------------------------------- | :------- |
| `authentication` | `string` | Your token                         | yes      |
| `id`             | `string` | Id of the user you want to unblock | yes      |

#### **Description:**

- **Endpoint:** `PUT /api/v1/user/:userId/unblock`
- **Functionality:** Unblocks the specified user, restoring the ability to interact with them. Requires authentication.

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

#### **Description:**

- **Endpoint:** `POST /api/v1/admin/users/add`
- **Functionality:** Allows an admin to create a new user in the system by providing the necessary details like `username`, `email`, `password`, and `role`. Requires admin authentication.

#### Example request body:

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

#### **Description:**

- **Endpoint:** `PUT /api/v1/admin/users/update/:userId`
- **Functionality:** Allows an admin to update details of an existing user by providing the userId. Admin can update the `username`, `email`, and `role` of the user.

#### Example request body:

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

#### Example request body (Multipart/form-data):

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

#### **Description:**

- **Endpoint:** `DELETE /api/v1/admin/users/remove/:userId`
- **Functionality:** Allows an admin to delete a user by their `userId`. Once deleted, the user will no longer exist in the system.

#### Example request:

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

#### **Description:**

- **Endpoint:** `GET /api/v1/admin/users/:userId`
- **Functionality:** Allows an admin to retrieve details of a specific user by their `userId`.

#### Example request:

```bash
curl -X GET "https://api.example.com/api/v1/admin/users/{userId}" \
-H "Authorization: Bearer {adminToken}"
```

#### Example response (JSON):

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

#### **Description:**

- **Endpoint:** `GET /api/v1/admin/users`
- **Functionality:** Allows an admin to retrieve a paginated list of users based on filters like `role` and a search term. The response can be limited and filtered by specific criteria such as role and user name.

#### Example request:

```bash
curl -X GET "https://api.example.com/api/v1/admin/users?limit=20&page=1&filterBy=role&role=admin&search=jhon" \
-H "Authorization: Bearer {adminToken}"
```

#### Example response (JSON):

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

## **Admin Block a User**

```http
PUT /api/v1/admin/users/:userId/block
```

| Parameter        | Type     | Description                      | Required |
| :--------------- | :------- | :------------------------------- | :------- |
| `authentication` | `string` | Your token                       | yes      |
| `id`             | `string` | Id of the user you want to block | yes      |

#### **Description:**

- **Endpoint:** `PUT /api/v1/admin/users/:userId/block`
- **Functionality:** Allows an admin to block a user by their user ID. The user will be prevented from accessing certain features.

## **Admin Unblock a User**

```http
PUT /api/v1/admin/users/:userId/unblock
```

| Parameter        | Type     | Description                        | Required |
| :--------------- | :------- | :--------------------------------- | :------- |
| `authentication` | `string` | Your token                         | yes      |
| `id`             | `string` | Id of the user you want to unblock | yes      |

#### **Description:**

- **Endpoint:** `PUT /api/v1/admin/users/:userId/unblock`
- **Functionality:** Allows an admin to unblock a previously blocked user, granting them access to the platform again.

## **Admin Create Post**

```http
  POST /api/v1/admin/posts
```

| Parameter        | Type     | Description             | Required               |
| :--------------- | :------- | :---------------------- | :--------------------- |
| `authentication` | `string` | Your token              | yes                    |
| `title`          | `string` | Post title              | yes                    |
| `description`    | `string` | Post description        | yes                    |
| `category`       | `string` | ID of the category      | yes                    |
| `photoUrl`       | `string` | Image URL for the post  | yes                    |
| `file`           | `file`   | Image file for the post | yes (if no `photoUrl`) |

#### **Description:**

- **Endpoint:** `POST /api/v1/admin/posts`
- **Functionality:** Allows an admin to create a new post with the provided title, content, and author information.

#### Example request body:

```json
{
  "title": "My First Post",
  "description": "This is a detailed description of the post.",
  "category": "coding",
  "photoUrl": "https://example.com/image.jpg"
}
```

## **Admin Update Post**

```http
  PATCH /api/v1/admin/posts/{postId}
```

| Parameter        | Type     | Description             | Required                           |
| :--------------- | :------- | :---------------------- | :--------------------------------- |
| `authentication` | `string` | Your token              | yes                                |
| `title`          | `string` | Post title              | no                                 |
| `description`    | `string` | Post description        | no                                 |
| `category`       | `string` | ID of the category      | no                                 |
| `photoUrl`       | `string` | Image URL for the post  | no                                 |
| `file`           | `file`   | Image file for the post | no (if `photoUrl` is not provided) |

#### **Description:**

- **Endpoint:** `PATCH /api/v1/admin/posts/{postId}`
- **Functionality:** Allows an admin to update the title and/or content of a specific post based on its `postId`.

#### Example request body:

```json
{
  "title": "Updated Post Title",
  "description": "Updated description of the post.",
  "category": "coding",
  "photoUrl": "https://example.com/updated-image.jpg"
}
```

#### Or, if you're uploading a file (in this case, `photoUrl` is omitted and the image will be uploaded instead):

```json
{
  "title": "Updated Post Title",
  "description": "Updated description of the post.",
  "category": "coding"
}
```

## **Admin Delete Post**

```http
 DELETE /api/v1/admin/posts/{postId}

```

| Parameter        | Type     | Description              | Required |
| :--------------- | :------- | :----------------------- | :------- |
| `authentication` | `string` | Your token               | yes      |
| `postId`         | `string` | ID of the post to delete | yes      |

#### **Description:**

- **Endpoint:** `DELETE /api/v1/admin/posts/{postId}`
- **Functionality:** Allows an admin to delete a specific post based on its `postId`.

#### **Request Body:**

No request body required for this endpoint.

## **Admin Get Post**

```http
GET /api/v1/admin/posts/{postId}

```

| Parameter        | Type     | Description                | Required |
| :--------------- | :------- | :------------------------- | :------- |
| `authentication` | `string` | Your token                 | yes      |
| `postId`         | `string` | ID of the post to retrieve | yes      |

#### **Description:**

- **Endpoint:** `GET /api/v1/admin/posts/{postId}`
- **Functionality:** Allows an admin to retrieve details of a specific post based on its `postId`.

## **Admin Get Posts**

```http
GET /api/v1/admin/posts

```

| Parameter        | Type     | Description                        | Required |
| :--------------- | :------- | :--------------------------------- | :------- |
| `authentication` | `string` | Your token                         | yes      |
| `limit`          | `number` | Number of posts to return          | no       |
| `page`           | `number` | Page number for pagination         | no       |
| `filterBy`       | `string` | Field to filter by (e.g. category) | no       |
| `search`         | `string` | Search keyword for posts           | no       |

#### **Description:**

- **Endpoint:** `GET /api/v1/admin/posts`
- **Functionality:** Allows an admin to retrieve a list of posts, with optional pagination and filtering.

#### Example request:

```json
{
  "authentication": "your_token",
  "limit": 20,
  "page": 1,
  "filterBy": "category",
  "search": "coding"
}
```

## **Admin Delete All Posts for User**

```http
  DELETE /api/v1/admin/posts/user/{userId}
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `userId`         | `string` | ID of the user | yes      |

#### **Description:**

- **Endpoint:** `DELETE /api/v1/admin/posts/user/{userId}`
- **Functionality:** Allows an admin to delete all posts made by a specific user.

#### Example request:

```json
{
  "authentication": "your_token",
  "userId": "user123"
}
```

## **Admin Clear All Posts**

```http
  DELETE /api/v1/admin/posts/clear-all-posts
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

#### **Description:**

- **Endpoint:** `DELETE /api/v1/admin/posts/clear-all-posts`
- **Functionality:** Allows an admin to delete all posts from the platform.

#### Example request:

```json
{
  "authentication": "your_token"
}
```

## **Admin Delete Comment for Post**

```http
  DELETE /api/v1/admin/posts/comment/{postId}
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `postId`         | `string` | ID of the post | yes      |

#### **Description:**

- **Endpoint:** `DELETE /api/v1/admin/posts/comment/{postId}`
- **Functionality:** Allows an admin to delete a specific comment for a given post.

#### **Example Request:**

```http
DELETE /api/v1/admin/posts/comment/6755f41ddec28835fdf268d7
```

## **Admin Delete Single Comment**

```http
    DELETE /api/v1/admin/posts/comment
```

| Parameter        | Type     | Description                 | Required |
| :--------------- | :------- | :-------------------------- | :------- |
| `authentication` | `string` | Your token                  | yes      |
| `postId`         | `string` | ID of the post              | yes      |
| `commentId`      | `string` | ID of the comment to delete | yes      |

#### **Description:**

- **Endpoint:** `DELETE /api/v1/admin/posts/comment`
- **Functionality:** Allows an admin to delete a specific comment from a given post.

#### Example request:

```json
{
  "postId": "6755f41ddec28835fdf268d7",
  "commentId": "6755f445dec28835fdf268e5"
}
```

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

#### **Description:**

- **Endpoint:** `POST /api/v1/posts`
- **Functionality:** Allows a user to create a new post.

#### Example request body:

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

#### **Description:**

- **Endpoint:** `PATCH /api/v1/posts/{postId}`
- **Functionality:** Allows a user to update an existing post by its `postId`, modifying the title, content, or image.

#### Example request body:

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

#### **Description:**

- **Endpoint:** `GET /api/v1/posts`
- **Functionality:** Retrieves a list of all posts with options for pagination, filtering, and searching.

## **Get timeline posts for auth user**

```http
  GET /api/v1/posts/timeline
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

#### **Description:**

- **Endpoint:** `GET /api/v1/posts/timeline`
- **Functionality:** Retrieves the timeline of posts for the authenticated user, including posts from followed users.

## **Get Single Post**

```http
  GET /api/v1/posts/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | no       |
| `id`             | `string` | ID of the post | yes      |

#### **Description:**

- **Endpoint:** `GET /api/v1/posts/:id`
- **Functionality:** Retrieves a single post by its ID.

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

#### **Description:**

- **Endpoint:** `PATCH /api/v1/posts/:id`
- **Functionality:** Updates the title and content of a specific post by its ID.

#### Example request body:

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

#### **Description:**

- **Endpoint:** `DELETE /api/v1/posts/:id`
- **Functionality:** Deletes a specific post by its ID.

## **Get Auth User Posts**

```http
  GET /api/v1/posts/user-posts
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

#### **Description:**

- **Endpoint:** `GET /api/v1/posts/user-posts`
- **Functionality:** Retrieves all posts created by the currently authenticated user.

## **Delete auth user posts**

```http
  DELETE /api/v1/posts/user-posts
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

#### **Description:**

- **Endpoint:** `DELETE /api/v1/posts/user-posts`
- **Functionality:** Deletes all posts created by the currently authenticated user.

## **Toggle Post like**

```http
  GET /api/v1/postslikes/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | yes      |
| `id`             | `string` | ID of the post | yes      |

#### **Description:**

- **Endpoint:** `GET /api/v1/postslikes/:id`
- **Functionality:** Toggles the like status of a specific post. If the user has already liked the post, it unlikes it; if not, it likes the post.

### **Add Comment in Post**

```http
PUT /api/v1/posts/comment
```

| Parameter        | Type     | Description             | Required |
| :--------------- | :------- | :---------------------- | :------- |
| `authentication` | `string` | Your token              | yes      |
| `postId`         | `string` | ID of the post          | yes      |
| `comment`        | `string` | The comment to be added | yes      |

#### **Description:**

- **Endpoint:** `PUT /api/v1/posts/comment`
- **Functionality:** Adds a new comment to a specific post by its `postId`.

#### **Request Body:**

```json
{
  "postId": "6755f41ddec28835fdf268d7",
  "comment": "comment3"
}
```

### **Add Comment in Post**

```http
PUT /api/v1/posts/comment
```

| Parameter        | Type     | Description             | Required |
| :--------------- | :------- | :---------------------- | :------- |
| `authentication` | `string` | Your token              | yes      |
| `postId`         | `string` | ID of the post          | yes      |
| `comment`        | `string` | The comment to be added | yes      |

#### **Description:**

- **Endpoint:** `PUT /api/v1/posts/comment`
- **Functionality:** Adds a new comment to a specific post by its `postId`.

#### **Request Body:**

```json
{
  "postId": "6755f41ddec28835fdf268d7",
  "comment": "comment3"
}
```

### **Update Comment in Post**

```http
PATCH /api/v1/posts/comment
```

| Parameter        | Type     | Description                     | Required |
| :--------------- | :------- | :------------------------------ | :------- |
| `authentication` | `string` | Your token                      | yes      |
| `postId`         | `string` | ID of the post                  | yes      |
| `commentId`      | `string` | ID of the comment to be updated | yes      |
| `comment`        | `string` | The updated comment text        | yes      |

#### **Description:**

- **Endpoint:** `PATCH /api/v1/posts/comment`
- **Functionality:** Updates an existing comment by its commentId in a specific post identified by postId..

#### **Request Body:**

```json
{
  "postId": "63db0cb558191bf1d20542d4",
  "commentId": "63db0cb558191bf1d20542d4",
  "comment": "Updated comment text"
}
```

### **Get Comment in Post**

```http
GET /api/v1/posts/comment/{postId}
```

| Parameter        | Type     | Description                         | Required |
| :--------------- | :------- | :---------------------------------- | :------- |
| `authentication` | `string` | Your token                          | yes      |
| `postId`         | `string` | ID of the post to retrieve comments | yes      |

#### **Description:**

- **Endpoint:** `GET /api/v1/posts/comment/{postId}`
- **Functionality:** Retrieves all comments for a specific post identified by postId..

### **Get User Comment in Post**

```http
GET /api/v1/posts/user-comment/{postId}
```

| Parameter        | Type     | Description                             | Required |
| :--------------- | :------- | :-------------------------------------- | :------- |
| `authentication` | `string` | Your token                              | yes      |
| `postId`         | `string` | ID of the post to retrieve comments for | yes      |

- **Endpoint:** `GET /api/v1/posts/user-comment/{postId}`
- **Functionality:** Retrieves all comments made by the current logged-in user for a specific post identified by `postId`.

### **Get All Comment in Post**

```http
GET /api/v1/posts/comment/{postId}
```

| Parameter        | Type     | Description                             | Required |
| :--------------- | :------- | :-------------------------------------- | :------- |
| `authentication` | `string` | Your token                              | yes      |
| `postId`         | `string` | ID of the post to retrieve all comments | yes      |

- **Endpoint:** `GET /api/v1/posts/comment/{postId}`
- **Functionality:** Retrieves all comments for a specific post identified by `postId`.

### **Delete Comment in Post**

```http
DELETE /api/v1/posts/comment
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

- **Endpoint:** `DELETE /api/v1/posts/comment`
- **Functionality:** Deletes a specific comment from a post by its `postId` and `commentId`.

#### **Request Body:**

```json
{
  "postId": "6755f41ddec28835fdf268d7",
  "comment": "comment3"
}
```

### **Delete User Comment in Post**

```http
DELETE /api/v1/posts/user-comment/{postId}
```

| Parameter        | Type     | Description                                    | Required |
| :--------------- | :------- | :--------------------------------------------- | :------- |
| `authentication` | `string` | Token of the currently logged-in user or admin | yes      |
| `postId`         | `string` | ID of the post                                 | yes      |

- **Endpoint:** `DELETE /api/v1/posts/user-comment/{postId}`
- **Functionality:** Deletes all comments made by the currently logged-in user or a specified user in the given post using the `postId`.

### **Delete All Comments in Post**

```http
DELETE /api/v1/posts/comment/{postId}
```

| Parameter        | Type     | Description                                    | Required |
| :--------------- | :------- | :--------------------------------------------- | :------- |
| `authentication` | `string` | Token of the currently logged-in user or admin | yes      |
| `postId`         | `string` | ID of the post to delete all comments from     | yes      |

# **Deployment**

To deploy this application, follow these steps:

## **Deploying to Production**

1. **Prepare Environment Variables**:
   Ensure that the necessary environment variables are set up in your production environment. This includes variables like:

- `DB_URI`: MongoDB connection string (ensure this points to your production MongoDB database).
- `PORT`: The port on which the app will run.
- `JWT_SECRET`: Secret key used for JWT token signing.
- Other environment-specific variables.

**Important**: Make sure to check the `.env.example` file for required environment variables. Copy the `.env.example` file to a new `.env` file, and fill in the necessary values for your production environment.

2. **Push your code to a Git repository**:
   If you are using a service like GitHub, GitLab, or Bitbucket, push your code to a remote repository.

3. **Set up a Hosting Service**:
   You can deploy the app on platforms like:

   - **Heroku**:
     - Install the Heroku CLI and log in.
     - Create a Heroku app with `heroku create`.
     - Deploy the app using `git push heroku master`.
     - Configure environment variables using `heroku config:set`.
     - For more up-to-date instructions, check the [Heroku documentation](https://devcenter.heroku.com/articles/deploying-nodejs) as it may update over time.
   - **Render**:
     - Sign up or log in to [Render](https://render.com/).
     - Create a new **Web Service** by connecting your GitHub (or GitLab) account and selecting the repository.
     - In the **Environment** section, select **Node** as the environment.
     - Under **Build & Deploy**, Render will automatically detect and install the required dependencies.
     - Add environment variables:
       - Go to the "Environment" section in your Render app dashboard and set environment variables like:
         ```bash
         DB_URI=your_mongo_db_connection_string
         JWT_SECRET=your_jwt_secret_key
         ```
     - Click **Create Web Service** to deploy your app.
       -. For more detailed and up-to-date instructions, check Render's [documentation](https://render.com/).

4. **Set up MongoDB**:
   - For production, ensure that MongoDB is either hosted on MongoDB Atlas or a self-hosted instance.
   - If using MongoDB Atlas, follow their [documentation](https://www.mongodb.com/cloud/atlas) to set up a cluster and get the connection string.
   - If using a self-hosted MongoDB instance, ensure it is properly configured and secured.

- Once deployed, your application will be live, and you can start interacting with it via the provided URL.

## **Contributing**

We welcome contributions from the community! Here’s how you can help:

### **How to Contribute**

1. **Fork the repository**:

   - Go to the project repository on GitHub and click on the **Fork** button to create a copy of the repository under your own GitHub account.

2. **Clone the repository**:

   - Clone your forked repository to your local machine:
     ```bash
     git clone https://github.com/your-username/node-express-mongodb-typescript-blog-rest-api.git
     ```

3. **Create a new branch**:

   - Create a new branch for your feature or bug fix:
     ```bash
     git checkout -b your-feature-branch
     ```

4. **Make your changes**:

   - Make your changes or additions to the project. Be sure to write clear, concise commit messages explaining your changes.

5. **Test your changes**:

   - Run tests and ensure everything works as expected.

6. **Commit your changes**:

   - Stage and commit your changes:
     ```bash
     git add .
     git commit -m "Add/Update feature description"
     ```

7. **Push your changes**:

   - Push your changes to your forked repository:
     ```bash
     git push origin your-feature-branch
     ```

8. **Create a Pull Request (PR)**:
   - Go to the **Pull Requests** tab of the original repository and click **New Pull Request**.
   - Select your branch and explain the changes you've made.
   - Submit the PR for review.

### **Code of Conduct**

By participating in this project, you agree to abide by the project's Code of Conduct. Please be respectful and kind to other contributors.

### **Issues and Bugs**

If you find a bug or want to request a feature:

1. **Check the issues**: Before opening a new issue, check if the problem or feature request already exists.
2. **Report a bug or request a feature**: If the issue hasn’t been reported, create a new issue with a clear description of the problem or feature request. Please include:
   - Steps to reproduce the issue (if applicable)
   - Expected and actual behavior
   - Any error messages or logs

### **Documentation**

If you're contributing to the documentation:

1. Ensure that any new or updated features are properly documented in the **README.md**.
2. Ensure that any API changes are reflected in the API documentation.

### **Thanks for your contributions!**

Your contributions help improve this project and make it better for everyone. Thank you for your help!

# **Project Status**

- **Current Status**: This project is in **active development**.
- **Upcoming Features**:
  - **Notifications**: Users will receive notifications for post likes, comments, mentions, follows, and other interactions.
  - **Content Moderation**: Admins will be able to flag posts or comments based on keywords, reports, or other indicators. Implement content filters (e.g., profanity filters, image moderation) for posts and comments. Users can report posts and comments as inappropriate.
- **Contributions**: Contributions are welcome! See the [Contributing](#contributing) section for more.
- **Known Issues**:
  - Issue 1: Add tests for admin endpoints.
  - See the [GitHub Issues page] for more.

# **Feedback**

We value your feedback and would love to hear from you! If you have any suggestions, improvements, or bugs to report, please feel free to:

- Open an issue on the [GitHub Issues page].
- Send us an email at [saddamarbaas@gmail.com].

Your feedback helps us improve the project and provide a better experience for everyone.

# **Support**

For support, email saddamarbaas@gmail.com.

# **License**

This project is licensed under the [MIT License](LICENSE).

You are free to use, modify, and distribute the code, but please ensure you follow the terms of the license. See the [LICENSE](LICENSE) file for more details.

# 🔗 Social Links

[![linkedin](https://img.shields.io/badge/linkedin-Code?style=for-the-badge&logo=linkedin&logoColor=white&color=0077B5)](https://www.linkedin.com/in/saddamarbaa/)

[![twitter](https://img.shields.io/badge/twitter-Code?style=for-the-badge&logo=twitter&logoColor=white&color=1DA1F2)](https://twitter.com/ArbaaSaddam)

# **Related Projects**

### **E-Commerce & Social API** built with Node.js, Express, MongoDB, and TypeScript

- [**API Repository**](https://github.com/saddamarbaa/node-express-mongodb-typescript-ecom-social-rest-api)
- An open-source RESTful API for User Authentication, E-commerce Management, and Social Media Post Management.
- Includes features such as Filter, Pagination, Sort, and Search APIs to enhance your application.

---

### **Developer Match API** built with Node.js, Express, TypeScript, and MongoDB

- [**API Repository**](https://github.com/saddamarbaa/node-express-mongodb-developer-match-rest-api)
- An open-source RESTful API helping developers connect and collaborate.
- Offers user authentication, developer profile management, and match-based interactions to foster collaboration.

---

### **Twitter API** built with Node.js, Express, and MongoDB

- [**API Repository**](https://github.com/saddamarbaa/twitter-clone-api)
- A simple Twitter clone API for building a social media platform with features like user authentication, tweets, follows.

---

### **Netflix API** built with Node.js, Express, and MongoDB

- [**API Repository**](https://github.com/saddamarbaa/netflix-clone-api)
- A clone of Netflix's backend API that allows you to manage movies, users, and subscriptions, with features such as authentication and content management.

# Screenshots

## Software Requirements

https://docs.google.com/document/d/1lZvacY90Yo19QcnJxRJyy1AAZkTi0Vi5qXHTtptqAiU/edit

![image](https://user-images.githubusercontent.com/51326421/111891042-f857f580-8a21-11eb-8bb9-310f0c666f91.png)

## Business Requirements

![image](https://user-images.githubusercontent.com/51326421/111891112-b4192500-8a22-11eb-92e9-20854d336b57.png)

## Technical Requirements

![image](https://user-images.githubusercontent.com/51326421/111891149-33a6f400-8a23-11eb-9f98-bea822a938f3.png)

## User Flow

https://app.diagrams.net/#G1DYvf-0FWMjC2nDzFbvAgbJ03Zg8DLfRZ

![image](https://user-images.githubusercontent.com/51326421/111890990-5b955800-8a21-11eb-89db-3f552bd8f7ff.png)

## Blog App: Wireframe

https://app.diagrams.net/#G1Wo8rd6DVJUyCwp7aC6kLpvMkBM3Mgh8l

## Rresponsive on large screens(Home Page)

![image](https://user-images.githubusercontent.com/51326421/198089229-140a67d9-5cbc-42ea-b871-c84437bbebbe.png)

## Responsive on mobile and tablet screens

![image](https://user-images.githubusercontent.com/51326421/198090336-7f9db2bf-6f5f-4c77-84ea-74025d027e55.png)

## Post detail page

![image](https://user-images.githubusercontent.com/51326421/198090667-46907f31-58d1-44d8-a995-bea487ec9458.png)

## Edit new post page

![image](https://user-images.githubusercontent.com/51326421/198096430-5c5928b0-f39d-44c0-ad80-ab887615a743.png)

## Edit post page

![image](https://user-images.githubusercontent.com/51326421/198090907-759c57f7-c3ca-4d9e-bdd7-5f57bfcb57ac.png)

## Login Page

![image](https://user-images.githubusercontent.com/51326421/198091036-5306633d-60da-4c9b-8457-ef2e54c5ba0b.png)

![image](https://user-images.githubusercontent.com/51326421/198091134-4582d1b6-33ed-403f-9f33-2544ee9372e7.png)

![image](https://user-images.githubusercontent.com/51326421/198091226-a97c21f4-7661-4614-a6ca-e7b98aacf068.png)

## Register page

![image](https://user-images.githubusercontent.com/51326421/198091354-d8d03db0-97c1-4315-8a43-e8fb6351b230.png)

![image](https://user-images.githubusercontent.com/51326421/198091554-d18d0adf-2a79-42cb-8d83-33920e2ba3d3.png)

## Forgot password page

![image](https://user-images.githubusercontent.com/51326421/198091856-c917f9b5-17a8-4aa6-b91e-f1636cfee361.png)

![image](https://user-images.githubusercontent.com/51326421/198092467-0e393c59-fb00-48ad-9c93-55b116794f1d.png)

## Reset password page

![image](https://user-images.githubusercontent.com/51326421/198092583-0437999c-dc3e-4a5a-ac47-7f1eac4bba8d.png)

# **Blog REST API**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://your-build-link)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20.1.0-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.1-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0.3-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)](https://www.typescriptlang.org/)

**An open-source**, scalable, and fully-featured RESTful API built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**. It provides a seamless experience for user authentication, blog post management, and advanced features such as filtering, pagination, sorting, full-text search, and a newsletter subscription.

This API is designed to support a wide range of blog functionalities, including user account management, content creation, commenting, and moderation, with robust admin capabilities for user and post management. It's optimized for performance and easy to extend for custom use cases.

## **Key Features**

- **User Authentication & Authorization**: Signup, login, password reset, JWT token-based authentication.
- **Blog Management**: Create, read, update, delete posts, and manage user-generated content.
- **Advanced Features**: Filtering, sorting, and pagination for posts and comments, along with full-text search functionality.
- **Admin Capabilities**: User and post management, user blocking, and comment moderation.
- **Newsletter Subscription**: Users can subscribe to receive newsletters, verify their email, and choose between weekly or daily updates.

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
- [Sponsorship](#sponsorship)
- [Project Status](#project-status)
- [Related Projects](#related-projects)
- [Feedback](#feedback)
- [Support](#support)
- [Screenshots](#screenshots)
- [License](#license)
- [Star History](#star-history)

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

### **Newsletter Subscription**

- Users can subscribe to receive newsletters.
- Email verification is required to confirm the subscription.
- Users can select the frequency of their newsletters: **weekly** or **daily**.
- The system sends a confirmation email with a unique verification link upon subscription.
- Users can unsubscribe at any time, and the system will handle the cancellation of their subscription.

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
- [Newsletter](#newsletter-api-reference)
  - [Newsletter Subscribe](#newsletter-subscribe)
  - [Newsletter Unsubscribe](#newsletter-unsubscribe)
  - [Newsletter Verify Email](#newsletter-verify-email)

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
- **Password Validation:** The password must match the confirm password field.
- **Email Uniqueness:** The email address must be unique and not already registered in the system.
- **Authorization:** None required.

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

- **firstName**: User's first name (required).
- **lastName**: User's last name (required).
- **email**: User's email address (required, must be unique).
- **password**: User's password (required).
- **confirmPassword**: Password confirmation (required).
- **bio**: User's short biography (optional).
- **skills**: Array of skills (optional).
- **profileUrl**: URL of the user's profile picture (optional).
- **acceptTerms**: Boolean indicating if the user accepts terms and conditions (required).
- **confirmationCode**: A confirmation code (optional, for advanced validation).
- **gender**: User's gender (optional).

**Request Header:**

```json
{
  "Content-Type": "application/json"
}
```

**Request Example:**

```http
POST /api/v1/user/signup
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "confirmPassword": "SecurePassword123",
  "bio": "Developer passionate about technology.",
  "skills": ["JavaScript", "Node.js", "React"],
  "profileUrl": "https://example.com/profile.jpg",
  "acceptTerms": true,
  "confirmationCode": "abc123",
  "gender": "male"
}
```

**Response:**

- **Success (201):**

```json
{
  "success": true,
  "error": false,
  "message": "Auth Signup is success. An Email with Verification link has been sent to your account john.doe@example.com Please Verify Your Email first or use the email verification link which has been sent with the response body to verify your email",
  "status": 201,
  "data": {
    "accessToken": "generatedAccessToken",
    "refreshToken": "generatedRefreshToken",
    "verifyEmailLink": "https://example.com/verify-email?id=12345&token=generatedRefreshToken"
  }
}
```

- **Error (422): Validation Error:**

```json
{
  "success": false,
  "error": "Validation error",
  "message": "One or more fields are invalid.",
  "status": 422,
  "data": null
}
```

- **Error Responses:**

  - **(409) Email already exists:**

  ```json
  {
    "success": false,
    "error": true,
    "message": "E-Mail address john.doe@example.com is already exists, please pick a different one.",
    "status": 409
  }
  ```

  - **(400) Passwords do not match:**

  ```json
  {
    "success": false,
    "error": true,
    "message": "Password and confirm password do not match.",
    "status": 400
  }
  ```

  - **(400) Invalid email format:**

  ```json
  {
    "success": false,
    "error": true,
    "message": "Invalid email format.",
    "status": 400
  }
  ```

  - **(500) Internal Server Error:**

  ```json
  {
    "success": false,
    "error": true,
    "message": "Internal server error.",
    "status": 500
  }
  ```

#### **Flow:**

1. The user sends a `POST` request with their details such as first name, last name, email, and password.
2. The server checks if the email is already registered. If it is, it responds with a `409 Conflict` error.
3. If the email is not registered, the server generates a user profile URL and determines the role based on the email address.
4. The user is created in the database, and a new token instance (access and refresh tokens) is generated for the user.
5. A verification email containing a link to confirm the user's email is sent.
6. The server responds with a `201 Created` status, including the tokens and verification link in the response body.

#### **Note:**

- The user is required to verify their email address before completing the registration process.
- If the email is already in use, the user is notified with a `409 Conflict` error.
- The server uses environment variables to define token expiration times and other configurations.
- Email errors are logged for debugging but do not interrupt the registration flow in the development environment.

---

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

- **Verification Token:** The token is used to verify the email address and ensure it is valid and not expired.
- **Account Status:** After successful verification, the user's status is set to "active" and the account is marked as verified.

#### **Success Response:**

- **Success (200):**

```json
{
  "success": true,
  "error": false,
  "message": "Your account has been successfully verified. Please Login.",
  "status": 200,
  "data": null
}
```

#### **Error Responses:**

- **(400) Invalid or Expired Token:**

```json
{
  "success": false,
  "error": true,
  "message": "Email verification token is invalid or has expired. Please click on resend for verify your Email.",
  "status": 400,
  "data": null
}
```

- **(200) Already Verified:**

```json
{
  "success": true,
  "error": false,
  "message": "Your email has already been verified. Please Login.",
  "status": 200,
  "data": null
}
```

- **(500) Internal Server Error:**

```json
{
  "success": false,
  "error": true,
  "message": "Internal server error.",
  "status": 500,
  "data": null
}
```

#### **Example Request:**

```http
POST /api/v1/auth/verify-email/12345/abc123
```

#### **Request Header:**

```json
{
  "Content-Type": "application/json"
}
```

#### **Request Example:**

```http
POST /api/v1/auth/verify-email/12345/abc123
```

#### **Flow:**

1. The user clicks on the email verification link, which contains the `userId` and `token`.
2. The server checks if the user exists using the `userId`. If the user is not found, an error response is returned.
3. The server checks if the user is already verified. If the user is already verified and their status is `active`, the server responds with a success message indicating that they can log in.
4. The server looks for the email verification token in the database. If the token is invalid or expired, an error response is returned.
5. If the token is valid, the user's `isVerified` field is updated to `true`, and the status is set to `active`. The user is now marked as verified.
6. The email verification token is deleted from the database.
7. The server responds with a success message indicating that the user's account has been verified and that they can log in.

#### **Notes:**

- If the user has already verified their email, they will be notified that their email is already verified and can proceed to log in.
- The server uses the `userId` and `token` to identify and verify the user. If either is invalid or expired, the server responds with a `400 Bad Request` error.
- The token is deleted after successful email verification to prevent reuse.
- If the token is valid and verification is successful, the user’s account status is updated to 'active', and the `isVerified` field is set to `true`.

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
- **Functionality:** Authenticates the user by validating their email and password. If valid, it generates an access token and a refresh token.
- **Tokens:** The generated tokens (access and refresh) are returned and stored in cookies for future requests.
- **Email Verification:** If the user's email is not verified or the account is inactive, the user will be prompted to verify their email.

#### **Success Response:**

- **Success (200):**

```json
{
  "success": true,
  "error": false,
  "message": "Auth logged in successful.",
  "status": 200,
  "data": {
    "accessToken": "generatedAccessToken",
    "refreshToken": "generatedRefreshToken",
    "authToken": "generatedAccessToken"
  }
}
```

#### **Error Responses:**

- **(401) Invalid Credentials:**

```json
{
  "success": false,
  "error": true,
  "message": "Auth Failed (Invalid Credentials)",
  "status": 401,
  "data": null
}
```

- **(401) Email Not Verified:**

```json
{
  "success": false,
  "error": true,
  "message": "Your Email has not been verified. An Email with Verification link has been sent to your account. Please verify your email first or use the email verification link sent with the response.",
  "status": 401,
  "data": {
    "accessToken": "generatedAccessToken",
    "refreshToken": "generatedRefreshToken",
    "verifyEmailLink": "https://website.com/verify-email?id=userId&token=refreshToken"
  }
}
```

- **(422) Validation Error:**

```json
{
  "success": false,
  "error": "Validation error",
  "message": "One or more fields are invalid, missing, or email not in the correct format.",
  "status": 422,
  "data": null
}
```

- **(500) Internal Server Error:**

```json
{
  "success": false,
  "error": true,
  "message": "Internal server error.",
  "status": 500,
  "data": null
}
```

#### **Request Example:**

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### **Request Header:**

```json
{
  "Content-Type": "application/json"
}
```

#### **Cookies Set:**

- `accessToken` (expires in 1 day)
- `refreshToken` (expires in 7 days)

#### **Flow:**

1. The user submits their `email` and `password` to the server.
2. The server verifies the user's credentials.
3. If valid, the server generates an `accessToken` and `refreshToken`.
4. If the email is not verified, the server sends a verification email with a link to verify the email address.
5. If the credentials are incorrect, the user is notified of the failure.
6. Tokens are stored in cookies for future use.

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
- **Functionality:** Logs the user out by removing their refresh token from the database and clearing the associated cookies (accessToken and refreshToken).
- **Token Deletion:** The refresh token is removed from the database, and both access and refresh tokens are deleted from the user's cookies.

#### **Success Response:**

- **Success (200):**

```json
{
  "success": true,
  "error": false,
  "message": "Successfully logged out 😏 🍀",
  "status": 200,
  "data": null
}
```

#### **Error Responses:**

- **(400) Bad Request:**

```json
{
  "success": false,
  "error": true,
  "message": "Bad Request (Token not found or invalid)",
  "status": 400,
  "data": null
}
```

- **(422) Validation Error:**

```json
{
  "success": false,
  "error": "Validation error",
  "message": "refreshToken fields is invalid format.",
  "status": 422,
  "data": null
}
```

- **(500) Internal Server Error:**

```json
{
  "success": false,
  "error": true,
  "message": "Internal server error.",
  "status": 500,
  "data": null
}
```

#### **Request Example:**

```http
POST /api/v1/auth/logout
Content-Type: application/json

{
  "refreshToken": "yourRefreshTokenHere"
}
```

#### **Request Header:**

```json
{
  "Content-Type": "application/json"
}
```

#### **Flow:**

1. The user submits their `refreshToken` to log out.
2. The server checks if the refresh token exists in the database.
3. If the token is invalid or not found, the request returns a `400 Bad Request` error.
4. If the refresh token is valid, the server deletes the refresh token from the database.
5. The cookies containing `accessToken` and `refreshToken` are cleared.
6. The user is successfully logged out, and the server returns a success resp

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
- **Functionality:** This endpoint allows an authenticated user to delete their account. If the authenticated user is an admin, they are allowed to delete any user. However, an admin cannot delete themselves.
- **Authorization:**
  - **User:** A user can delete only their own profile.
  - **Admin:** Admins can delete users, but they cannot delete their own account.

#### **Success Response:**

- **Success (200):**

```json
{
  "success": true,
  "error": false,
  "message": "Successfully deleted user by ID {userId}",
  "status": 200,
  "data": null
}
```

#### **Error Responses:**

- **(400) Bad Request:**

```json
{
  "success": false,
  "error": true,
  "message": "Bad Request (User not found)",
  "status": 400,
  "data": null
}
```

- **(403) Forbidden:**

```json
{
  "success": false,
  "error": true,
  "message": "Auth Failed (Admin can't remove themselves from admin, please ask another admin)",
  "status": 403,
  "data": null
}
```

- **(403) Forbidden:**

```json
{
  "success": false,
  "error": true,
  "message": "Auth Failed (Unauthorized)",
  "status": 403,
  "data": null
}
```

- **(422) Unprocessable Entity:**

```json
{
  "success": false,
  "error": true,
  "message": "Failed to delete user by given ID {userId}",
  "status": 422,
  "data": null
}
```

- **(500) Internal Server Error:**

```json
{
  "success": false,
  "error": true,
  "message": "Internal server error.",
  "status": 500,
  "data": null
}
```

#### **Request Example:**

```http
DELETE /api/v1/users/{userId}
Content-Type: application/json
Authorization: Bearer {accessToken}
```

#### **Request Header:**

```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

#### **Flow:**

1. The authenticated user submits a request to delete a user by their `userId`.
2. The server checks if the user exists.
3. If the user is an admin trying to delete their own account, the request returns a `403 Forbidden` error.
4. If the authenticated user is not authorized (i.e., not their own profile), the request returns a `403 Forbidden` error.
5. If the user is found and eligible to delete, the account is deleted from the database.
6. The server returns a success message if the deletion is successful.
7. If there are any errors (e.g., user not found, deletion failed), the server returns an appropriate error response.

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
- **Functionality:** This endpoint allows an authenticated user to update their account details, including personal information like name, email, phone number, bio, skills, and more. Only the user themselves can update their account information, and they must be authenticated.
- **Authorization:** The user must be authenticated, and the request must be made by the user themselves (based on the user ID in the request parameter).

#### **Request Parameters:**

- **`:userId`** (path parameter): The ID of the user whose account is being updated.

#### **Request Body:**

```json
{
  "firstName": "string", // The user's first name.
  "lastName": "string", // The user's last name.
  "dateOfBirth": "string", // The user's date of birth (ISO 8601 date string).
  "email": "string", // The user's email address.
  "bio": "string", // The user's bio or description.
  "skills": "array", // List of the user's skills.
  "profileUrl": "string", // URL to the user's profile picture or website.
  "acceptTerms": "boolean", // Boolean indicating if the user accepts the terms.
  "phoneNumber": "string", // The user's phone number.
  "gender": "string" // The user's gender.
}
```

#### **Success Response:**

- **Success (200):**

```json
{
  "success": true,
  "error": false,
  "message": "Successfully updated user by ID: userId",
  "status": 200,
  "data": {
    "user": {
      "firstName": "string",
      "lastName": "string",
      "dateOfBirth": "string",
      "email": "string",
      "bio": "string",
      "skills": "array",
      "profileUrl": "string",
      "acceptTerms": "boolean",
      "phoneNumber": "string",
      "gender": "string"
    }
  }
}
```

#### **Error Responses:**

- **(400) Invalid User ID:**

```json
{
  "success": false,
  "error": true,
  "message": "User not found.",
  "status": 400,
  "data": null
}
```

- **(403) Unauthorized:**

```json
{
  "success": false,
  "error": true,
  "message": "Auth Failed (Unauthorized)",
  "status": 403,
  "data": null
}
```

- **(422) Email Already Exists:**

```json
{
  "success": false,
  "error": true,
  "message": "E-Mail address is already exists, please pick a different one.",
  "status": 422,
  "data": null
}
```

- **(500) Internal Server Error:**

```json
{
  "success": false,
  "error": true,
  "message": "Internal server error.",
  "status": 500,
  "data": null
}
```

#### **Request Example:**

```http
PUT /api/v1/users/12345/update
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "bio": "Software developer with a passion for coding.",
  "skills": ["JavaScript", "Node.js", "React"],
  "profileUrl": "https://example.com/johndoe",
  "acceptTerms": true,
  "phoneNumber": "+1234567890",
  "gender": "male"
}
```

#### **Flow:**

1. **User Validation:**

   - The server first checks if the user exists by querying the database using the `userId` from the request parameters.
   - If the user is not found, a `400 Bad Request` error is returned.

2. **Authorization Check:**

   - The server checks if the request is made by the authenticated user themselves by comparing the `userId` from the request parameters with the `_id` of the authenticated user (`req.user._id`).
   - If the user is not authorized, a `403 Forbidden` error is returned.

3. **Email Validation:**

   - If the user provides an email, the server checks if any other user with the same email exists. If a user with the same email exists and is not the same user, an error response (`422 Unprocessable Entity`) is returned.

4. **Update User Details:**

   - The server updates the user fields with the provided data, keeping the existing values if no new values are provided in the request body.

5. **Save the Updated User:**

   - The server saves the updated user data in the database.
   - If the update fails, a `422 Unprocessable Entity` error is returned.

6. **Successful Update:**

   - On successful update, the server responds with the updated user details, excluding sensitive information like `password` and `role`.

7. **Error Handling:**
   - The server logs any errors and returns appropriate error messages based on the error type (e.g., invalid user, unauthorized access, or internal server errors).

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
- **Functionality:** This endpoint allows a user to refresh their authentication tokens (access and refresh tokens) using a valid refresh token. If the refresh token is valid, the server will generate new access and refresh tokens and send them back to the client, typically for extended sessions without requiring the user to log in again.
- **Authorization:** The request must include a valid `refreshToken`.

#### **Request Body:**

```json
{
  "refreshToken": "string"
}
```

#### **Success Response:**

- **Success (200):**

```json
{
  "success": true,
  "error": false,
  "message": "Auth logged in successful.",
  "status": 200,
  "data": {
    "user": {
      "accessToken": "newAccessToken",
      "refreshToken": "newRefreshToken"
    }
  }
}
```

#### **Error Responses:**

- **(400) Invalid or Expired Refresh Token:**

```json
{
  "success": false,
  "error": true,
  "message": "Invalid or expired refresh token.",
  "status": 400,
  "data": null
}
```

- **(500) Internal Server Error:**

```json
{
  "success": false,
  "error": true,
  "message": "Internal server error.",
  "status": 500,
  "data": null
}
```

#### **Request Example:**

```http
POST /api/v1/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "yourRefreshTokenHere"
}
```

#### **Flow:**

1. **Token Lookup:**

   - The server looks for the provided `refreshToken` in the database.
   - If the token is not found, the server responds with a `400 Bad Request` error.

2. **Token Verification:**

   - The server attempts to verify the `refreshToken` to extract the associated user ID.
   - If the token is invalid or expired, the server returns an error response indicating that the token is invalid or expired.

3. **Token Generation:**

   - If the refresh token is valid, the server generates new access and refresh tokens for the user.
   - The server uses the `userId` extracted from the refresh token to create the new tokens.

4. **Saving the New Tokens:**

   - The new `accessToken` and `refreshToken` are saved in the database, updating the user's existing token record.

5. **Response and Cookies:**
   - The server sends the newly generated tokens in the response body.
   - The new tokens are also set as cookies in the user's browser with the following properties:
     - `accessToken` cookie (expires in 1 day)
     - `refreshToken` cookie (expires in 7 days)
   - The cookies are set as `httpOnly` for security, and the `secure` flag is set if the environment is in production.

## **Get Profile**

```http
GET /api/v1/auth/profile
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

#### **Description:**

- **Endpoint:** `GET /api/v1/auth/profile`
- **Functionality:** This endpoint allows an authenticated user to retrieve their own profile information.
- **Authorization:**
  - **Authenticated User:** The request must include a valid authentication token (JWT) in the `Authorization` header. The profile returned will contain user data excluding sensitive information like `password`, `confirmPassword`, `status`, `isDeleted`, `acceptTerms`, and `isVerified`.

#### **Success Response:**

- **Success (200):**

```json
{
  "success": true,
  "error": false,
  "message": "Successfully found user profile 🍀",
  "status": 200,
  "data": {
    "user": {
      "_id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "profileUrl": "http://example.com/profile.jpg",
      "bio": "Hello, I am John Doe",
      "following": [
        {
          "_id": "following_user_id",
          "firstName": "Jane",
          "lastName": "Smith",
          "profileUrl": "http://example.com/jane.jpg",
          "bio": "I love coding!"
        }
      ],
      "followers": [
        {
          "_id": "follower_user_id",
          "firstName": "Sam",
          "lastName": "Green",
          "profileUrl": "http://example.com/sam.jpg",
          "bio": "I am a software developer!"
        }
      ],
      "blocked": [
        {
          "_id": "blocked_user_id",
          "firstName": "Blocked",
          "lastName": "User",
          "profileUrl": "http://example.com/blocked.jpg",
          "bio": "This user is blocked"
        }
      ]
    }
  }
}
```

#### **Error Responses:**

- **(401) Unauthorized:**

```json
{
  "success": false,
  "error": true,
  "message": "Auth Failed",
  "status": 401,
  "data": null
}
```

- **(500) Internal Server Error:**

```json
{
  "success": false,
  "error": true,
  "message": "Internal server error.",
  "status": 500,
  "data": null
}
```

#### **Request Example:**

```http
GET /api/v1/users/profile
Authorization: Bearer {accessToken}
```

#### **Request Header:**

```json
{
  "Authorization": "Bearer {accessToken}"
}
```

#### **Flow:**

1. The user sends a `GET` request to retrieve their profile.
2. The request must include a valid JWT token in the `Authorization` header.
3. The server queries the database for the user's profile, excluding sensitive data such as `password`, `confirmPassword`, `status`, `isDeleted`, `acceptTerms`, and `isVerified`.
4. The profile includes user information, as well as data on the user's followers, following, and blocked users.
5. If the user is found, the profile is returned with a success message.
6. If the user is not found, an `Auth Failed` error is returned with a `401 Unauthorized` status.
7. If any server-side errors occur, an `Internal Server Error` message is returned.

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
- **Functionality:** This endpoint allows an authenticated user to upload their profile photo. The profile photo will be stored on the server, and the user's profile will be updated with the new photo URL.
- **Authorization:** The user must be authenticated and provide their authentication token in the request headers.

#### **Request Headers:**

- **Authorization**: Bearer `<token>`
  - The user must include their authentication token in the `Authorization` header for the request to be authorized.

#### **Request Body:**

The request should include the profile photo as a **multipart/form-data** upload.

```multipart/form-data
{
  "profilePhoto": "<image file>"
}
```

- **`profilePhoto`** (required): The profile image file to upload. The image should be in an accepted format (e.g., JPG, PNG, JPEG).

#### **Success Response:**

- **Success (200):**

```json
{
  "success": true,
  "error": false,
  "message": "Profile photo uploaded successfully.",
  "status": 200,
  "data": {
    "user": {
      "profileUrl": "string" // URL to the uploaded profile photo
    }
  }
}
```

#### **Error Responses:**

- **(400) Bad Request (Invalid File Format):**

```json
{
  "success": false,
  "error": true,
  "message": "Invalid file format. Please upload a valid image file.",
  "status": 400,
  "data": null
}
```

- **(403) Unauthorized:**

```json
{
  "success": false,
  "error": true,
  "message": "Auth Failed (Unauthorized). Please login.",
  "status": 403,
  "data": null
}
```

- **(500) Internal Server Error:**

```json
{
  "success": false,
  "error": true,
  "message": "Internal server error. Please try again later.",
  "status": 500,
  "data": null
}
```

#### **Request Example:**

```http
POST /api/v1/auth/profile-photo-upload
Authorization: Bearer <your-auth-token>
Content-Type: multipart/form-data

{
  "profilePhoto": "<image-file>"
}
```

#### **Flow:**

1. **Authentication Check:**

   - The server checks if the request contains a valid `Authorization` token in the header.
   - If the token is missing or invalid, a `403 Unauthorized` error is returned.

2. **File Validation:**

   - The server checks if the uploaded file is a valid image (e.g., JPG, PNG, JPEG).
   - If the file format is invalid, a `400 Bad Request` error is returned.

3. **Save Profile Photo:**

   - The server saves the uploaded profile photo in the server’s designated directory.
   - The URL of the uploaded photo is then stored in the user's profile.

4. **Profile Update:**
   - The user’s `profileUrl` is updated with the URL of the newly uploaded photo.
5. **Successful Response:**

   - Upon success, the server responds with the new `profileUrl` and a success message.

6. **Error Handling:**
   - In case of an internal error or an issue with the upload process, an appropriate error message and status code are returned.

#### **Notes:**

- Only authenticated users are allowed to upload a profile photo.
- The uploaded photo is stored on the server and the URL is saved in the user's profile for future use.
- Ensure the file is in an accepted format (JPG, PNG, JPEG) and within the allowed size limit (if applicable).

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

- **Endpoint:** `POST /api/v1/auth/forgot-password`
- **Functionality:** This endpoint allows a user to request a password reset by providing their email address. If the email is valid and associated with a registered user, a password reset link will be sent to the user's email address. The link includes a token that will allow the user to reset their password.
- **Authorization:** None required.

#### **Request Body:**

- **email**: The user's email address (required).

```json
{
  "email": "user@example.com"
}
```

#### **Success Response:**

- **Success (200):**

```json
{
  "success": true,
  "error": false,
  "message": "Auth success. An Email with Rest password link has been sent to your account user@example.com  please check to rest your password or use the the link which is been send with the response body to rest your password",
  "status": 200,
  "data": {
    "user": {
      "resetPasswordToken": "https://example.com/reset-password?id=user_id&token=refresh_token"
    }
  }
}
```

#### **Error Responses:**

- **(401) Invalid Email:**

```json
{
  "success": false,
  "error": true,
  "message": "The email address user@example.com is not associated with any account. Double-check your email address and try again.",
  "status": 401,
  "data": null
}
```

- **(500) Internal Server Error:**

```json
{
  "success": false,
  "error": true,
  "message": "Internal server error.",
  "status": 500,
  "data": null
}
```

#### **Request Example:**

```http
POST /api/v1/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### **Request Header:**

```json
{
  "Content-Type": "application/json"
}
```

#### **Flow:**

1. The user sends a `POST` request with their email address in the body.
2. The server checks if the provided email is associated with a registered user.
3. If the email is valid, the server generates a new `accessToken` and `refreshToken` for the user.
4. A password reset link is generated and sent to the user's email address.
5. The email includes a link with a token to reset the user's password.
6. If successful, the server responds with a `200 OK` status and a message confirming that the password reset email has been sent.
7. If the email is not associated with any account, an error message is returned with a `401 Unauthorized` status.
8. In case of server errors, a `500 Internal Server Error` response is returned.

#### **Note:**

- The email will contain a link to reset the password. The link will expire after a specified time, and users must reset their password before the link expires.
- The password reset token is included in the reset link, which the user can use to reset their password.
- Errors related to sending emails are ignored in the development environment but logged for debugging.

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
- **Functionality:** This endpoint allows a user to reset their password using a valid password reset token. The user must provide a new password and confirm password, which will be updated in the system. The reset token is verified for validity and expiration.
- **Authorization:** None required (but the reset token must be valid).

#### **Request Parameters:**

- **userId**: The unique identifier of the user (in the URL).
- **token**: The password reset token (in the URL).

#### **Request Body:**

- **password**: The new password (required).
- **confirmPassword**: The confirmation of the new password (required).

```json
{
  "password": "newPassword123",
  "confirmPassword": "newPassword123"
}
```

#### **Success Response:**

- **Success (200):**

```json
{
  "success": true,
  "error": false,
  "message": "Your password has been Password Reset Successfully updated please login",
  "status": 200,
  "data": {
    "loginLink": "https://example.com/login"
  }
}
```

#### **Error Responses:**

- **(401) Invalid or Expired Token:**

```json
{
  "success": false,
  "error": true,
  "message": "Password reset token is invalid or has expired.",
  "status": 401,
  "data": null
}
```

- **(400) Bad Request:**

```json
{
  "success": false,
  "error": true,
  "message": "Invalid password reset token.",
  "status": 400,
  "data": null
}
```

- **(500) Internal Server Error:**

```json
{
  "success": false,
  "error": true,
  "message": "Internal server error.",
  "status": 500,
  "data": null
}
```

#### **Request Example:**

```http
POST /api/v1/auth/reset-password/12345/abcde12345
Content-Type: application/json

{
  "password": "newPassword123",
  "confirmPassword": "newPassword123"
}
```

#### **Request Header:**

```json
{
  "Content-Type": "application/json"
}
```

#### **Flow:**

1. The user sends a `POST` request with the new password and confirmation password along with the `userId` and `token` in the URL.
2. The server checks if the user exists based on the `userId` provided.
3. If the user does not exist, the server responds with a `401 Unauthorized` error.
4. The server verifies the password reset token for the provided user (`userId` and `token`).
5. If the token is invalid or expired, the server responds with a `401 Unauthorized` error.
6. If the token is valid, the server updates the user's password and clears the associated tokens in the database.
7. The server clears cookies for `accessToken` and `refreshToken` for security purposes.
8. A confirmation email is sent to the user indicating the successful password reset, and a login link is provided.
9. The server responds with a `200 OK` status and a message confirming the successful password reset along with a login link.

#### **Note:**

- The password reset token is checked for validity, and if it has expired, the user is informed via a `401 Unauthorized` response.
- After a successful password reset, the user is logged out (cookies are cleared), and they are asked to log in again using their new password.
- Email sending errors are ignored in the development environment but logged for debugging.

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

# **Newsletter API Reference**

## **Newsletter Subscribe**

```http
POST /api/v1/newsletter/subscribe
```

| Parameter | Type     | Description              | Required |
| :-------- | :------- | :----------------------- | :------- |
| `email`   | `string` | The user's email address | yes      |

#### **Description:**

- **Endpoint:** `POST /api/v1/newsletter/subscribe`
- **Functionality:** Subscribes the user to the newsletter. The user will receive email updates about new content, promotions, or updates.
- **Subscription Confirmation:** A confirmation email will be sent to the user’s email address with a link to verify the subscription.

#### **Success Response:**

- **Success (200):**

```json
{
  "success": true,
  "error": false,
  "message": "You have successfully subscribed to the newsletter.",
  "status": 200,
  "data": {
    "email": "user@example.com"
  }
}
```

#### **Error Responses:**

- **(400) Bad Request:**

```json
{
  "success": false,
  "error": true,
  "message": "Email is already subscribed or invalid email format.",
  "status": 400,
  "data": null
}
```

- **(422) Validation Error:**

```json
{
  "success": false,
  "error": "Validation error",
  "message": "One or more fields are invalid or missing.",
  "status": 422,
  "data": null
}
```

- **(500) Internal Server Error:**

```json
{
  "success": false,
  "error": true,
  "message": "Internal server error.",
  "status": 500,
  "data": null
}
```

#### **Request Example:**

```http
POST /api/v1/newsletter/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "preferences": {
    "topics": ["Technology", "Business"],
    "frequency": "Weekly"
  }
}
```

#### **Request Header:**

```json
{
  "Content-Type": "application/json"
}
```

#### **Flow:**

1. The user submits their `email` and `name` to subscribe to the newsletter.
2. A confirmation email with a subscription verification link is sent to the provided email address.
3. The user clicks on the verification link to confirm their subscription.
4. Upon successful verification, the user will start receiving the newsletter.

---

## **Newsletter Unsubscribe**

```http
POST /api/v1/newsletter/unsubscribe
```

| Parameter | Type     | Description              | Required |
| :-------- | :------- | :----------------------- | :------- |
| `email`   | `string` | The user's email address | yes      |

#### **Description:**

- **Endpoint:** `POST /api/v1/newsletter/unsubscribe`
- **Functionality:** Unsubscribes the user from the newsletter. The user will no longer receive email updates.

#### **Success Response:**

- **Success (200):**

```json
{
  "success": true,
  "error": false,
  "message": "You have successfully unsubscribed from the newsletter.",
  "status": 200,
  "data": {
    "email": "user@example.com"
  }
}
```

#### **Error Responses:**

- **(400) Bad Request:**

```json
{
  "success": false,
  "error": true,
  "message": "Email is not subscribed or invalid email format.",
  "status": 400,
  "data": null
}
```

- **(500) Internal Server Error:**

```json
{
  "success": false,
  "error": true,
  "message": "Internal server error.",
  "status": 500,
  "data": null
}
```

#### **Request Example:**

```http
POST /api/v1/newsletter/unsubscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### **Request Header:**

```json
{
  "Content-Type": "application/json"
}
```

#### **Flow:**

1. The user submits their `email` to unsubscribe from the newsletter.
2. The user will no longer receive the newsletter emails.
3. If the email is not found in the system, the user is notified of the error.

---

## **Newsletter Verify Email**

```http
GET /api/v1/newsletter/verify-email/:token
```

| Parameter | Type     | Description                  | Required |
| :-------- | :------- | :--------------------------- | :------- |
| `token`   | `string` | The email verification token | yes      |

#### **Description:**

- **Endpoint:** `GET /api/v1/newsletter/verify-email/:token`
- **Functionality:** Verifies the user's email address by the provided `token`. Once the email is verified, the user will be successfully subscribed to the newsletter.

#### **Success Response:**

- **Success (200):**

```json
{
  "success": true,
  "error": false,
  "message": "Email verified successfully. You are now subscribed to the newsletter.",
  "status": 200,
  "data": {
    "email": "user@example.com"
  }
}
```

#### **Error Responses:**

- **(400) Bad Request:**

```json
{
  "success": false,
  "error": true,
  "message": "Invalid or expired verification token.",
  "status": 400,
  "data": null
}
```

- **(500) Internal Server Error:**

```json
{
  "success": false,
  "error": true,
  "message": "Internal server error.",
  "status": 500,
  "data": null
}
```

#### **Request Example:**

```http
GET /api/v1/newsletter/verify-email/verificationToken123
```

#### **Flow:**

1. The user clicks on the verification link sent to their email.
2. The system verifies the `token` and subscribes the user to the newsletter.
3. The user receives a confirmation message that their email has been verified and the subscription is complete.

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

# **Contributing**

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. We deeply appreciate all contributions, whether it's fixing bugs, adding features, or suggesting improvements. Thank you for being a part of our community! 🥰

If you'd like to contribute, please follow these steps:

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

# **Sponsorship**

If you find api helpful, please consider sponsoring us. Your support will help us to continue developing and maintaining the project.

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

# Star history

[![Star History Chart](https://api.star-history.com/svg?repos=saddamarbaa/node-express-mongodb-typescript-blog-rest-api&type=Date)](https://star-history.com/#&Date)

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

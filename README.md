# MERN Library Management System
A full-stack application that streamlines library operations built as a Information Technology Project (ITP)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [API endpoints](#api-endpoints)
- [Technology Stack](#technology-stack)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The MERN Library Management System is designed to modernize library operations by tackling key inefficiencies such as dependency on physical library cards and the absence of a recommendation system. Developed as part of the Information Technology Project (ITP), this system leverages the MERN stack with a TypeScript template to deliver an intuitive and efficient solution for librarians, library users, and guests.<br>
With features like QR code-based book loans, automated return tracking, TF-IDF-powered recommendations, and third-party API integration, this project showcases cutting-edge web technologies aimed at enhancing user experience and optimizing data management.

## Features
- **User Authentication:** Secure login system for librarians and users, leveraging JWT.
- **Library Data Management:** CRUD functionality for users, books, contacts, and book metadata.
- **QR Code Book Loans:** Scan QR codes to borrow books seamlessly.
- **Loan & Return Tracking:** Log borrowing transactions, returns, and fine management.
- **Book Recommendation System:** Uses TF-IDF and loan data analysis for personalized suggestions.
- **Third-Party API Integration:** Fetch book details (ratings, ISBN, etc.) via the Google Books API.

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/TomWai821/MERN_LibraryManagementSystem.git
   cd MERN_LibraryManagementSystem

2. **Download dependencies:**
   ```bash
   npm install

3. **Set up environment variable:**
   Create a .env file in client directories based on the configuration part

4. **Run the application:**
   ```bash
   # For the server side
   nodemon backend/index.ts  
   
   # For the client side
   npm start
   
   # For the user who download concurrency
   npm run both
   
## API Endpoints
**For Authenication:**
1. For login
   ```
   Endpoint: `POST /api/user/Login`

   Request Body Example:
   {
      "email":"TimmyChan@gmail.com",
      "password: "123456"
   }
2. For Registration
   ```
   Endpoint: `POST /api/user/Register`
   
   Request Body Example:
   {
      "username":"Timmy Chan",
      "email":"TimmyChan@gmail.com",
      "password":"123456",
      "birthDay":"1/1/1999",
      "gender":"Male"
   }

   Validator in backend:
   1. Both request body are not allow null/empty value
   2. Username at least require 3 characters
   3. Password at least require 6 characters

   Remarks:
   1. User record creation are using register API (In registration page/User management page)
   2. Password will hashing with bcrypt
   3. birthDay will transfer to Date type in backend side
**For User Data (Require auth token in header):**
1. Get User data (For user management/suspend list)
   ```
   Endpoint: `GET /api/user/UserData/tableName=:tableName` (For all record)
   Endpoint: `GET /api/user/UserData/tableName=:tableName?username=a` (For username filtering)
   Endpoint: `GET /api/user/UserData/tableName=:tableName?status=Normal` (For status filtering)
   Endpoint: `GET /api/user/UserData/tableName=:tableName?role=User` (For role filtering)
   Endpoint: `GET /api/user/UserData/tableName=:tableName?gender=Male` (For gender filtering)

   Remarks: tableName = SuspendUser/AllUser
2. Get User data (For the direct user only)
   ```
   Endpoint: `GET /api/user/UserData`

   Remarks: It just require the auth token in header
5. Modify User data 
   ```
   Endpoint: `PUT /api/user/UserData/id=:id`

   Request Body Example:
   {
      "username": "Johnny Chan",
      "password": "444444",
      "gender":"Female",
      "role":"Admin"
   }

   Remarks: id = MongoDB ObjectID in user collection
6. Modify User data (For user himself)
   ```
   Endpoint: `PUT /api/user/UserData/type=:type`
   
   Request body(For username):
   {
      "username": "Jacky Wong"
   }

   Request body(For password):
   {
      password: "444444"
   }

   Remarks:
   1. type = username/password
   2. It will get the data from user collection with auth token(unhashed by JWT, then transfer to userID) before modify the username/password

7. Modify user status (Include Suspend User/Unsuspend User)
   ```
   Endpoint: `PUT /api/user/Status/id=:id`

   Request Body Example(For Suspend User):
   {
      "StatusForUserList": "Suspend",
      "description": "Does not return book many times",
      "startDate": "9-6-2025T04:06:50.006+00:00",
      "dueDate": "9-7-2025T04:06:50.006+00:00"
   }

   Request Body Example(For Unsuspend User):
   {
      "StatusForUserList": "Normal",
   }

   Remarks: id = MongoDB ObjectID in user collection
8. Delete User data
   ```
   EndPoint: `DELETE /api/user/User/id=:id`

   Remarks: id = MongoDB ObjectID in user collection
**For Suspend List (Require auth token in header):**
   1. Modify Suspend List data
      ```
      Endpoint: `PUT /SuspendListData/id=:id`

      Request Body Example:
      {
         "banListID":""
         "dueDate":"8-7-2025T04:06:50.006+00:00"
         "description":"Does not return books and paid fines many time"
      }

      Remarks:
      1. id = the MongoDB ObjectID in user collection, it use to ensure the account was exist
      2. banListID = the MongoDB ObjectID in suspendList
**For Book Data (Require auth token in header):**

**For Loan Books (Require auth token in header):**

**For Book data definition (Require auth token in header):**

**For contact data (Require auth token in header):**
1. Creating a new contact:
   ```
   Endpoint: `GET /api/book/contact/type=:type`
   
   Request Body Example(Author):
   {
      "author":"author",
      "phoneNumber: "N/A",
      "email": "N/A"
   }
   
   Request Body Example(Publisher):
   {
      "publisher":"publisher",
      "phoneNumber: "N/A",
      "email": "N/A"
   }
2. Get the whole contact data:
   ```
   Endpoint: `POST /api/book/contact/type=:type`<br>
   Endpoint(For author filtering): `POST /api/book/contact/type=Author?author=a`
   Endpoint(For publisher filtering): `POST /api/book/contact/type=Publisher?author=a`
3. Update the contact data:
   ```
   Endpoint: `PUT /api/book/contact/type=:type`
   
   Request Body Example(Author):
   {
      "id": ""
      "author": "author",
      "phoneNumber: "12345678",
      "email": "author@gmail.com"
   }
   
   Request Body Example(Publisher):
   {
      "id": ""
      "publisher": "publisher",
      "phoneNumber: "12345678",
      "email": "publisher@gmail.com"
   }
   
   Remarks: id = MongoDB ObjectID in author/publisher collection
4. Delete the contact data:
   ```
   Endpoint: `DELETE /api/book/contact/type=:type`
   
   Request Body Example:<br>
   {
      "id": ""
   }
   
   Remarks: id = MongoDB ObjectID
## Technology Stack
- **Front-end:** React, Material-UI for styling
- **Back-end:** Node.js, Express.js
- **Database:** MongoDB, Mongoose (With Nodemon for development)
- **Image Data Handling:** Multer
- **Data security:** JWT(JSON web token) for Authentication, Bcrypt for password hashing
- **TF-IDF Algorithms:** natural
- **Other**: RESTful APIs with modular design

## Configuration (Environment Variable)
- `REACT_APP_GOOGLE_BOOKS_API_KEY` - The API key of Google Books
- `REACT_APP_GOOGLE_BOOKS_BASE_URL` - The base URL for google books API 
- `REACT_APP_LOCAL_HOST` - The local host for backend (like http://localhost:${port}/api)
- `REACT_APP_MAIN_PAGE` - The local host for the main page (like http://localhost:${port})

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b ${branchname}`).
3. Commit your changes (`git commit -m "comment"`).
4. Push the branch (`git push origin`).
5. Open a Pull Request.

## License

MIT License

Copyright (c) 2025 TomWai821

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.

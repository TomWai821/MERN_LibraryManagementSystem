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
   npm start
   
   # For the client side
   nodemon backend/index.ts
   
   # For the user who download concurrency
   npm run both
   
## API Endpoints


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

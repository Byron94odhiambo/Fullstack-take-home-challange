# Teacher's Portal Application
## Overview
This application is designed to help teachers manage their classes, lesson plans, grading, and messages. The application features a book search functionality to aid in lesson planning and allows teachers to maintain a reading list.

## Features
-Book Search
-Reading List Management
-Class Management
-Lesson Planning
-Grading and Feedback
-Messaging
-Settings

## Technologies Used
-React
-Apollo Client
-GraphQL
-Material-UI (MUI)
-React Spring
-React Helmet
-TypeScript (Backend)

## Getting Started
Prerequisites
Make sure you have the following installed:

Node.js (>= 12.x)
npm (>= 6.x)
Installation
Clone the repository:


git clone https://github.com/your-username/teachers-portal.git
cd teachers-portal
Install dependencies for the backend:

bash
Copy code
cd fullstack-take-home-test/backend
npm install
Install dependencies for the frontend:

bash
Copy code
cd ../frontend/ello
npm install
Running the Application
Start the GraphQL server:
Ensure you have a running GraphQL server on http://localhost:4000/graphql. If you do not have one, you will need to set it up. From the backend directory:

bash
Copy code
npm start
Start the development server:
From the frontend/ello directory:

bash
Copy code
npm start
The application should now be running on http://localhost:3000.

Building for Production
To create a production build of the application, run:

bash
Copy code
npm run build
The optimized production build will be generated in the build folder.

Project Structure
kotlin
Copy code
ello-book-assignment
└── fullstack-take-home-test
    ├── .gitignore
    ├── backend
    │   ├── .eslintrc.json
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── src
    │   │   ├── app.ts
    │   │   ├── data
    │   │   │   └── books.ts
    │   │   ├── resolvers
    │   │   │   └── index.ts
    │   │   └── schema
    │   │       └── index.ts
    │   └── tsconfig.json
    ├── ello
    ├── ello.pub
    ├── frontend
    │   ├── assets
    │   │   ├── image1.webp
    │   │   ├── image10.webp
    │   │   ├── image2.webp
    │   │   ├── image3.webp
    │   │   ├── image4.webp
    │   │   ├── image5.webp
    │   │   ├── image6.webp
    │   │   ├── image7.webp
    │   │   ├── image8.webp
    │   │   ├── image9.webp
    │   ├── ello
    │   │   ├── .gitignore
    │   │   ├── package-lock.json
    │   │   ├── package.json
    │   │   ├── public
    │   │   │   ├── favicon.ico
    │   │   │   ├── index.html
    │   │   │   ├── logo192.png
    │   │   │   ├── logo512.png
    │   │   │   ├── manifest.json
    │   │   │   └── robots.txt
    │   │   ├── README.md
    │   │   ├── src
    │   │   │   ├── ApolloClient.js
    │   │   │   ├── App.css
    │   │   │   ├── App.js
    │   │   │   ├── App.test.js
    │   │   │   ├── components
    │   │   │   │   ├── BookList.js
    │   │   │   │   ├── BookSearch.js
    │   │   │   │   ├── NavBar.js
    │   │   │   │   ├── ReadingList.js
    │   │   │   │   ├── SearchResults.js
    │   │   │   ├── index.css
    │   │   │   ├── index.js
    │   │   │   ├── logo.svg
    │   │   │   ├── queries.js
    │   │   │   ├── reportWebVitals.js
    │   │   │   └── setupTests.js
    └── README.md
backend/: Contains the server-side code including GraphQL schema and resolvers.
frontend/: Contains the client-side code including React components.
frontend/ello/: Contains the main React application.
frontend/ello/public/: Contains public assets for the React application.
frontend/ello/src/: Contains the source code for the React application.
Consistent Updates
I am actively working on this project and making regular updates to improve functionality and address any issues. If you encounter any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch.
Make your changes.
Submit a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for more information.

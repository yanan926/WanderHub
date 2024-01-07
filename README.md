# WanderHub

WanderHub

## Overview

WanderHub is a comprehensive travel companion designed to simplify the travel planning process and enhance the overall travel experience for users. The app aims to provide travel destination visual inspiration and interactive features for seamless trip planning.

### Problem

Planning a trip involves multiple steps, including researching destinations and planning itineraries. Travelers often face challenges in finding their interested travel destinations . Additionally, the lack of a central platform for visual inspiration and community interaction makes the trip planning process fragmented and time-consuming.

### User Profile

- Travel enthusiasts:
  - Planning vacations, weekend getaways, or spontaneous trips
  - Seeking inpirations for travel desinations
  - Interested in exploring new destinations and sharing experiences with a community

### Features

- As a user, I want to explore visual inspiration through a curated collection of high-quality travel images.
- As a user, I want to create personalized travel itineraries with ease.
- As a user, I want to engage with a community of fellow travelers, sharing experiences, tips, and recommendations.

#### Tech Stack

- React
- JavaScript
- MongoDB 
- Express
- Client libraries:
  - react
  - react-router
  - axios
  - cloudinary
  - multer
- Server libraries:
  - mongoose
  - express
  - passport

#### APIs

- Cloudinary for uploading user image to the cloud
- Chatgpt api to generate the travel plan

### Sitemap

- Home page
<img width="1386" alt="Screenshot 2024-01-07 at 1 41 41 PM" src="https://github.com/yanan926/WanderHub/assets/39099003/ab7012da-7566-4fc4-8b0e-50c4036e366f">
<img width="1404" alt="Screenshot 2024-01-07 at 1 42 17 PM" src="https://github.com/yanan926/WanderHub/assets/39099003/95fe300b-c463-40a0-a0b3-d0d97b4df2e8">

- Discover Destinations (Visual Inspiration Gallery)
<img width="1354" alt="Screenshot 2024-01-07 at 1 43 19 PM" src="https://github.com/yanan926/WanderHub/assets/39099003/2c0c9692-b501-484d-8bf4-0e055c67f8c6">


- Create Itinerary
<img width="700" alt="Screenshot 2024-01-07 at 1 45 06 PM" src="https://github.com/yanan926/WanderHub/assets/39099003/3c7e6396-f1f9-4090-889e-990de93cc9b8">

- Post personal comment to desinations
<img width="696" alt="Screenshot 2024-01-07 at 1 44 08 PM" src="https://github.com/yanan926/WanderHub/assets/39099003/94aaba8d-64a1-4086-95e5-73cba599c021">
  

### Installation on developer and production environments
Frontend (Vite)
Install Dependencies:

Navigate to the frontend directory (/frontend) and run:
npm i
Run Development Server:

Start the Vite development server with:
npm run dev
Backend (Express, MongoDB)
Clone the Backend Repository:

Clone the backend repository from WanderHubServer.
Install Backend Dependencies:

Navigate to the backend directory (/WanderHubServer) and run:
npm i
Set Up MongoDB:

The database is deployed on MongoDB Atlas, ready for use. If needed, install MongoDB manually.

Seed the Database:

Run the seeds file to insert data into the local database:
node seeds/index.js

Start the Backend Server:

Start the backend server with:
npm i
nodemon index.js



# WanderHub

Delopyed Demo: https://wander-hub.vercel.app/

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

### Home page
<img width="1386" alt="Screenshot 2024-01-07 at 1 41 41 PM" src="https://github.com/yanan926/WanderHub/assets/39099003/ab7012da-7566-4fc4-8b0e-50c4036e366f">
<img width="1404" alt="Screenshot 2024-01-07 at 1 42 17 PM" src="https://github.com/yanan926/WanderHub/assets/39099003/95fe300b-c463-40a0-a0b3-d0d97b4df2e8">

### Discover Destinations (Visual Inspiration Gallery)
<img width="1354" alt="Screenshot 2024-01-07 at 1 43 19 PM" src="https://github.com/yanan926/WanderHub/assets/39099003/2c0c9692-b501-484d-8bf4-0e055c67f8c6">


### Create Itinerary
<img width="700" alt="Screenshot 2024-01-07 at 1 45 06 PM" src="https://github.com/yanan926/WanderHub/assets/39099003/3c7e6396-f1f9-4090-889e-990de93cc9b8">

### Post personal comment to desinations
<img width="696" alt="Screenshot 2024-01-07 at 1 44 08 PM" src="https://github.com/yanan926/WanderHub/assets/39099003/94aaba8d-64a1-4086-95e5-73cba599c021">

### Post personal images to share with other users

<img width="669" alt="Screenshot 2024-01-07 at 2 15 51 PM" src="https://github.com/yanan926/WanderHub/assets/39099003/f24558d4-947c-438b-b993-5aa6e8c9d951">

### Installation on developer and production environments

### Client Side Setup

1. **Insert API Key:**
   - For the client side, users need to insert their own `.env` file with the ChatGPT API key.

### Frontend (Vite)

1. **Install Dependencies:**
   - Navigate to the frontend directory (`/frontend`) and run:
     ```bash
     npm i
     ```

2. **Run Development Server:**
   - Start the Vite development server with:
     ```bash
     npm run dev
     ```

### Backend (Express, MongoDB)

1. **Clone the Backend Repository:**
   - Clone the backend repository from [WanderHubServer](https://github.com/yanan926/WanderHubServer).

2. **Install Backend Dependencies:**
   - Navigate to the backend directory (`/WanderHubServer`) and run:
     ```bash
     npm i
     ```

3. **Set Up MongoDB:**
   - The database is deployed on MongoDB Atlas. It should be ready for use. However, if the cloud database doesn't work, install MongoDB manually.

4. **Seed the Database(Only if using local MongoDB database):**
   - Run the seeds file to insert data into the database:
     ```bash
     node seeds/index.js
     ```

5. **Start the Backend Server:**
   - Start the backend server with:
     ```bash
     npm i
     nodemon index.js
     ```
### Next steps
- Finish the comments delete and edit function
- Save user's populated travel plans for futrue use






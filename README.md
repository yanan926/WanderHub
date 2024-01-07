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
- Discover Destinations (Visual Inspiration Gallery)
- Create Itinerary
- Post personal comment to desinations
- User Profile
- Notifications

### Installation on developer and production environments
For client side, user need to insert their own .env file with chatgpt api key.
The front end is created with vite, user can type 'npm i' and 'npm run dev' after pulling the code from github.
The back end ( "https://github.com/yanan926/WanderHubServer") used node, express and mongoDB. I have deployed my database to mongoAltas. It should be ready to use. Otherwise, user needs to install mongdb database manully. The seeds file can be run as "node seeds/index.js" to insert all the data to the database. To start this back end, user
shoud use commands as "npm i" and "nodemon index.js"


#CommunityHub - A Mini LinkedIn-like Platform
A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that functions as a simple professional community platform. Users can create accounts, upload profile pictures, make text and image-based posts, and view a public feed of all community activity.

## Live Demo
Live Site URL: Your-Vercel-App-URL.vercel.app (Replace this with your actual Vercel deployment URL)

## Features
- User Authentication: Secure user registration and login with JWT (JSON Web Tokens).
-Rich User Profiles: Profiles include user's name, bio, and a profile picture uploaded to Cloudinary.
-Interactive Post Feed: A central feed that displays all user posts in chronological order.
-Create Posts with Images: Users can create text-only posts or upload an image to share with their post.
-Profile Popover: A sleek popover in the navbar for quick access to the user's profile and logout functionality.
-View Other Profiles: Click on any user's name or picture to navigate to their dedicated profile page and see all of their posts.

## Tech Stack & Tools
-Frontend: React (with Vite), React Router, Tailwind CSS, Axios

-Backend: Node.js, Express.js, ES Modules

-Database: MongoDB (with Mongoose)

-Image Hosting: Cloudinary

-Authentication: JWT, bcryptjs

###Deployment:

-Backend API on Render

-Frontend on Vercel

## Local Setup and Installation
To run this project on your local machine, follow these steps:

### Prerequisites:

Node.js and npm

Git

MongoDB Atlas account

Cloudinary account

1. Clone the repository:

git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
cd your-repository-name

2. Setup Backend:

cd backend
npm install

Create a .env file in the backend directory and add the following variables with your own credentials:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_and_random_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Then, run the backend server:

npm start

The API will be running on http://localhost:5000.

3. Setup Frontend:
In a new terminal, navigate to the frontend directory:

cd frontend
npm install

Run the frontend development server:

npm run dev

The application will open on http://localhost:5173 (or another port if 5173 is busy).



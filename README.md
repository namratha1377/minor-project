AI Stylish Wardrobe

A modern React application for managing your wardrobe. Upload pictures of your clothes, organize them into a clean gallery, and create outfits. This project is built as part of a minor project assignment.

Features

User authentication (Login & Register pages)

Upload and manage clothing items

Local image preview using Object URLs

Clothing gallery with responsive layout

Create outfits from selected clothing items

Persistent storage using LocalStorage (temporary until backend integration)

Modern UI styled with Tailwind CSS

Client-side routing with React Router

Tech Stack

React 18 — Component-based UI

React Router DOM — Navigation

Tailwind CSS — Styling

Vite — Build tool

LocalStorage — Temporary data persistence

Project Structure
minor-project/
│── src/
│   ├── pages/
│   │   ├── Login.jsx          # Login page
│   │   ├── Register.jsx       # Registration page
│   │   ├── Home.jsx           # Main dashboard with upload & gallery
│   │   ├── AddItem.jsx        # Upload clothing item form
│   │   ├── CreateOutfit.jsx   # Select items to create Outfit
│   │   ├── MyOutfits.jsx      # Saved outfits page
│   ├── components/
│   │   └── UploadClothingPreview.jsx
│   ├── api/
│   │   └── upload.jsx
│   ├── utils/
│   │   └── storage.jsx
│   ├── App.jsx                # App routing
│   ├── main.jsx               # Entry point
│   ├── index.css              # Global styles & Tailwind
│── index.html
│── package.json
│── README.md
│── vite.config.js
│── tailwind.config.js
│── postcss.config.js
│── .gitignore

Getting Started
Prerequisites

Node.js v16 or later

npm or yarn installed

Installation

Install dependencies:

npm install


Start development server:

npm run dev


Open your browser and navigate to:

http://localhost:5173

Build for Production
npm run build


The production build will appear in the dist/ folder.

Usage
Authentication

Register: Create an account (simulated — any values work for now).

Login: Sign in using any email/password.

Managing Your Wardrobe

Log in to access the Home dashboard

Click Upload Items to upload clothing images

Your items appear in the wardrobe gallery

Click Remove on an item to delete it

Creating Outfits

Click Create Outfit in the navigation bar

Select required clothing categories:

At least 1 Top

At least 1 Bottom or 1 Dress

At least 1 Accessory

At least 1 Pair of Shoes

Click Preview Outfit (simulation)

Click Create Outfit (temporary — shows a "work in progress" alert)

Created outfits are saved in My Outfits

Current Status

Frontend UI: Completed

Authentication: Simulated

Image Upload: LocalStorage-only (temporary)

Gallery UI: Completed

Create Outfit: Client-side version completed

Backend Integration: Pending

Database Setup: Pending

Notes for Backend Team

When backend integration begins, the following endpoints will be needed:

1. Authentication

POST /api/auth/register — Register new user

POST /api/auth/login — Login user

POST /api/auth/logout — Optional logout endpoint

2. Clothing Items

GET /api/clothes — Fetch user's clothing items

POST /api/clothes — Upload new item

DELETE /api/clothes/:id — Delete clothing item

3. Outfits

POST /api/outfits — Create a new outfit

GET /api/outfits — Fetch user's saved outfits

Development Notes

State is handled using React hooks (useState, useEffect)

Temporary persistence through browser LocalStorage

Image previews use URL.createObjectURL

Backend will eventually replace all temporary local data usage

License

This project is part of a minor project assignment.
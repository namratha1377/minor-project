# AI Stylish Wardrobe

A modern React frontend application for managing your wardrobe. Upload pictures of your clothes, view them in a beautiful grid gallery, and create outfits (coming soon).

## Features

- 🔐 User authentication (Login & Register pages)
- 📸 Upload and manage clothing images
- 🖼️ Grid gallery view of all uploaded clothes
- 🎨 Modern, responsive design with Tailwind CSS
- 🧭 React Router for seamless navigation

## Tech Stack

- **React 18** - UI library
- **React Router DOM** - Navigation
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Project Structure

```
ai-wardrobe/
├── src/
│   ├── pages/
│   │   ├── Login.jsx       # Login page component
│   │   ├── Register.jsx    # Registration page component
│   │   └── Home.jsx        # Main dashboard with upload & gallery
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind CSS imports
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Usage

### Authentication

- **Register**: Create a new account (simulated - any data works for now)
- **Login**: Sign in with your credentials (simulated - any email/password works)

### Managing Your Wardrobe

1. After logging in, you'll see the Home page
2. Click "Upload Clothes" to select and upload images
3. View all your uploaded clothes in the grid gallery
4. Click "Remove" on any item to delete it
5. Use "Create Outfit" button (placeholder for future backend integration)

## Current Status

- ✅ Frontend UI complete
- ✅ Authentication flow (simulated)
- ✅ Image upload (local storage simulation)
- ✅ Image gallery display
- ⏳ Backend integration (pending)
- ⏳ Database connection (pending)
- ⏳ Create Outfit feature (pending)

## Notes for Backend Team

The frontend is ready for backend integration. Here's what needs to be connected:

1. **Authentication API endpoints**:
   - POST `/api/auth/register` - User registration
   - POST `/api/auth/login` - User login
   - POST `/api/auth/logout` - User logout

2. **Clothing API endpoints**:
   - GET `/api/clothes` - Fetch user's clothes
   - POST `/api/clothes` - Upload new clothing item
   - DELETE `/api/clothes/:id` - Delete clothing item

3. **Outfit API endpoints**:
   - POST `/api/outfits` - Create new outfit
   - GET `/api/outfits` - Fetch user's outfits

## Development

The app uses:
- **Local state management** with React hooks (`useState`)
- **LocalStorage** for authentication persistence (temporary)
- **Object URLs** for image preview (temporary - will be replaced with backend URLs)

## License

This project is part of a minor project assignment.


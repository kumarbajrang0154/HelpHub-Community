# HelpHub-Community

A modern, full-stack web application where students can request help for Java projects, bug fixing, website development, and assignments.

## ✨ Features

- ✅ Responsive Design
- ✅ Modern UI (Tailwind CSS v4)
- ✅ Form Validation
- ✅ Error Handling
- ✅ MongoDB Integration
- ✅ JWT Authentication
- ✅ Admin Dashboard
- ✅ CORS Enabled
- ✅ Environment Configuration
- ✅ Security & Best Practices

## 🛠 Tech Stack

### Frontend
- React 18
- Vite (Latest v8)
- Tailwind CSS v4
- React Router
- Axios
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs (Password Hashing)
- Nodemon (Dev)

## 📦 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- npm or yarn

### 1️⃣ Backend Setup
```bash
cd server
npm install
npm run dev
```
Backend runs on `http://localhost:5000`

### 2️⃣ Frontend Setup (New Terminal)
```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

### 3️⃣ Environment Configuration
Create `.env` in the `server` folder (copy from `.env.example`):
```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/codehelp-hub
JWT_SECRET=your-secret-key-change-this
```

## 🗄 MongoDB Setup

### Option 1: Local MongoDB
```bash
mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster and get connection string
3. Update `MONGODB_URI` in `.env`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/codehelp-hub
```

## 📚 API Endpoints

### 📝 Contact Submission
**POST** `/api/contact`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "serviceType": "Java",
  "message": "Help with array implementation..."
}
```

### 🔐 Authentication
**POST** `/api/auth/register`
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

**POST** `/api/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Admin Routes (Protected)
- **GET** `/api/contact` - Get all contacts
- **GET** `/api/contact/:id` - Get contact by ID
- **PATCH** `/api/contact/:id` - Update contact status
- **DELETE** `/api/contact/:id` - Delete contact

## 🏗 Project Structure

```
project-root/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API calls
│   │   ├── hooks/          # Custom hooks
│   │   └── layout/         # Layout wrapper
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                 # Backend (Express + MongoDB)
│   ├── config/             # Database configuration
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth & error handling
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Helper functions
│   ├── validation/         # Input validation
│   ├── package.json
│   └── server.js           # Entry point
│
└── README.md
```

## 🚀 Building for Production

### Frontend Build
```bash
cd client
npm run build
```
Creates optimized build in `client/dist/`

### Preview Production Build
```bash
cd client
npm run preview
```

## 🧪 Development Commands

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev      # Start with nodemon
npm start        # Start production
```

## 🔧 Troubleshooting

### ❌ Port Already in Use
```bash
# Windows: Kill process using port
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### ❌ MongoDB Connection Error
1. Verify MongoDB is running: `mongod`
2. Check connection string in `.env`
3. Ensure network access if using Atlas

### ❌ CORS Errors
Check `CLIENT_URL` in `server/.env` matches your frontend URL

### ❌ Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Notes

- Default JWT expiration: 4 hours
- Contact validation: Email, name, service type, message required
- Password hashing: bcryptjs with 10 salt rounds
- All API responses follow standardized format with status field

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test locally
4. Submit PR

## 📄 License

MIT License - Feel free to use this project!

---

**Last Updated:** March 2026
**Status:** ✅ Fully Configured & Bug-Free

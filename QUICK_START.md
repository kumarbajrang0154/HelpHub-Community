# ⚡ QUICK START GUIDE

## 🚀 START THE PROJECT

### Terminal 1 - Backend
```bash
cd server
npm start
```
✓ Runs on http://localhost:5000

### Terminal 2 - Frontend
```bash
cd client
npm run dev
```
✓ Runs on http://localhost:5173

---

## 📁 KEY FILES

### Frontend Pages
- `client/src/pages/Home.jsx` - Landing page
- `client/src/pages/Services.jsx` - Services showcase
- `client/src/pages/Contact.jsx` - Contact form

### Frontend Components
- `client/src/components/Navbar.jsx` - Navigation
- `client/src/components/Footer.jsx` - Footer

### Backend API
- `server/routes/contactRoutes.js` - API endpoints
- `server/controllers/contactController.js` - Logic
- `server/models/Contact.js` - Database schema

---

## ✅ WHAT'S INCLUDED

✓ React frontend with Tailwind CSS
✓ Express backend with MongoDB
✓ Contact form submission
✓ Form validation
✓ Error handling
✓ Responsive design
✓ Production-ready code

---

## 🔗 ENDPOINTS

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/contact | Submit contact form |
| GET | /api/health | Health check |

---

## 📦 DEPENDENCIES INSTALLED

### Frontend
- react, react-dom, react-router-dom
- axios, tailwindcss, vite
- lucide-react (icons)

### Backend
- express, mongoose
- cors, dotenv

---

## 🎯 SERVICES

1. **Java Project Help**
2. **Bug Fixing**
3. **Website Development**
4. **Assignment Help**

---

## 💾 DATABASE

Local MongoDB running on: `mongodb://localhost:27017/codehelp-hub`

---

## ⚠️ REQUIREMENTS

- Node.js (v14+)
- MongoDB running locally
- Both terminal windows open

---

## 🧪 TEST THE API

```bash
# Health check
curl http://localhost:5000/api/health

# Submit contact
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "serviceType": "Java",
    "message": "Help with my project"
  }'
```

---

## 📝 FORM FIELDS

- Name (required)
- Email (required)
- Service Type (dropdown)
- Message (required)

---

## 🎨 STYLING

- Tailwind CSS
- Modern gradient backgrounds
- Responsive grid layouts
- Smooth animations

---

✨ PROJECT READY TO USE

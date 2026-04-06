import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./components/Toast";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Services from "./pages/Services";
import Dashboard from "./pages/dashboard/Dashboard";
import Tool from "./pages/Tool";
import ChatFullScreen from "./pages/ChatFullScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import Chatbot from "./components/Chatbot";
import GlobalBackButton from "./components/GlobalBackButton";
import ScrollProgress from "./components/ScrollProgress";

const App = () => {
  return (
<<<<<<< HEAD
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tool/:serviceName"
            element={
              <ProtectedRoute>
                <Tool />
              </ProtectedRoute>
            }
          />
          <Route path="/chat" element={<ChatFullScreen />} />
        </Routes>
        <Chatbot />
        <GlobalBackButton />
      </Router>
    </AuthProvider>
  );
};
=======
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/services"
                element={
                  <ProtectedRoute>
                    <Services />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tool/:serviceName"
                element={
                  <ProtectedRoute>
                    <Tool />
                    </ProtectedRoute>
                  }
                />
                <Route path="/chat" element={<ChatFullScreen />} />
              </Routes>
              <Chatbot />
              <GlobalBackButton />
              <ScrollProgress />
            </Router>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    );
  };
>>>>>>> 749c864 (AI Chatbot and Universal Back button added by Bajrang Kumar)

export default App;

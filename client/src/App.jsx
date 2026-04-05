import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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

const App = () => {
  return (
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

export default App;

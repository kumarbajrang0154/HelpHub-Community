import React from "react";
import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
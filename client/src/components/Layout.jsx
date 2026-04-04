import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, background: "#0f172a", minHeight: "100vh", color: "#fff" }}>
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
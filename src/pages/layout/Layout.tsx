import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Layout.css";

const layout = () => {
  return (
    <div className="layout-container">
      <Navbar></Navbar>
      <main className="main-container">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default layout;

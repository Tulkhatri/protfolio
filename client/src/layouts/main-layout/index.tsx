import { Outlet } from "react-router-dom";
import Header from "../header";
import SideBar from "../side-bar";
import Footer from "../footer";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="sidebar-outlet-wrapper">
        <SideBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

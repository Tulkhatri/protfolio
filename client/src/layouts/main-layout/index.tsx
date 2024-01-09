import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../header";
import SideBar from "../side-bar";
import Footer from "../footer";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  const token = window.localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="main-layout">
      <Header />
      <div className="sidebar-outlet-wrapper">
        <SideBar />
        <Outlet />
      </div>
      <Footer />
      <ToastContainer
        className="f-14-light"
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default MainLayout;

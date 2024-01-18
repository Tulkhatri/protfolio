import { Button } from "antd";
import { FaUserCircle } from "react-icons/fa";
// import { FaSquarePhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.setItem("token", "");
    navigate("/login");
  };
  return (
    <div className="header">
      <div className="d-flex-column">
        <div className="d-flex align-item-center gap-10">
          <FaUserCircle className="f-16-400 color-white" />
          <h4 className="f-16-400 color-white">Tul Khatri</h4>
        </div>
        <div className="d-flex align-item-center gap-10">
          <MdOutlineMail className="f-16-400 color-white" />
          <h1 className=" color-white">tulkhatri01@gmail.com</h1>
        </div>
      </div>
      <div className="d-flex align-item-center gap-10">
        {/* <FaSquarePhone className="f-16-400 color-white" />
        <div className="d-flex">
          <h1 className="f-16-400 color-white">0977-9847862779</h1>
        </div> */}
        <Button
          className="d-flex"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;

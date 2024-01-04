import { BsPersonExclamation } from "react-icons/bs";
import { GiSkills } from "react-icons/gi";
import { MdCastForEducation } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdWorkHistory } from "react-icons/md";
import { MdConnectWithoutContact } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
const SideBar = () => {
  const { pathname } = useLocation();
  return (
    <div className="sidebar">
      <Link to="/">
        <div className={`menu-item ${pathname === "/" && "active-menu"}`}>
          <MdDashboard className="f-18-700" />
          <p className="f-18-700">Dashboard</p>
        </div>
      </Link>
      <hr />
      <Link to="/about">
        <div className={`menu-item ${pathname === "/about" && "active-menu"}`}>
          <BsPersonExclamation className="f-18-700" />
          <p className="f-18-700">About</p>
        </div>
      </Link>
      <hr />
      <Link to="/skills">
        <div className={`menu-item ${pathname === "/skills" && "active-menu"}`}>
          <GiSkills className="f-18-700" />
          <p className="f-18-700">Skills</p>
        </div>
      </Link>
      <hr />
      <Link to="/education">
        <div
          className={`menu-item ${pathname === "/education" && "active-menu"}`}
        >
          <MdCastForEducation className="f-18-700" />
          <p className="f-18-700">Education</p>
        </div>
      </Link>
      <hr />
      <Link to="/work">
        <div className={`menu-item ${pathname === "/work" && "active-menu"}`}>
          <BsPersonWorkspace className="f-18-700" />
          <p className="f-18-700">Work</p>
        </div>
      </Link>
      <hr />
      <Link to="/experence">
        <div
          className={`menu-item ${pathname === "/experence" && "active-menu"}`}
        >
          <MdWorkHistory className="f-18-700" />
          <p className="f-18-700">Experence</p>
        </div>
      </Link>
      <hr />
      <Link to="/contact">
        <div
          className={`menu-item ${pathname === "/contact" && "active-menu"}`}
        >
          <MdConnectWithoutContact className="f-20-700" />
          <p className="f-18-700">Contact</p>
        </div>
      </Link>
      <hr />
    </div>
  );
};

export default SideBar;

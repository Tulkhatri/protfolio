import { BsPersonExclamation } from "react-icons/bs";
import { GiSkills } from "react-icons/gi";
import { MdCastForEducation } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdWorkHistory } from "react-icons/md";
import { MdConnectWithoutContact } from "react-icons/md";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="d-flex gap-10 align-item-center">
        <BsPersonExclamation className="f-18-700" />
        <p className="f-18-700">About</p>
      </div>
      <hr />
      <div className="d-flex gap-10 align-item-center">
        <GiSkills className="f-18-700" />
        <p className="f-18-700">Skills</p>
      </div>
      <hr />
      <div className="d-flex gap-10 align-item-center">
        <MdCastForEducation className="f-18-700" />
        <p className="f-18-700">Education</p>
      </div>
      <hr />
      <div className="d-flex gap-10 align-item-center">
        <BsPersonWorkspace className="f-18-700" />
        <p className="f-18-700">Work</p>
      </div>
      <hr />
      <div className="d-flex gap-10 align-item-center">
        <MdWorkHistory className="f-18-700" />
        <p className="f-18-700">Experence</p>
      </div>
      <hr />
      <div className="d-flex gap-10 align-item-center">
        <MdConnectWithoutContact className="f-20-700" />
        <p className="f-18-700">Contact</p>
      </div>
      <hr />
    </div>
  );
};

export default SideBar;

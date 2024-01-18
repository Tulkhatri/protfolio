import myImage from "../../assets/images/tul.jpg";
const Contact = () => {
  return (
    <div className="dashboard">
      <div className="left-portion">
        <p className="f-20-700">Hi</p>
        <p className="f-18-700">Contact</p>
        <p className="f-16-400">Contact</p>
      </div>
      <div className="right-portion">
        <div className="image-wrapper">
          <img src={myImage} alt="Tul Khatri" />
        </div>
      </div>
    </div>
  );
};

export default Contact;

import myImage from "../../assets/images/tul.jpg";
const About = () => {
  return (
    <div className="dashboard">
      <div className="left-portion">
        <p className="f-20-700">Image</p>
        <p className="f-18-700">Title</p>
        <p className="f-16-400">Dsicription</p>
      </div>
      <div className="right-portion">
        <div className="image-wrapper">
          <img src={myImage} alt="Tul Khatri" />
        </div>
      </div>
    </div>
  );
};

export default About;

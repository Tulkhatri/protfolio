import { FaSpinner } from "react-icons/fa";

const SuspenseLoader = () => {
  return (
    <div className="full-screen-loader">
      <FaSpinner />
    </div>
  );
};

export default SuspenseLoader;

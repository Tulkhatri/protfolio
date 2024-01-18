interface LoadingType {
  loading: boolean;
}
const Progressing = ({ loading }: LoadingType) => {
  return (
    <>
      {loading ? (
        <div className="progressing">
          <div className="bg_black"></div>
          <span className="loader"></span>
          {/* <ProgressBar animated now={100} /> */}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Progressing;

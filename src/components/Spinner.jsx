/* eslint-disable react/prop-types */
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }) => {
  return (
    <div>
      <ClipLoader
        color="#4338ca"
        loading={loading}
        cssOverride={override}
        size={150}
      />
    </div>
  );
};

export default Spinner;

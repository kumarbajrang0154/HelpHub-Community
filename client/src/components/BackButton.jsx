import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button type="button" className="back-button" onClick={() => navigate(-1)}>
      <FiArrowLeft size={18} />
      Back
    </button>
  );
};

export default BackButton;

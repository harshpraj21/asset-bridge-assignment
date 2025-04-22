import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const FloatingActionButton = ({ title, toNavigate, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (toNavigate) {
      navigate(toNavigate);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-blue-400 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
      title={title}
    >
      <Plus className="w-6 h-6" />
    </button>
  );
};

export default FloatingActionButton;

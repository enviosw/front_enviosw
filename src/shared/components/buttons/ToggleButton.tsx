
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ToggleButton = ({ open, setOpen }: { open: boolean; setOpen: (val: boolean) => void }) => {
  return (
    <div className="flex justify-center items-center px-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-2 px-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        <span>{open ? 'Ver Menos' : 'Ver Más'}</span>
        {open ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
      </button>
    </div>
  );
};

export default ToggleButton;

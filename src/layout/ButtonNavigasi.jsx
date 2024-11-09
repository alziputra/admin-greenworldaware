  import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { FaHouseChimney, FaUserLarge, FaVideo, FaRegNewspaper } from 'react-icons/fa6';

const ButtonNavigasi = ({ property = 'idle', className, icon, text }) => {
  const [state, dispatch] = useReducer(reducer, { property });

  const getButtonStyles = () => {
    return state.property === 'hovered' ? 'text-white hover:bg-[#3EBB5C]' : 'bg-[#C3EACC]';
  };

  const getIconStyles = () => {
    return state.property === 'hovered' ? 'text-white' : 'text-green-500';
  };

  return (
    <div
      className={`w-[200px] h-[45px] flex items-center p-5 rounded-md cursor-pointer justify-between mb-5 ${getButtonStyles()} ${className}`}
      onMouseLeave={() => dispatch({ type: 'mouseLeave' })}
      onMouseEnter={() => dispatch({ type: 'mouseEnter' })}
    >
      <div className="w-[168px] flex rounded-[10px] items-center">
        <div className={getIconStyles()}>{renderIcon(icon)}</div>
        <span className={`ml-2 ${state.property === 'hovered' ? 'text-white' : 'text-slate-700'}`}>{text}</span>
      </div>
    </div>
  );
};

function renderIcon(icon) {
  switch (icon) {
    case 'dashboard':
      return <FaHouseChimney />;
    case 'user':
      return <FaUserLarge />;
    case 'petition':
      return <FaVideo />;
    case 'news':
      return <FaRegNewspaper />;
    default:
      return null;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'mouseEnter':
      return {
        ...state,
        property: 'hovered',
      };
    case 'mouseLeave':
      return {
        ...state,
        property: 'idle',
      };
    default:
      throw new Error();
  }
}

ButtonNavigasi.propTypes = {
  property: PropTypes.oneOf(['idle', 'hovered', 'active']),
  className: PropTypes.string,
  icon: PropTypes.oneOf(['dashboard', 'user', 'video', 'news']).isRequired,
  text: PropTypes.string.isRequired,
};

export default ButtonNavigasi;

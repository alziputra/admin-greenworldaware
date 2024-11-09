import PropTypes from 'prop-types';

const ButtonPrimary = ({ handleButtonClick, children }) => {
  const buttonStyle = `bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer`;

  return (
    <button className={buttonStyle} onClick={handleButtonClick}>
      {children}
    </button>
  );
};

ButtonPrimary.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ButtonPrimary;

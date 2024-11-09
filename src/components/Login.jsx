import { useContext, useState } from 'react';
import ButtonPrimary from '../layout/ButtonPrimary';
import { AuthContext } from '../context/AuthContext';
import { Spinner } from 'flowbite-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checkboxError, setCheckboxError] = useState('');

  const { loading, handleLogin } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setCheckboxError('');
  };

  const handleButtonClick = (e) => {
    // Validasi input
    e.preventDefault();
    if (!email || !password) {
      setEmailError('Email is required');
      setPasswordError('Password is required');
      return;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    }

    // // Validasi checkbox
    // if (!isChecked) {
    //   setCheckboxError('Please check the checkbox');
    //   return;
    // }

    handleLogin(email, password);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center border bg-slate-50 w-full max-w-[660px] mt-10 mb-10 px-8 py-5 rounded-xl border-solid border-red-100 max-md:my-10 max-md:px-5">
        <img src="https://ik.imagekit.io/alzirahmana/Asset%20-%20mobile%20responsive%20web/GreenWorldAware-2%201.png?updatedAt=1696991576040" alt="Logo" />
        <form className="flex flex-col items-center bg-white self-stretch p-7 rounded-xl max-md:max-w-full max-md:px-5 gap-2">
          <div className="relative text-stone-900 text-xs font-bold leading-5 self-stretch my-2 w-full">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="Input your email"
              className={`text-gray-500 text-xs leading-5 tracking-normal shadow-sm bg-gray-200 px-5 py-3.5 rounded-xl w-full focus:ring-gray-500 focus:border-gray-500 dark:focus:ring-gray-500 dark:focus:border-gray-500 ${
                emailError ? 'border border-red-500' : ''
              }`}
            />
            {emailError && <p className="text-red-500 text-xs mt-1 absolute">{emailError}</p>}
          </div>
          <div className="relative text-stone-900 text-xs font-bold leading-5 self-stretch my-2 w-full">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Input your password"
              className={`text-gray-500 text-xs leading-5 tracking-normal shadow-sm bg-gray-200 px-5 py-3.5 rounded-xl w-full focus:ring-gray-500 focus:border-gray-500 dark:focus:ring-gray-500 dark:focus:border-gray-500 ${
                passwordError ? 'border border-red-500' : ''
              }`}
            />
            {passwordError && <p className="text-red-500 text-xs mt-1 absolute">{passwordError}</p>}
          </div>
          <div className="flex items-center font-bold leading-5 w-full max-w-full gap-2 mt-2 self-start">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="h-4 w-4 border text-green-500 bg-white rounded-sm border-solid cursor-pointer focus:ring-gray-500 focus:border-gray-500 dark:focus:ring-gray-500 dark:focus:border-gray-500"
              />
            </label>
            <div className="text-stone-900 text-xs font-bold leading-5">Remember me</div>
            {checkboxError && <p className="text-red-500 text-xs mt-1">{checkboxError}</p>}
          </div>

          <div className="flex items-center w-full max-w-full gap-5 mt-2 self-end">
            <div className="text-stone-900 text-xs font-medium leading-5 underline flex-1 cursor-pointer">Forgot Password?</div>
            <ButtonPrimary handleButtonClick={handleButtonClick}>{loading ? <Spinner /> : 'Login'}</ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

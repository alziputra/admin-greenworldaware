import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userData, handleLogout } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="">
      <div className="">
        <button type="button" className="items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded={isDropdownOpen} onClick={toggleDropdown}>
          <span className="sr-only">Open user menu</span>
          <img src={userData?.image || "https://via.placeholder.com/50"} className="w-8 h-8 rounded-full" alt="user photo" />
        </button>

        {isDropdownOpen && (
          <div className="z-50 right-10 absolute mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
            <div className="px-4 py-3" role="none">
              <p className="text-sm text-gray-900 dark:text-white" role="none">
                {userData?.firstName} {userData?.lastName}
              </p>
            </div>
            <ul className="py-1" role="none">
              <Link to="/setting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                Settings
              </Link>
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" onClick={handleLogout}>
                Logout
              </button>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

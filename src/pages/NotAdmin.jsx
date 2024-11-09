import { Button } from 'flowbite-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NotAdmin = () => {
  const { handleLogout } = useContext(AuthContext);
  return (
    <div className="flex flex-col justify-center items-center h-screen max-w-3xl m-auto gap-4">
      <p>You are not an admin</p>
      <Button color="dark" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
};

export default NotAdmin;

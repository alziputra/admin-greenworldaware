// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import AuthLogin from "./pages/auth/AuthLogin";
import Dashboard from "./pages/Dashboard/Dashboard";
import User from "./pages/Users/Users";
import News from "./pages/News/News";
import Edit from "./pages/News/edit";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import NotAdmin from "./pages/NotAdmin";
import NotFound from "./pages/NotFound";
import Add from "./pages/News/Add";
import Settings from "./pages/admin/Settings"; // Updated path for Settings
import { NewsContextProvider } from "./context/NewsContext";
import Petitions from "./pages/Petitions/Petitions";
import AddPetition from "./pages/Petitions/AddPetition";
import PetitionContextProvider from "./context/PetitionContext";
import { Toaster } from "react-hot-toast";
import EditPetition from "./pages/Petitions/EditPetition";

function App() {
  const { userData } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          userData?.role === "admin" ? (
            <>
              <SideBar />
              <Dashboard />
            </>
          ) : (
            <Navigate to="/forbidden" replace={true} />
          )
        }
      />
      {/* Settings route for authenticated users */}
      <Route
        path="/setting"
        element={
          userData ? (
            <>
              <SideBar />
              <Settings /> {/* Updated path for Settings */}
            </>
          ) : (
            <Navigate to="/login" replace={true} />
          )
        }
      />
      <Route
        path="/user"
        element={
          userData?.role === "admin" ? (
            <>
              <SideBar />
              <User />
            </>
          ) : (
            <Navigate to="/forbidden" replace={true} />
          )
        }
      />
      {/* Petitions routes */}
      <Route
        path="/petitions"
        element={
          userData?.role === "admin" ? (
            <PetitionContextProvider>
              <SideBar />
              <Petitions />
              <Toaster />
            </PetitionContextProvider>
          ) : (
            <Navigate to="/forbidden" replace={true} />
          )
        }
      />
      <Route
        path="/petitions/add-petition"
        element={
          userData?.role === "admin" ? (
            <>
              <SideBar />
              <AddPetition />
            </>
          ) : (
            <Navigate to="/forbidden" replace={true} />
          )
        }
      />
      <Route
        path="/petitions/edit-petition/:id"
        element={
          userData?.role === "admin" ? (
            <PetitionContextProvider>
              <SideBar />
              <EditPetition />
            </PetitionContextProvider>
          ) : (
            <Navigate to="/forbidden" replace={true} />
          )
        }
      />
      {/* News routes */}
      <Route
        path="/news"
        element={
          userData?.role === "admin" ? (
            <NewsContextProvider>
              <SideBar />
              <News />
              <Toaster />
            </NewsContextProvider>
          ) : (
            <Navigate to="/forbidden" replace={true} />
          )
        }
      />
      <Route
        path="/news/edit/:id"
        element={
          userData?.role === "admin" ? (
            <NewsContextProvider>
              <SideBar />
              <Edit />
            </NewsContextProvider>
          ) : (
            <Navigate to="/forbidden" replace={true} />
          )
        }
      />
      <Route
        path="/news/add-news"
        element={
          userData?.role === "admin" ? (
            <>
              <SideBar />
              <Add />
            </>
          ) : (
            <Navigate to="/forbidden" replace={true} />
          )
        }
      />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={!userData ? <AuthLogin /> : <Navigate to="/" replace={true} />} />
      <Route path="/forbidden" element={userData?.role === "user" ? <NotAdmin /> : <Navigate to="/login" replace={true} />} />
    </Routes>
  );
}

export default App;

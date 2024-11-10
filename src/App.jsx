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
import Settings from "./pages/admin/Settings";
import { NewsContextProvider } from "./context/NewsContext";
import Petitions from "./pages/Petitions/Petitions";
import AddPetition from "./pages/Petitions/AddPetition";
import PetitionContextProvider from "./context/PetitionContext";
import { Toaster } from "react-hot-toast";
import EditPetition from "./pages/Petitions/EditPetition";

function App() {
  const { userData } = useContext(AuthContext);

  const isAdminOrSuperAdmin = userData?.role === "admin" || userData?.role === "super admin";

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAdminOrSuperAdmin ? (
            <>
              <SideBar />
              <Dashboard />
            </>
          ) : (
            <Navigate to="/forbidden" replace />
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
              <Settings />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/user"
        element={
          isAdminOrSuperAdmin ? (
            <>
              <SideBar />
              <User />
            </>
          ) : (
            <Navigate to="/forbidden" replace />
          )
        }
      />

      {/* Petitions routes */}
      <Route
        path="/petitions"
        element={
          isAdminOrSuperAdmin ? (
            <PetitionContextProvider>
              <SideBar />
              <Petitions />
              <Toaster />
            </PetitionContextProvider>
          ) : (
            <Navigate to="/forbidden" replace />
          )
        }
      />
      <Route
        path="/petitions/add-petition"
        element={
          isAdminOrSuperAdmin ? (
            <>
              <SideBar />
              <AddPetition />
            </>
          ) : (
            <Navigate to="/forbidden" replace />
          )
        }
      />
      <Route
        path="/petitions/edit-petition/:id"
        element={
          isAdminOrSuperAdmin ? (
            <PetitionContextProvider>
              <SideBar />
              <EditPetition />
            </PetitionContextProvider>
          ) : (
            <Navigate to="/forbidden" replace />
          )
        }
      />

      {/* News routes */}
      <Route
        path="/news"
        element={
          isAdminOrSuperAdmin ? (
            <NewsContextProvider>
              <SideBar />
              <News />
              <Toaster />
            </NewsContextProvider>
          ) : (
            <Navigate to="/forbidden" replace />
          )
        }
      />
      <Route
        path="/news/edit/:id"
        element={
          isAdminOrSuperAdmin ? (
            <NewsContextProvider>
              <SideBar />
              <Edit />
            </NewsContextProvider>
          ) : (
            <Navigate to="/forbidden" replace />
          )
        }
      />
      <Route
        path="/news/add-news"
        element={
          isAdminOrSuperAdmin ? (
            <>
              <SideBar />
              <Add />
            </>
          ) : (
            <Navigate to="/forbidden" replace />
          )
        }
      />

      {/* Additional routes */}
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={!userData ? <AuthLogin /> : <Navigate to="/" replace />} />
      <Route path="/forbidden" element={userData ? <NotAdmin /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

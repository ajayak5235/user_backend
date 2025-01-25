import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css"; // Import the CSS file
import UserVisualization from "./components/UserVisualization";
import UserManagement from "./components/UserManagement";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

const AuthenticatedApp: React.FC = () => {
  const { user, logout } = useAuth();
  console.log("password123", user);
  return (
    <>
  
      <UserProvider>
        <div>
          <header>
            <h1>User Management System</h1>
            <div className="header-user-info">
              <span className="header-welcome-message">
                Welcome, {user?.username}
              </span>
              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </div>
          </header>
          <UserVisualization />
          <UserManagement />
        </div>
      </UserProvider>
    </>
  );
};

const MainApp: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/user" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/user" />} />
      <Route path="/user" element={user ? <AuthenticatedApp /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={user ? "/user" : "/login"} />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;

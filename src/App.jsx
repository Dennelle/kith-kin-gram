import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import userService from "./utils/userService";

// // ===== pages ======
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import FeedPage from "./pages/FeedPage/FeedPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

// ===== components ======
function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  function logout() {
    console.log("happening");
    userService.logout();
    setUser(null);
  }

  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<FeedPage loggedUser={user} handleLogout={logout} />}
      />
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/:username"
        element={<ProfilePage loggedUser={user} handleLogout={logout} />}
      />
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
// import "./App.css";

// import userService from "./utils/userService";

// // ===== pages ======
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";

// ===== components ======

export default function App() {
  return (
    <>
      <h1>Hello World</h1>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

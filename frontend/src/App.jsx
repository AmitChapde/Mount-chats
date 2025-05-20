import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import HomePage from "./Components/HomePage/HomePage";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import AuthenticatedLayout from "./utils/AuthenticatedLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Layout */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

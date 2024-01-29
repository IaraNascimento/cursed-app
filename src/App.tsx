import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app } from "./components/firebaseConfig";
import Login from "./User/Login/Login";
import ResetPassword from "./User/ResetPassword/ResetPassword";
import Files from "./Pages/Files/Files";

function App() {
  useEffect(() => {
    console.log("passei aqui");
    getAuth(app);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/files" element={<Files />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

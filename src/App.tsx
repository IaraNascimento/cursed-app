import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app } from "./firebaseConfig";
import Login from "./Pages/Login/Login";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Files from "./Pages/Files/Files";
import "./App.scss";
import Campaigns from "./Pages/Campaigns/Campaigns";
import { Toaster } from "react-hot-toast";
import AdminGuard from "./guards/AdminGuard/AdminGuard";
import LoggedGuard from "./guards/LoggedGuard/LoggedGuard";
import Users from "./Pages/Users/Users";

function App() {
  useEffect(() => {
    getAuth(app);
  }, []);

  return (
    <section className="container">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route element={<LoggedGuard />}>
            <Route path="/files" element={<Files />} />
          </Route>
          <Route element={<AdminGuard />}>
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;

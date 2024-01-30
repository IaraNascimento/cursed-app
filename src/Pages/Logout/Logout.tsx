import { useNavigate } from "react-router-dom";
import "./Logout.scss";
import { getAuth, signOut } from "@firebase/auth";

function Logout() {
  const navigate = useNavigate();
  const auth = getAuth();

  function logout() {
    signOut(auth);
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <button className="secondary logout" onClick={() => logout()}>
      Logout
    </button>
  );
}

export default Logout;

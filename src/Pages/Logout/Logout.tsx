import { useNavigate } from "react-router-dom";
import "./Logout.scss";

function Logout() {
  const navigate = useNavigate();

  function logout() {
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

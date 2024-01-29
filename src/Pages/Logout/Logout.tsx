import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/");
  }

  return <button onClick={() => logout()}>Logout</button>;
}

export default Logout;

import Logout from "../Logout/Logout";
import { useNavigate } from "react-router-dom";
import UsersList from "../../components/UsersList/UsersList";
import UserCreate from "../../components/UserCreate/UserCreate";
// import "./Campaigns.scss";

function Users() {
  const navigate = useNavigate();
  return (
    <>
      <button className="primary" onClick={() => navigate("/files")}>
        Arquivos
      </button>
      <button className="primary" onClick={() => navigate("/campaigns")}>
        Campanhas
      </button>
      <button className="primary" onClick={() => navigate("/users")}>
        Usuários
      </button>
      <Logout />
      <h2 className="title">Usuários</h2>
      <UserCreate />
      <UsersList />
    </>
  );
}

export default Users;

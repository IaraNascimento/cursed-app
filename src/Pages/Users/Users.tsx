import Logout from "../Logout/Logout";
import { useNavigate } from "react-router-dom";
import UsersList from "../../components/UsersList/UsersList";
import UserCreate from "../../components/UserCreate/UserCreate";
import Menu from "../../components/Menu/Menu";
// import "./Campaigns.scss";

function Users() {
  const navigate = useNavigate();
  return (
    <>
      <Menu />
      <h2 className="title">Usuários</h2>
      <UserCreate />
      <UsersList />
    </>
  );
}

export default Users;

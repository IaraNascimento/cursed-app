import { useEffect, useState } from "react";
import FileUpload from "../../components/FileUpload/FileUpload";
import FilesList from "../../components/FilesList/FilesList";
import { getDatabase, ref as refDb, onValue, set } from "firebase/database";
import Logout from "../Logout/Logout";
import "./Files.scss";
import { useNavigate } from "react-router-dom";

function Files() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const userEmail = JSON.parse(localStorage.getItem("user") as string).email;
  const userID = JSON.parse(localStorage.getItem("user") as string)
    .uid as string;
  const [users, setUsers] = useState<Array<string>>([userEmail]);
  const db = getDatabase();

  useEffect(() => {
    const query = refDb(db, "users/" + userID);
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        set(query, { role: "jogador" });
      } else if (data.role === "mestre") {
        setIsAdmin(true);
        const queryUsers = refDb(db, "users");
        onValue(queryUsers, (snapshot) => {
          const data = snapshot.val();
          const userArray: string[] = [];
          Object.keys(data).forEach((value) => {
            userArray.push(data[value].email);
          });
          setUsers(userArray);
        });
      }
    });
  }, []);

  return (
    <>
      <button className="primary" onClick={() => navigate("/files")}>
        Arquivos
      </button>
      {isAdmin && (
        <>
          <button className="primary" onClick={() => navigate("/campaigns")}>
            Campanhas
          </button>
          <button className="primary" onClick={() => navigate("/users")}>
            Usuários
          </button>
        </>
      )}
      <Logout />
      <h1 className="title">Arquivos</h1>
      <FileUpload userList={users} userID={userID} />
      {users.map((user) => (
        <div key={user}>
          <h2 className="subtitle users">{user}</h2>
          <FilesList email={user} userID={userID} />
        </div>
      ))}
    </>
  );
}

export default Files;

import { useEffect, useState } from "react";
import FileUpload from "../../components/FileUpload/FileUpload";
import FilesList from "../../components/FilesList/FilesList";
import { getStorage, listAll, ref } from "firebase/storage";
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
  const storage = getStorage();
  const db = getDatabase();

  useEffect(() => {
    const query = refDb(db, "users/" + userID);
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        set(query, { role: "user" });
      } else if (data.role === "admin") {
        setIsAdmin(true);
      }
    });
  }, []);

  useEffect(() => {
    if (isAdmin) {
      listAll(ref(storage, "/")).then((result: any) => {
        const userList = result.prefixes.map((user: any) => user.name);
        if (!userList.includes(userEmail)) {
          userList.push(userEmail);
        }
        setUsers(userList);
      });
    }
  }, [isAdmin]);

  return (
    <>
      {isAdmin && (
        <button className="primary" onClick={() => navigate("/campaigns")}>
          Campanhas
        </button>
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

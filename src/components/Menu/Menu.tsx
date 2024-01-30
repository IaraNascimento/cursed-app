import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref as refDb, onValue, set } from "firebase/database";

function Menu() {
  const navigate = useNavigate();
  const userID = JSON.parse(localStorage.getItem("user") as string)
    .uid as string;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
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
      }
    });
  }, []);

  return (
    <>
      {" "}
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
    </>
  );
}

export default Menu;

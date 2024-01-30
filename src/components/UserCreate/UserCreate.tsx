import { useEffect, useState } from "react";
import { getDatabase, ref as refDb, set } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
} from "@firebase/auth";

function UserCreate() {
  const db = getDatabase();
  const auth = getAuth();

  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserRole, setNewUserRole] = useState<string>("jogador");

  function handleSubmit(userName: string, userEmail: string, userRole: string) {
    userName = userName.trim();
    userEmail = userEmail.trim();

    let userID;
    const newUser = {
      name: userName,
      email: userEmail,
      role: userRole,
    };

    createUserWithEmailAndPassword(auth, userEmail, "123456").then(
      (snapshot) => {
        userID = snapshot.user.uid;
        sendPasswordResetEmail(auth, userEmail);
        const query = refDb(db, "users/" + userID);

        set(query, newUser);
      }
    );
  }

  return (
    <form className="fileUpload" onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="Nome"
        type="text"
        onChange={(e) => setNewUserName(e.target.value)}
      />
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setNewUserEmail(e.target.value)}
      />
      <select onChange={(e) => setNewUserRole(e.target.value)}>
        <option key="jogador" value="jogador">
          Jogador
        </option>
        <option key="mestre" value="mestre">
          Mestre
        </option>
      </select>
      <button
        className="primary"
        onClick={() => handleSubmit(newUserName, newUserEmail, newUserRole)}
      >
        Criar Usuário
      </button>
    </form>
  );
}

export default UserCreate;

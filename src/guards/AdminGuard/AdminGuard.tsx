import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getDatabase, ref as refDb, onValue, set } from "firebase/database";

const AdminGuard = () => {
  const [content, setContent] = useState<any>(null);
  const db = getDatabase();
  const user = JSON.parse(localStorage.getItem("user") as string);

  useEffect(() => {
    if (user) {
      const userID = user?.uid;
      const query = refDb(db, "users/" + userID);
      onValue(query, (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          set(query, { role: "user" });
          setContent(<Navigate to="/" />);
        } else if (data.role === "admin") {
          setContent(<Outlet />);
        } else {
          setContent(<Navigate to="/" />);
        }
      });
    } else {
      setContent(<Navigate to="/" />);
    }
  }, []);

  return <> {content ? content : "Carregando..."}</>;
};

export default AdminGuard;

import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const LoggedGuard = () => {
  const [content, setContent] = useState<any>(null);
  const user = JSON.parse(localStorage.getItem("user") as string);

  useEffect(() => {
    if (user) {
      setContent(<Outlet />);
    } else {
      setContent(<Navigate to="/" />);
    }
  }, []);

  return <> {content ? content : "Carregando..."}</>;
};

export default LoggedGuard;

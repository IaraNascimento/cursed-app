import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.scss";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/files");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  return (
    <section className="login">
      <form onSubmit={(event) => event.preventDefault()}>
        <h1>Cursed Nights</h1>
        <h2>Gerenciador de Fichas</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="pass"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary" onClick={() => login(email, password)}>
          Entrar
        </button>

        <Link to="/resetpassword">Esqueci minha senha</Link>
      </form>
    </section>
  );
}

export default Login;

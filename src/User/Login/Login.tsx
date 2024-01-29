import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(email: string, password: string) {
    const auth = getAuth();
    console.log("email", email);
    console.log("password", password);
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
    <form onSubmit={(event) => event.preventDefault()}>
      <h2>Cursed</h2>

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

      <button onClick={() => login(email, password)}>Login</button>

      <Link to="/resetpassword">Reset Password</Link>
    </form>
  );
}

export default Login;

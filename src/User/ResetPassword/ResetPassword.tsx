import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function ResetPassword() {
  const [email, setEmail] = useState("");

  function resetPassword(email: string) {
    const auth = getAuth();
    console.log("email", email);
    signInWithEmailAndPassword(auth, email, "")
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
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

      <button onClick={() => resetPassword(email)}>ResetPassword</button>

      <Link to="/resetpassword">Reset Password</Link>
    </form>
  );
}

export default ResetPassword;

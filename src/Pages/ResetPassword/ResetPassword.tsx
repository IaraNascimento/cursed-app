import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-hot-toast";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [wasSent, setWasSent] = useState(false);
  const auth = getAuth();

  function resetPassword(email: string) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast("Verifique seu email!");
        setWasSent(true);
      })
      .catch((error) => {
        toast("Houve um erro");
        console.log("error", error);
      });
  }

  return (
    <section className="login">
      <form onSubmit={(event) => event.preventDefault()}>
        <h1>Cursed Nights</h1>
        <h2>Gerenciador de Fichas</h2>

        {!wasSent && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="primary" onClick={() => resetPassword(email)}>
              Trocar Senha
            </button>
          </>
        )}
        <Link to="/">Voltar ao login</Link>
      </form>
    </section>
  );
}

export default ResetPassword;

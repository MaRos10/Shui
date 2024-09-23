import "./writeMsg.css";
import { useNavigate } from "react-router-dom";

export default function WriteMsg() {
  const navigate = useNavigate();

  return (
    <section className="writeMsgWrapper">
      <article className="writeMsg">
        <input
          type="text"
          id="writeMsg"
          className="writeMsgInput"
          placeholder="Skriv ditt meddelande"
        />
      </article>
      <article className="userName">
        <input
          type="text"
          id="userName"
          className="userNameInput"
          placeholder="Ange användarnamn"
        />
      </article>
      <button className="postMessage">Publicera</button>
    </section>
  );
}

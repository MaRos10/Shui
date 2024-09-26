import "../WriteMsg/WriteMsg.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateMsg() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  // Hämta det befintliga meddelandet baserat på id
  useEffect(() => {
    fetch(
      `https://aaj6tqrveh.execute-api.eu-north-1.amazonaws.com/message/${id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Hämta användarnamn och text och fyll i
        setUsername(data.data.username);
        setText(data.data.text);
      });
  }, [id]);

  // Uppdatera meddelandet med det nya innehållet
  const handleUpdate = () => {
    fetch(
      `https://aaj6tqrveh.execute-api.eu-north-1.amazonaws.com/message/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    )
      .then((response) => response.json())
      // Skicka tillbaka användaren till startsidan när uppdateringen är klar
      .then(() => {
        navigate("/");
      });
  };

  return (
    <section className="msgFormWrapper">
      <div className="backButtonContainer">
        <button className="backButton" onClick={() => navigate("/")}>
          ←
        </button>
      </div>
      <article className="msgForm">
        <textarea
          type="text"
          id="msgForm"
          className="msgFormInput"
          placeholder="Ändra ditt meddelande"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </article>
      <article className="userName">
        <input
          type="text"
          id="userName"
          className="userNameInput"
          value={username || "Inga användarnamn tillgängliga"}
          readOnly
        />
      </article>
      <button className="postMessage" onClick={handleUpdate}>
        Publicera
      </button>
    </section>
  );
}

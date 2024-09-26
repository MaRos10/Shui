import "./writeMsg.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WriteMsg() {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username || !text) {
      alert("Användarnamn och text är obligatoriskt!");
      return;
    }

    const newMessage = { username, text };

    // Skapa nytt meddelande
    try {
      const response = await fetch(
        "https://aaj6tqrveh.execute-api.eu-north-1.amazonaws.com/message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(
          errorData.message || "Något gick fel vid publiceringen av meddelandet"
        );
      }
    } catch (error) {
      alert("Fel vid publicering, försök igen");
    }
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
          placeholder="Skriv ditt meddelande"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </article>
      <article className="userName">
        <input
          type="text"
          id="userName"
          className="userNameInput"
          placeholder="Ange användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </article>
      <button className="postMessage" onClick={handleSubmit}>
        Publicera
      </button>
    </section>
  );
}

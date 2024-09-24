import "./writeMsg.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WriteMsg() {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Validera att användarnamn och text finns
    if (!username || !text) {
      alert("Användarnamn och text är obligatoriskt!");
      return;
    }

    // Skapa meddelande-objekt
    const newMessage = { username, text };

    try {
      // Skicka POST-begäran till API:t
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
        // Om API-svaret är OK, navigera till start-url
        navigate("/");
      } else {
        alert("Något gick fel vid publiceringen av meddelandet");
      }
    } catch (error) {
      console.error("Fel vid publicering:", error);
    }
  };

  return (
    <section className="writeMsgWrapper">
      <div className="backButtonContainer">
        <button className="backButton" onClick={() => navigate("/")}>
          ←
        </button>
      </div>
      <article className="writeMsg">
        <textarea
          type="text"
          id="writeMsg"
          className="writeMsgInput"
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

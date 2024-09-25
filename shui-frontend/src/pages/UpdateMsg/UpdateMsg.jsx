import "../WriteMsg/WriteMsg.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateMsg() {
  const navigate = useNavigate();
  const { id } = useParams(); // För att hämta id från URL:en
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    // Hämta det befintliga meddelandet baserat på id
    fetch(
      `https://aaj6tqrveh.execute-api.eu-north-1.amazonaws.com/message/${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Hämta användarnamn och text från data.data
        setUsername(data.data.username); // Fyll i användarnamnet
        setText(data.data.text); // Fyll i den nuvarande texten
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
      });
  }, [id]);

  const handleUpdate = () => {
    // Skicka PUT-förfrågan till backend
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
      .then(() => {
        // Skicka tillbaka användaren till startsidan när uppdateringen är klar
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating message:", error);
      });
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

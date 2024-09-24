import "./msgCard.css";
import penLogo from "../../assets/pen.svg";
import deleteLogo from "../../assets/trash-bin.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MsgCard() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  // Funktion för att hämta meddelanden från API
  useEffect(() => {
    // Hämta data från API:t
    fetch("https://aaj6tqrveh.execute-api.eu-north-1.amazonaws.com/messages")
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.data); // Spara message-data i state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Funktion för att ta bort meddelande från API
  const deleteMessage = (id) => {
    if (window.confirm("Är du säker på att du vill ta bort meddelandet?")) {
      fetch(
        `https://aaj6tqrveh.execute-api.eu-north-1.amazonaws.com/message/${id}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (response.ok) {
            setMessages((prevMessages) =>
              prevMessages.filter((message) => message.id !== id)
            );
          } else {
            console.error("Failed to delete message:", response.status);
          }
        })
        .catch((error) => {
          console.error("Error deleting message:", error);
        });
    }
  };

  return (
    <div className="msgContainer">
      {messages.map((message) => (
        <section className="msgCardWrapper" key={message.id}>
          <div className="iconsWrapper">
            <button
              className="editButton"
              onClick={() => navigate(`/updatemsg/${message.id}`)}
            >
              <img src={penLogo} alt="Edit" className="icon" />
            </button>
            <button
              className="deleteButton"
              onClick={() => deleteMessage(message.id)}
            >
              <img src={deleteLogo} alt="Delete" className="icon" />
            </button>
          </div>
          <div className="date">{message.createdAt}</div>
          <article className="msgBody">{message.text}</article>
          <article className="author">{message.username}</article>
        </section>
      ))}
    </div>
  );
}

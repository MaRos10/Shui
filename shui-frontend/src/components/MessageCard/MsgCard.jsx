import "./msgCard.css";
import penLogo from "../../assets/pen.svg";
import deleteLogo from "../../assets/trash-bin.svg";
import { useEffect, useState } from "react";

export default function MsgCard() {
  const [messages, setMessages] = useState([]);

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

  return (
    <div className="msgContainer">
      {messages.map((message) => (
        <section className="msgCardWrapper" key={message.id}>
          <div className="iconsWrapper">
            <button className="editButton">
              <img src={penLogo} alt="Edit" className="icon" />
            </button>
            <button className="deleteButton">
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

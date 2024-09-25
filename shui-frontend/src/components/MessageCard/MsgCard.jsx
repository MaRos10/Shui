import "./msgCard.css";
import penLogo from "../../assets/pen.svg";
import deleteLogo from "../../assets/trash-bin.svg";
import { useNavigate } from "react-router-dom";

export default function MsgCard({ messages, onDelete }) {
  const navigate = useNavigate();

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
              onClick={() => onDelete(message.id)}
            >
              <img src={deleteLogo} alt="Delete" className="icon" />
            </button>
          </div>
          <div className="date">
            {new Date(message.createdAt).toLocaleString()}
          </div>
          <article className="msgBody">{message.text}</article>
          <article className="author">{message.username}</article>
        </section>
      ))}
    </div>
  );
}

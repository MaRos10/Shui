import "./updateMsg.css";
import { useNavigate } from "react-router-dom";

export default function UpdateMsg() {
  const navigate = useNavigate();

  return (
    <section className="updateMsgWrapper">
      <h1>Update Message</h1>
    </section>
  );
}

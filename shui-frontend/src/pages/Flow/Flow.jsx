import MsgCard from "../../components/MessageCard/MsgCard";
import "./Flow.css";
import { useNavigate } from "react-router-dom";

export default function Flow() {
  const navigate = useNavigate();

  return (
    <section>
      <h4>
        Lägg in sökfunktion + filtrering datum och skapa <br />
        medd längst ner
      </h4>
      <MsgCard />
    </section>
  );
}

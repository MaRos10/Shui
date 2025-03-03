import MsgCard from "../../components/MessageCard/MsgCard";
import "./Flow.css";
import { useNavigate } from "react-router-dom";
import create from "../../assets/create.svg";
import { useState, useEffect } from "react";

export default function Flow() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByDate, setFilterByDate] = useState(false);
  const [messages, setMessages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 4;

  // Hämta alla meddelanden
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "https://aaj6tqrveh.execute-api.eu-north-1.amazonaws.com/messages"
      );
      const data = await response.json();
      setMessages(data.data || []);
    } catch (error) {
      setMessages([]);
    }
  };

  // Hämta meddelanden baserat på användarnamn
  const fetchMessagesByUsername = async (username) => {
    try {
      const response = await fetch(
        `https://aaj6tqrveh.execute-api.eu-north-1.amazonaws.com/messages/${username}`
      );
      const data = await response.json();
      setMessages(data.data || []);
    } catch (error) {
      setMessages([]);
    }
  };

  // Hämta meddelanden baserat på sökterm eller alla meddelanden om sökterm ej finns
  useEffect(() => {
    if (searchTerm) {
      fetchMessagesByUsername(searchTerm);
    } else {
      fetchMessages();
    }
  }, [searchTerm]); // Uppdatera vid ändring av sökterm

  // Ta bort meddelande
  const deleteMessage = (id) => {
    if (window.confirm("Är du säker på att du vill ta bort meddelandet?")) {
      fetch(
        `https://aaj6tqrveh.execute-api.eu-north-1.amazonaws.com/message/${id}`,
        {
          method: "DELETE",
        }
      ).then((response) => {
        if (response.ok) {
          setMessages((prevMessages) =>
            prevMessages.filter((message) => message.id !== id)
          );
        }
      });
    }
  };

  // Uppdatera sökterm och växla datumfilter
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = () => {
    setFilterByDate(!filterByDate);
  };

  // Pagination
  const totalPages = Math.ceil(messages.length / messagesPerPage);
  const currentMessages = messages
    .sort((a, b) =>
      filterByDate
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice((currentPage - 1) * messagesPerPage, currentPage * messagesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <section className="flowWrapper">
      <section className="searchWrapper">
        <input
          type="text"
          placeholder="Sök användarnamn"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleFilterChange} className="filterButton">
          {filterByDate ? "Nyast först" : "Äldst först"}
        </button>
      </section>
      <article className="messagesContainer">
        {currentMessages.length === 0 ? (
          <section className="noMessages">
            <p>
              Inga meddelanden <br />
              att visa
            </p>
          </section>
        ) : (
          <MsgCard messages={currentMessages} onDelete={deleteMessage} />
        )}
      </article>
      <nav className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Föregående
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Nästa
        </button>
      </nav>
      <div className="createBtnWrapper">
        <button className="createButton" onClick={() => navigate(`/writemsg/`)}>
          <img src={create} alt="Create" className="createIcon" />
        </button>
      </div>
    </section>
  );
}

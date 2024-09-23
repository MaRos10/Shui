import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Flow from "./pages/Flow/Flow";
import WriteMsg from "./pages/WriteMsg/WriteMsg";
import UpdateMsg from "./pages/UpdateMsg/UpdateMsg";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Flow />} />
          <Route path="/writemsg" element={<WriteMsg />} />
          <Route path="/updatemsg" element={<UpdateMsg />} />
        </Routes>
      </Router>
    </div>
  );
}

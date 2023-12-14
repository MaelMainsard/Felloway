import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatMenu from "./pages/chat-menu";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatMenu />} />
      </Routes>
   </Router>
);
}

export default App;

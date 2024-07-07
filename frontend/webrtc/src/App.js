import { Routes, Route } from "react-router-dom";
import { Lobby } from "./pages/Lobby.jsx";
import { Navbar } from "./components/Navbar.jsx";

function App() {
  return (
    <main className="font-sans bg-zinc-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<Lobby />} />
      </Routes>
    </main>
  );
}

export default App;

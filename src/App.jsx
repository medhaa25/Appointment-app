import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Register from "./components/register/register";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

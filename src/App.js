import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home.js"
import Dashboard from "./pages/dashboard.js"

export default function App() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    );
  }
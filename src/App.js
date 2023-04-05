import { Routes, Route} from "react-router-dom";
import Dashboard from "./pages/dashboard.js"

export default function App() {
    return (
      <div className="App">
        <Routes>
          <Route path="/{novel-graph-app}" element={<Dashboard />} />
        </Routes>
      </div>
    );
  }
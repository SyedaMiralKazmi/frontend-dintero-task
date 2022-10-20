import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { OrganizationDetails } from "./Pages/OrganizationDetails";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:organizationNumber" element={<OrganizationDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

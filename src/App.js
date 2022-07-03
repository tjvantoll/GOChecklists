import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dex from "./components/Dex";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dex" element={<Dex />} />
          <Route exact path="/shiny" element={<Dex />} />
          <Route exact path="/lucky" element={<Dex />} />
          <Route exact path="/unown" element={<Dex />} />
          <Route exact path="/shadow" element={<Dex />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

function NotFound() {
  return <h1>404!</h1>;
}

export default App;

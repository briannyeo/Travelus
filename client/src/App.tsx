import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ItineraryRequest from "./pages/ItineraryRequest";
import ItineraryLibrary from "./pages/ItineraryLibrary";
import Community from "./pages/Community";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="request" element={<ItineraryRequest />} />
            <Route path="library" element={<ItineraryLibrary />} />
            <Route path="community" element={<Community />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

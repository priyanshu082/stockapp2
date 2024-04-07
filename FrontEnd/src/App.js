// App.js
import React from "react";
// import Navbar from "./Components/Navbar/Navbar";
// import Footer from "./Components/Footer/Footer";
import AllRoute from "./AllRoute";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <AllRoute />
      </Router>
    </>
  );
}

export default App;

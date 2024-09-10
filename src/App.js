import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import RecruiterPage from "./pages/RecruiterPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Container sx={{ py: 4 }}>
          {" "}
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/recruiter" element={<RecruiterPage />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;

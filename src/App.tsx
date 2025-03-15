import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./signup-page.tsx";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="/" element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
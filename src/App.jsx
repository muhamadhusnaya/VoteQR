import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import VotingPage from './pages/VotingPage';
import Teams from './pages/admin/Teams';
import Tokens from './pages/admin/Tokens';
import VotingHistory from './pages/admin/VotingHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/voting" element={<VotingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/" element={<Dashboard />} />
        <Route path="/admin/teams" element={<Teams />} />
        <Route path="/admin/tokens" element={<Tokens />} />
        <Route path="/admin/voting-history" element={<VotingHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

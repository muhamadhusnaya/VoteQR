import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import VotingPage from './pages/VotingPage';
import Teams from './pages/admin/Teams';
import Tokens from './pages/admin/Tokens';
import VotingHistory from './pages/admin/VotingHistory';
import ValidasiVoting from './pages/ValidasiVoting';
import VotingSuccess from './pages/VotingSuccess';
import VotingFailed from './pages/VotingFailed';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/voting" element={<VotingPage />} />
        <Route path="/voting-validasi/:teamId" element={<ValidasiVoting />} />
        <Route path="/voting-success" element={<VotingSuccess />} />
        <Route path="/voting-failed" element={<VotingFailed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/admin/teams" element={
          <PrivateRoute><Teams /></PrivateRoute>
        } />
        <Route path="/admin/tokens" element={
          <PrivateRoute><Tokens /></PrivateRoute>
        } />
        <Route path="/admin/voting-history" element={
          <PrivateRoute><VotingHistory /></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

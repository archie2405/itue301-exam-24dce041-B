import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import BookingPage from './pages/BookingPage';

/**
 * Task 2 — React Router Configuration
 * Configures routes:
 * /          -> HomePage
 * /doctors   -> DoctorsPage
 * /booking   -> BookingPage
 */
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© 2026 MedCare Hospital Appointment System</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

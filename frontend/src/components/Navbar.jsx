import React from 'react';
import { NavLink, Link } from 'react-router-dom';

/**
 * Task 2 — Navigation Component
 * Provides simple client-side routing links to /, /doctors, and /booking.
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        MedCare Hospital System
      </Link>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctors" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Doctors
          </NavLink>
        </li>
        <li>
          <NavLink to="/booking" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Book Appointment
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

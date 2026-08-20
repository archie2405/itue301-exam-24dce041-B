import React, { useState, useEffect } from 'react';
import AppointmentCard from '../components/AppointmentCard';

/**
 * Task 1 — HomePage Component
 * Displays system overview and renders appointment list using AppointmentCard components with props.
 */
const HomePage = () => {
  const [appointments, setAppointments] = useState([
    {
      _id: '1',
      patientName: 'Aarav Patel',
      doctorName: 'Dr. Rajesh Sharma',
      date: '2026-08-25',
      timeSlot: '10:00 AM',
      status: 'confirmed',
    },
    {
      _id: '2',
      patientName: 'Riya Shah',
      doctorName: 'Dr. Priya Patel',
      date: '2026-08-26',
      timeSlot: '02:30 PM',
      status: 'pending',
    },
    {
      _id: '3',
      patientName: 'Karan Verma',
      doctorName: 'Dr. Ankit Mehta',
      date: '2026-08-24',
      timeSlot: '11:15 AM',
      status: 'cancelled',
    },
  ]);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/appointments')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAppointments(data);
        }
      })
      .catch((err) => console.log('Using initial appointments fallback'));
  }, []);

  return (
    <div className="home-page">
      <div className="page-header">
        <h1 className="page-title dashboard-title">Hospital Appointment Dashboard</h1>
        <p className="page-subtitle dashboard-subtitle">MedCare Hospital System — Patient appointments overview</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '12px', color: '#212529' }}>
          Scheduled Appointments
        </h2>
        <div className="cards-grid">
          {appointments.map((appt) => (
            <AppointmentCard
              key={appt._id}
              patientName={appt.patientName}
              doctorName={appt.doctorName}
              date={appt.date}
              timeSlot={appt.timeSlot}
              status={appt.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

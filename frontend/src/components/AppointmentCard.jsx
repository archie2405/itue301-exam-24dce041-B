import React from 'react';

/**
 * Task 1 — AppointmentCard Component
 * Props: patientName, doctorName, date, timeSlot, status
 * Displays all 5 values with simple status badge styling.
 */
const AppointmentCard = ({ patientName, doctorName, date, timeSlot, status }) => {
  const getStatusClass = (statusValue) => {
    switch (statusValue?.toLowerCase()) {
      case 'confirmed':
        return 'status-badge status-confirmed';
      case 'cancelled':
        return 'status-badge status-cancelled';
      case 'pending':
      default:
        return 'status-badge status-pending';
    }
  };

  return (
    <div className="appointment-card">
      <div className="appointment-card-header">
        <div className="patient-info">
          <h3>{patientName || 'Unknown Patient'}</h3>
          <p className="doctor-name">Doctor: {doctorName || 'Assigned Doctor'}</p>
        </div>
        <span className={getStatusClass(status)}>
          {status || 'pending'}
        </span>
      </div>

      <div className="details-row">
        <div>
          <strong>Date:</strong> {date || 'N/A'}
        </div>
        <div>
          <strong>Time Slot:</strong> {timeSlot || 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;

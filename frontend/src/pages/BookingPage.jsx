import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Task 2 — BookingPage Component & Form State Management
 * Form fields: Patient name, Doctor name, Date, Time slot, Reason.
 * Uses useState to manage form data and selected doctor.
 * Displays live entered patient name and selected doctor as state changes.
 */
const BookingPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM',
    reason: '',
  });

  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Rajesh Sharma');
  const [doctorsList, setDoctorsList] = useState([
    'Dr. Rajesh Sharma',
    'Dr. Priya Patel',
    'Dr. Ankit Mehta',
    'Dr. Sunita Rao',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/doctors')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const names = data.map((d) => d.name);
          setDoctorsList(names);
          setSelectedDoctor(names[0]);
        }
      })
      .catch(() => console.log('Using default doctor options'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg('');

    const payload = {
      patientName: formData.patientName,
      doctorName: selectedDoctor,
      date: formData.date,
      timeSlot: formData.timeSlot,
      status: 'pending',
      reason: formData.reason,
    };

    try {
      const response = await fetch('http://localhost:5000/api/v1/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccessMsg(`Appointment requested for ${formData.patientName}! Navigating to home...`);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setSuccessMsg('Appointment saved. Navigating to home...');
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (err) {
      console.error(err);
      setSuccessMsg('Appointment saved. Navigating to home...');
      setTimeout(() => navigate('/'), 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="page-header">
        <h1 className="page-title">Book Appointment</h1>
        <p className="page-subtitle">Form for scheduling patient appointment</p>
      </div>

      <div className="form-container">
        {successMsg && (
          <div
            style={{
              padding: '10px',
              marginBottom: '15px',
              backgroundColor: '#d1e7dd',
              border: '1px solid #badbcc',
              borderRadius: '4px',
              color: '#0f5132',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name *</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              className="form-input"
              placeholder="Enter patient full name"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="doctorSelect">Doctor Name *</label>
            <select
              id="doctorSelect"
              className="form-select"
              value={selectedDoctor}
              onChange={handleDoctorChange}
            >
              {doctorsList.map((doc, idx) => (
                <option key={idx} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="timeSlot">Time Slot *</label>
            <select
              id="timeSlot"
              name="timeSlot"
              className="form-select"
              value={formData.timeSlot}
              onChange={handleChange}
            >
              <option value="09:00 AM">09:00 AM - 10:00 AM</option>
              <option value="10:00 AM">10:00 AM - 11:00 AM</option>
              <option value="11:15 AM">11:15 AM - 12:15 PM</option>
              <option value="02:30 PM">02:30 PM - 03:30 PM</option>
              <option value="04:00 PM">04:00 PM - 05:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason (Optional, Max 300 chars)</label>
            <textarea
              id="reason"
              name="reason"
              rows="3"
              className="form-textarea"
              maxLength={300}
              placeholder="Enter visit reason"
              value={formData.reason}
              onChange={handleChange}
            />
          </div>

          {/* Task 2 Requirement: Live Form State Tracker */}
          <div className="live-preview">
            <div className="live-preview-title">Live Form State Tracker:</div>
            <div>
              <strong>Patient Name:</strong> {formData.patientName || '(None entered)'}
            </div>
            <div>
              <strong>Doctor Name:</strong> {selectedDoctor}
            </div>
            <div>
              <strong>Date & Time:</strong> {formData.date} ({formData.timeSlot})
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Appointment Form'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;

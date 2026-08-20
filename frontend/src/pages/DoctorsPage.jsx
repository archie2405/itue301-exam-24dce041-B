import React, { useState, useEffect } from 'react';

/**
 * Task 4 — REST API Consumption in React (DoctorsPage)
 * Retrieves doctor information from GET /api/v1/doctors using useEffect().
 * Maintains three states: data, loading, error.
 * Displays loading, error, and doctor cards with Name, Specialisation, Availability.
 */
const DoctorsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/v1/doctors');
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const doctorsData = await response.json();
        setData(doctorsData);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError(err.message || 'Failed to fetch doctor records from server.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="doctors-page">
      <div className="page-header">
        <h1 className="page-title">Doctor List</h1>
        <p className="page-subtitle">Hospital medical staff and availability</p>
      </div>

      {loading && (
        <div className="loading-box">
          <p>Loading doctors data...</p>
        </div>
      )}

      {error && !loading && (
        <div className="error-box">
          <p style={{ fontWeight: 'bold', marginBottom: '6px' }}>Error loading data:</p>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="cards-grid">
          {data.length === 0 ? (
            <p>No doctors found.</p>
          ) : (
            data.map((doctor) => (
              <div className="doctor-card" key={doctor._id || doctor.name}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>{doctor.name}</h3>
                <p style={{ color: '#0d6efd', fontSize: '14px', fontWeight: '600' }}>
                  Specialisation: {doctor.specialisation}
                </p>
                <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#6c757d' }}>Availability:</span>
                  <span className={`avail-badge ${doctor.available ? 'avail-online' : 'avail-offline'}`}>
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;

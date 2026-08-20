require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Core Middleware
app.use(cors());
app.use(express.json());

// Task 3: Custom Request Logger Middleware applied globally
app.use(requestLogger);

// REST API Endpoints
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/appointments', appointmentRoutes);

// Base route indicator
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'MedCare Plus Hospital Appointment System API',
    version: 'v1',
    status: 'Running',
    endpoints: [
      'GET /api/v1/doctors',
      'GET /api/v1/appointments',
      'POST /api/v1/appointments',
    ],
  });
});

// Task 3: Global Error-Handling Middleware applied as the last middleware
app.use(errorHandler);

// Start Server and Connect DB
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(` MedCare Plus Backend API Server Running on Port ${PORT}`);
    console.log(` URL: http://localhost:${PORT}`);
    console.log(` Test GET Doctors: http://localhost:${PORT}/api/v1/doctors`);
    console.log(` Test GET Appointments: http://localhost:${PORT}/api/v1/appointments`);
    console.log(`=======================================================`);
  });
};

startServer();

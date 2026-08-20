const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { getDBStatus } = require('../config/db');

// In-memory array fallback for Task 3 requirement
let defaultAppointments = [
  {
    _id: '66bc20000000000000000001',
    patientName: 'Aarav Patel',
    doctorName: 'Dr. Rajesh Sharma',
    patientId: '66bc30000000000000000001',
    doctorId: '66bc10000000000000000001',
    date: '2026-08-25',
    timeSlot: '10:00 AM',
    status: 'confirmed',
    reason: 'Regular Heart Checkup',
  },
  {
    _id: '66bc20000000000000000002',
    patientName: 'Riya Shah',
    doctorName: 'Dr. Priya Patel',
    patientId: '66bc30000000000000000002',
    doctorId: '66bc10000000000000000002',
    date: '2026-08-26',
    timeSlot: '02:30 PM',
    status: 'pending',
    reason: 'Routine Pediatric Checkup',
  },
  {
    _id: '66bc20000000000000000003',
    patientName: 'Karan Verma',
    doctorName: 'Dr. Ankit Mehta',
    patientId: '66bc30000000000000000003',
    doctorId: '66bc10000000000000000003',
    date: '2026-08-24',
    timeSlot: '11:15 AM',
    status: 'cancelled',
    reason: 'Knee Pain Consultation',
  },
];

/**
 * GET /api/v1/appointments
 * Return all appointments (Task 3 requirement)
 */
router.get('/', async (req, res, next) => {
  try {
    if (getDBStatus()) {
      let appointments = await Appointment.find()
        .populate('patientId', 'name email phone bloodGroup age')
        .populate('doctorId', 'name email specialisation available');
      
      // Map MongoDB populates to flat fields for frontend compatibility if needed
      const formatted = appointments.map((app) => ({
        _id: app._id,
        patientId: app.patientId?._id || app.patientId,
        doctorId: app.doctorId?._id || app.doctorId,
        patientName: app.patientId?.name || 'Patient',
        doctorName: app.doctorId?.name || 'Doctor',
        date: app.date,
        timeSlot: app.timeSlot,
        status: app.status,
        reason: app.reason,
      }));

      return res.status(200).json(formatted);
    } else {
      return res.status(200).json(defaultAppointments);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/appointments
 * Create a new appointment (Task 3 & Task 5 requirement)
 */
router.post('/', async (req, res, next) => {
  try {
    const { patientName, doctorName, patientId, doctorId, date, timeSlot, status, reason } = req.body;

    if (!patientName && !patientId) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error: Patient name or Patient ID is required',
      });
    }

    if (getDBStatus()) {
      let targetPatientId = patientId;
      let targetDoctorId = doctorId;

      // Find or create patient if patientName passed
      if (!targetPatientId && patientName) {
        let patient = await Patient.findOne({ name: patientName });
        if (!patient) {
          patient = await Patient.create({
            name: patientName,
            email: `${patientName.toLowerCase().replace(/\s+/g, '')}@example.com`,
            bloodGroup: 'B+',
            age: 28,
          });
        }
        targetPatientId = patient._id;
      }

      // Find doctor if doctorName passed
      if (!targetDoctorId && doctorName) {
        let doctor = await Doctor.findOne({ name: doctorName });
        if (!doctor) {
          doctor = await Doctor.create({
            name: doctorName,
            specialisation: 'General Physician',
          });
        }
        targetDoctorId = doctor._id;
      }

      const newAppt = new Appointment({
        patientId: targetPatientId,
        doctorId: targetDoctorId,
        date: date || new Date().toISOString().split('T')[0],
        timeSlot: timeSlot || '10:00 AM',
        status: status || 'pending',
        reason: reason || '',
      });

      const savedAppt = await newAppt.save();

      return res.status(201).json({
        _id: savedAppt._id,
        patientName: patientName || 'Patient',
        doctorName: doctorName || 'Doctor',
        patientId: savedAppt.patientId,
        doctorId: savedAppt.doctorId,
        date: savedAppt.date,
        timeSlot: savedAppt.timeSlot,
        status: savedAppt.status,
        reason: savedAppt.reason,
      });
    } else {
      const newAppt = {
        _id: '66bc200000000000000000' + (defaultAppointments.length + 1).toString().padStart(2, '0'),
        patientName: patientName || 'Patient',
        doctorName: doctorName || 'Doctor',
        date: date || '2026-08-28',
        timeSlot: timeSlot || '11:00 AM',
        status: status || 'pending',
        reason: reason || '',
      };
      defaultAppointments.push(newAppt);
      return res.status(201).json(newAppt);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/appointments/validate-test
 * Task 5 explicit validation test endpoint to demonstrate Mongoose schema validation failures
 */
router.post('/validate-test', async (req, res, next) => {
  try {
    const { type } = req.query; // type can be: 'missing_field', 'invalid_blood', 'invalid_status', 'reason_too_long'

    if (type === 'missing_field') {
      const doc = new Doctor({});
      await doc.validate();
    } else if (type === 'invalid_blood') {
      const patient = new Patient({
        name: 'Invalid Blood Test',
        email: 'test@invalidblood.com',
        bloodGroup: 'Z+', // Invalid blood group
      });
      await patient.validate();
    } else if (type === 'invalid_status') {
      const appt = new Appointment({
        patientId: '66bc30000000000000000001',
        doctorId: '66bc10000000000000000001',
        date: '2026-08-30',
        timeSlot: '09:00 AM',
        status: 'completed', // Invalid status enum (must be pending, confirmed, cancelled)
      });
      await appt.validate();
    } else if (type === 'reason_too_long') {
      const longReason = 'A'.repeat(305); // Exceeds 300 characters
      const appt = new Appointment({
        patientId: '66bc30000000000000000001',
        doctorId: '66bc10000000000000000001',
        date: '2026-08-30',
        timeSlot: '09:00 AM',
        reason: longReason,
      });
      await appt.validate();
    }

    res.status(200).json({ message: 'Validation passed successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

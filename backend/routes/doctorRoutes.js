const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const { getDBStatus } = require('../config/db');

// In-memory initial doctor list as specified in Task 3
const defaultDoctors = [
  {
    _id: '66bc10000000000000000001',
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@medcare.com',
    specialisation: 'Cardiology',
    available: true,
  },
  {
    _id: '66bc10000000000000000002',
    name: 'Dr. Priya Patel',
    email: 'priya.patel@medcare.com',
    specialisation: 'Pediatrics',
    available: true,
  },
  {
    _id: '66bc10000000000000000003',
    name: 'Dr. Ankit Mehta',
    email: 'ankit.mehta@medcare.com',
    specialisation: 'Orthopedics',
    available: false,
  },
  {
    _id: '66bc10000000000000000004',
    name: 'Dr. Sunita Rao',
    email: 'sunita.rao@medcare.com',
    specialisation: 'Neurology',
    available: true,
  },
];

/**
 * GET /api/v1/doctors
 * Return all doctors (Task 3 & Task 4 requirement)
 */
router.get('/', async (req, res, next) => {
  try {
    if (getDBStatus()) {
      let doctors = await Doctor.find();
      if (doctors.length === 0) {
        // Seed default doctors to DB if empty
        doctors = await Doctor.insertMany(defaultDoctors);
      }
      return res.status(200).json(doctors);
    } else {
      return res.status(200).json(defaultDoctors);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/doctors
 * Create a new doctor
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, email, specialisation, available } = req.body;
    if (getDBStatus()) {
      const doctor = new Doctor({ name, email, specialisation, available });
      const savedDoctor = await doctor.save();
      return res.status(201).json(savedDoctor);
    } else {
      const newDoc = {
        _id: '66bc100000000000000000' + (defaultDoctors.length + 1).toString().padStart(2, '0'),
        name,
        email,
        specialisation,
        available: available !== undefined ? available : true,
      };
      defaultDoctors.push(newDoc);
      return res.status(201).json(newDoc);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

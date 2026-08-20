require('dotenv').config();
const mongoose = require('mongoose');
const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

const seedData = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hospital_db';
    console.log(`Connecting to local MongoDB: ${mongoURI}...`);
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB!');

    // Clear existing collections
    await Patient.deleteMany({});
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});
    console.log('Cleared existing database collections.');

    // 1. Create Patients
    const patients = await Patient.create([
      {
        name: 'Aarav Patel',
        email: 'aarav.patel@example.com',
        phone: '+91 98765 43210',
        bloodGroup: 'B+',
        age: 29,
      },
      {
        name: 'Riya Shah',
        email: 'riya.shah@example.com',
        phone: '+91 98123 45678',
        bloodGroup: 'O+',
        age: 24,
      },
      {
        name: 'Karan Verma',
        email: 'karan.verma@example.com',
        phone: '+91 99887 76655',
        bloodGroup: 'A+',
        age: 42,
      },
    ]);
    console.log(`Created ${patients.length} Patient documents.`);

    // 2. Create Doctors
    const doctors = await Doctor.create([
      {
        name: 'Dr. Rajesh Sharma',
        email: 'rajesh.sharma@medcare.com',
        specialisation: 'Cardiology',
        available: true,
      },
      {
        name: 'Dr. Priya Patel',
        email: 'priya.patel@medcare.com',
        specialisation: 'Pediatrics',
        available: true,
      },
      {
        name: 'Dr. Ankit Mehta',
        email: 'ankit.mehta@medcare.com',
        specialisation: 'Orthopedics',
        available: false,
      },
      {
        name: 'Dr. Sunita Rao',
        email: 'sunita.rao@medcare.com',
        specialisation: 'Neurology',
        available: true,
      },
    ]);
    console.log(`Created ${doctors.length} Doctor documents.`);

    // 3. Create Appointments (with references patientId and doctorId)
    const appointments = await Appointment.create([
      {
        patientId: patients[0]._id,
        doctorId: doctors[0]._id,
        date: '2026-08-25',
        timeSlot: '10:00 AM',
        status: 'confirmed',
        reason: 'Regular Heart Checkup and ECG review',
      },
      {
        patientId: patients[1]._id,
        doctorId: doctors[1]._id,
        date: '2026-08-26',
        timeSlot: '02:30 PM',
        status: 'pending',
        reason: 'Routine pediatric wellness examination',
      },
      {
        patientId: patients[2]._id,
        doctorId: doctors[2]._id,
        date: '2026-08-24',
        timeSlot: '11:15 AM',
        status: 'cancelled',
        reason: 'Consultation regarding knee pain and joint stiffness',
      },
    ]);
    console.log(`Created ${appointments.length} Appointment documents with Mongoose references.`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedData();

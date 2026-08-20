# Hospital Appointment System — ITUE301 Open-Book Practical Examination (Set A)

Course: ITUE301 — Advanced Web Development Frameworks  
Tech Stack: React + Express.js + MongoDB (Mongoose)

---

## 📌 Project Overview
MedCare Plus is a modern web application for managing hospital appointments, patients, and medical doctor availability. This repository contains the complete implementation covering all 5 exam tasks:

- **Task 1**: React Component Architecture (`HomePage`, `DoctorsPage`, `BookingPage`, `AppointmentCard` with dynamic status badges).
- **Task 2**: React Router client-side routing (`/`, `/doctors`, `/booking`) & form state management with `useState` live preview.
- **Task 3**: Express REST API endpoints (`GET /api/v1/appointments`, `POST /api/v1/appointments`, `GET /api/v1/doctors`), global custom `requestLogger` middleware, and global error handler.
- **Task 4**: Asynchronous REST API consumption in React (`DoctorsPage`) with `data`, `loading`, and `error` state handling using `useEffect()`.
- **Task 5**: Mongoose Schemas & Validation for `Patient`, `Doctor`, and `Appointment` with refs, enums, length limits, `.env` config, and error mapping.

---

## 🚀 Quick Setup & Execution

### 1. Environment Configuration (`.env`)
Create a `.env` file in the project root directory (refer to `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hospital_db
```

### 2. Backend Setup & Run Command
Open a terminal in the project root:

```bash
cd backend
npm install
npm start
# (or node server.js)
```

The Express server will start on `http://localhost:5000`.

To seed initial sample records into local MongoDB:
```bash
npm run seed
```

### 3. Frontend Setup & Run Command
Open a second terminal in the project root:

```bash
cd frontend
npm install
npm run dev
```

The React Vite application will launch at `http://localhost:3000`.

---

## 🍃 MongoDB Setup (Local MongoDB)
1. Ensure your local MongoDB service is running on `127.0.0.1:27017` (e.g. via MongoDB Community Server or MongoDB Compass).
2. The database name configured is `hospital_db`.
3. If local MongoDB is temporarily unstarted, the backend seamlessly operates with an in-memory store fallback so all endpoints and frontend features remain fully operational.

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/doctors` | Retrieve all doctor records |
| `POST` | `/api/v1/doctors` | Register a new doctor |
| `GET` | `/api/v1/appointments` | Retrieve all scheduled appointments |
| `POST` | `/api/v1/appointments` | Book a new appointment |
| `POST` | `/api/v1/appointments/validate-test?type=<type>` | Test Mongoose schema validation rules |

---

## 📸 Screenshots & PDF Report
Refer to `24CSE001_SetA_Report.pdf` (or `ITUE301_SetA_Report.pdf`) in the root folder for evidence screenshots:
1. **Screenshot 1 — React Application** (running in browser with navigation and appointment status badges)
2. **Screenshot 2 — REST API** (Postman / API endpoint response with custom logger output)
3. **Screenshot 3 — MongoDB** (MongoDB Compass / database schema documents)

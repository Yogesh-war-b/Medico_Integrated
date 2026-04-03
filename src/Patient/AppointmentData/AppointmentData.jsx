import React, { useState } from "react";
import patientData from "../../Data/PatienceData"; 
import ManageModal from "./ManageModal"; 
import "./AppointmentData.css";

function AppointmentData() {
  const [view, setView] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState(null); 

  const parseAppointmentDateTime = (date, time) => {
    if (!date) return null;

    const [year, month, day] = date.split("-").map(Number);
    if (!year || !month || !day) return null;

    let hours = 0;
    let minutes = 0;
    let timeValue = (time || "").trim();

    if (timeValue.includes("-")) {
      timeValue = timeValue.split("-")[0].trim();
    }

    const match = timeValue.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
    if (match) {
      hours = Number(match[1]);
      minutes = Number(match[2]);
      const ampm = match[3];
      if (ampm) {
        const normalizedAmpm = ampm.toUpperCase();
        if (normalizedAmpm === "PM" && hours < 12) hours += 12;
        if (normalizedAmpm === "AM" && hours === 12) hours = 0;
      }
    }

    return new Date(year, month - 1, day, hours, minutes, 0, 0);
  };

  // Extract all appointments from patients and flatten them
  const seedAppointments = patientData.patients.flatMap((patient) =>
    (patient.appointmentData || []).map((apt) => ({
      ...apt,
      patientId: patient.patientId,
      patientName: patient.name,
      appointmentDate: apt.date,
      timeSlot: apt.time,
      reasonForVisit: apt.reasonForVisit || apt.specialization || "General Checkup",
      id: apt.id || `${patient.patientId}-${apt.date}-${apt.time}`,
      source: "seed",
    }))
  );

  // Include booked appointments from localStorage
  const storedAppointmentsRaw = localStorage.getItem("appointments") || "[]";
  let storedAppointments = [];
  try {
    storedAppointments = JSON.parse(storedAppointmentsRaw);
  } catch (e) {
    storedAppointments = [];
  }

  const localAppointments = Array.isArray(storedAppointments)
    ? storedAppointments.map((apt) => ({
        ...apt,
        appointmentDate: apt.date,
        timeSlot: apt.time,
        doctorName: apt.doctorName || "To Be Assigned",
        reasonForVisit: apt.reasonForVisit || apt.healthIssues || "General Checkup",
        patientName: apt.name || "You",
        id: apt.id || `${apt.name}-${apt.date}-${apt.time}`,
        source: "localStorage",
      }))
    : [];

  const allAppointments = [...seedAppointments, ...localAppointments];

  const now = new Date();

  // Filter appointments based on view and search term
  const filteredAppointments = allAppointments.filter((item) => {
    const dateTime = parseAppointmentDateTime(item.appointmentDate, item.timeSlot);
    const dynamicStatus = dateTime
      ? dateTime < now
        ? "Past"
        : "Upcoming"
      : item.status || "Upcoming";

    const isStatusMatch = view === "upcoming"
      ? dynamicStatus === "Upcoming"
      : dynamicStatus === "Past";
    
    const doctorName = item.doctorName || "";
    const nameWithoutPrefix = doctorName.replace(/^(dr\.?\s*)/i, "");
    
    const isNameMatch = nameWithoutPrefix
      .toLowerCase()
      .trim()
      .includes(searchTerm.toLowerCase().trim());

    return isStatusMatch && isNameMatch;
  });

  return (
    <div className="appointments-page-wrapper">
      <section className="search-container-section">
        <div className="search-card-flat shadow-sm">
          <h2 className="search-card-title">🔍 Find Your Doctor</h2>
          <div className="search-flex-row">
            <input 
              type="text" 
              className="search-input-box" 
              placeholder="Search by doctor name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="theme-toggle-container">
              <button className={view === "upcoming" ? "btn-nav-theme active" : "btn-nav-theme"} onClick={() => setView("upcoming")}>Upcoming</button>
              <button className={view === "past" ? "btn-nav-theme active" : "btn-nav-theme"} onClick={() => setView("past")}>Past</button>
            </div>
            <button className="btn-search-action" onClick={() => setSearchTerm("")}>Clear</button>
          </div>
        </div>
      </section>

      <div className="container mt-4">
        <div className="appointment-results-grid">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((item) => (
              (() => {
                const dateTime = parseAppointmentDateTime(item.appointmentDate, item.timeSlot);
                const dynamicStatus = dateTime
                  ? dateTime < now
                    ? "Past"
                    : "Upcoming"
                  : item.status || "Upcoming";

                return (
                  <div className="appointment-themed-card mb-3 shadow-sm" key={item.id || `${item.patientId}-${item.appointmentDate}-${item.timeSlot}`}>
                    <div className="card-gradient-header"></div>
                    <div className=" card-body d-flex align-items-center p-4">
                      <div className="icon-box-themed me-4">{item.reasonForVisit.charAt(0)}</div>
                      <div className="subcard flex-grow-1">
                        <h5 className="fw-bold mb-1">{item.reasonForVisit}</h5>
                        <p className="theme-text-accent fw-bold mb-2">{item.doctorName || "To Be Assigned"}</p>
                        <div className="d-flex gap-4 text-muted small mb-1">
                          <span><strong>Date:</strong> {item.appointmentDate}</span>
                          <span><strong>Time:</strong> {item.timeSlot}</span>
                        </div>
                        <span className={`status-chip ${dynamicStatus.toLowerCase()}`}>{dynamicStatus}</span>
                      </div>

                      <div className="border-start ps-4">
                        <button
                          className="btn-theme-gradient px-4"
                          onClick={() => view === "upcoming" ? setSelectedApp(item) : null}
                        >
                          {view === "upcoming" ? "Manage" : "Details"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()
            ))
          ) : (
            <div className="no-data-card text-center py-5">
              <p className="text-muted">No appointments found.</p>
            </div>
          )}
        </div>
      </div>

      {/* FIXED: Conditional rendering ensures modal state is unique to each click */}
      {selectedApp && (
        <ManageModal 
          appointment={selectedApp} 
          onClose={() => setSelectedApp(null)} 
        />
      )}
    </div>
  );
}

export default AppointmentData;
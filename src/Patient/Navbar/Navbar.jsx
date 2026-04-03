import './Navbar.css';
import { useState } from 'react';

import Image from '../../Assets/Images/Doctor/ArjunReddy.jpg';
  
export default function Navbar({ onSectionChange }) {

  const [profileClicked, setProfileClicked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  


  function handleprofile(){
    setProfileClicked(()=>!profileClicked);
  }

  function handleprofileSection(section){
    if (onSectionChange) {
      onSectionChange(section);
    }
    setMenuOpen(false);
    setProfileClicked(false); // Close the dropdown after selecting an option
  }
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/">
          🏥 Medico
        </a>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse ${menuOpen ? 'show-mobile' : 'hide-mobile'}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Mobile profile options */}
            <li className="nav-item mobile-only">
              <a className="nav-link" onClick={() => handleprofileSection("Profile")}>
                View Profile
              </a>
            </li>
            <li className="nav-item mobile-only">
              <a className="nav-link" onClick={() => handleprofileSection("settings")}>
                Settings
              </a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link " onClick={() => handleprofileSection("appointments")} href="#appointments">
                Book Appointment
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " onClick={() => handleprofileSection("MedicationTests")} href="#MedicationTests">
                Medication & Tests
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => handleprofileSection("AppointmentData")} href="#AppointmentData">
                Appointments
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link"  onClick={()=> handleprofileSection("Contact")} href="#contact">
                Contact
              </a>
            </li>
            
            {/* Logout at bottom for mobile */}
            <li className="nav-item mobile-only logout-bottom">
              <a className="nav-link" onClick={() => handleprofileSection("logout")}>
                Logout
              </a>
            </li>
            
            {/* Desktop profile button */}
            <li className="nav-item desktop-profile">
              <a className="nav-link btn btn-primary text-white ms-2" href="#Profile">
                <img className="pProfile" src={Image} alt="Profile" onClick={handleprofile}/>
              </a>
            </li>
          </ul>
          {profileClicked && (
            <div className="pprofileDropdown">
              <p className="dropdown-item" onClick={() => handleprofileSection("Profile")}>
                View Profile
              </p>
              <hr />
              <p className="dropdown-item" onClick={() => handleprofileSection("settings")}>
                Settings
              </p>
              <hr />
              <p className="dropdown-item" onClick={() => handleprofileSection("logout")}>
                Logout
              </p>
            </div>
          )}




        </div>
      </div>
    </nav>
  );
}

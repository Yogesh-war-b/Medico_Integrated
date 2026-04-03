import React, { useState } from 'react';

import Navbar from '../Patient/Navbar/Navbar';

import Search from '../Patient/AppointmentBooking/AppointmentBooking';

import Profile from '../Patient/Profile/Profile';

import ContactPage from './Contact';

import AppointmentData from '../Patient/AppointmentData/AppointmentData';

import './Patient.css';

import MedicationTests from '../Patient/TestsAndMedicines/MedicationTests';

export default function Patient() {
  const [selectedSection, setSelectedSection] = useState('');

  const renderContent = () => {
    switch (selectedSection) {
      case 'Profile':
        return <Profile userId="PAT000000001" />;
      case 'Contact':
        return <ContactPage />;
      case 'AppointmentData':
        return <AppointmentData />;
      case 'settings':
        return <div className="settings-container"><h2>Settings</h2><p>Settings content here.</p></div>;
      case 'MedicationTests':
        return <MedicationTests />;

      case 'logout':
        // Handle logout
        localStorage.clear();
        window.location.href = '/';
        return null;
      default:
        return <Search />;
    }
  };
    
  return (
    <div class="patience-container">
      <Navbar onSectionChange={setSelectedSection} />
      
      {renderContent()}

      {/* <footer className="text-center  mt-2 ">
        <p className="text-muted mb-0">&copy; 2026 Medico. All rights reserved.</p>
      </footer> */}
    </div>
  );
}

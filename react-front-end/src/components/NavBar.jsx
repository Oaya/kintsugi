import React from 'react';

import { FaRegUser } from 'react-icons/fa'

export default function NavBar() {
  return (
    <nav className="navigation">
      <a href="/" className="logo">
        Kintsugi
      </a>
      <div className="navigation__center">
        <div>
          <a href="/">Get Help</a>
        </div>
        <div>
          <a href="/myAppointments">View Appointments</a>
        </div>
      </div>
      <div className="navigation__right">
        <span className="user"><FaRegUser />Aya Okizaki</span>
        <br />
        <span className="logout">Logout</span>
      </div>
    </nav>
  );
}

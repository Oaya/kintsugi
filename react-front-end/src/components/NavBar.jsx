import React from 'react';
import NavLinks from '../components/NavLinks';
import { FaRegUser } from 'react-icons/fa'

export default function NavBar() {
  return (
    <nav className="navigation">
      <div className="logo">
        <a href="/">
          <h1>Kintsugi</h1>
        </a>
      </div>
      <NavLinks />
      <div className="navigation__links2">
        <div className="logout"><span className="user"><FaRegUser /> Aya Okizaki</span><br /><span className="hover">Logout</span> </div>
      </div>
    </nav>
  );
}

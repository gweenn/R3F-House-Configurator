import '../App.css'
import React, { useState } from 'react'
import { Dropdown, ButtonToolbar } from 'rsuite';
import moreOptions from '../assets/moreOptions.png'

function AppNavbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  
  // <img className="navicons" src={moreOptions} alt="Objects Icon" width="30" height="30" onClick={toggleDropdown} />
  // {isDropdownOpen && (
  //   <div className="dropdown-content">
  //     {/* Dropdown menu content goes here */}
  //     <a href="#">Item 1</a>
  //     <a href="#">Item 2</a>
  //     <a href="#">Item 3</a>
  //   </div>
  // )}

  return (
    <>
    <div className='test'>

      <label htmlFor="">House Configurator</label>
    </div>
    
    </>
  );
};




export default AppNavbar;
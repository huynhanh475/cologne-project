import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData.js';
import './NavBar.css';
import { IconContext } from 'react-icons';
import {roles} from '../../utils/constants';
import {logout} from '../../utils/auth';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const typeOfUser = JSON.parse(localStorage.getItem("USER_DATA"))["userType"];
  const roleOfUser = JSON.parse(localStorage.getItem("USER_DATA"))["role"];
  function filterSidebar(SidebarData, typeOfUser, roleOfUser){
    if (roleOfUser===roles.admin){
        return SidebarData.filter(component => component.role===roles.admin)
    }
    else{
        return SidebarData.filter(component => component.userType===typeOfUser)
    }
  }

  const handleLogOut = () => {
    logout();
  }

  let newSidebarData = filterSidebar(SidebarData, typeOfUser, roleOfUser);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar-container">
          <Link to='#' className='menu-bars-container'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="logout-button" onClick={handleLogOut}>
            Log out
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu-container active' : 'nav-menu-container'}>
          <ul className='nav-menu-items-container' onClick={showSidebar}>
            <li className='navbar-toggle-container'>
              <Link to='#' className='menu-bars-container'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            
            {newSidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <div className='title-container'>{item.title}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
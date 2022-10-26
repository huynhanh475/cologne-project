import React, {useState} from 'react';
import Navbar from '../NavbarAdmin/Navbar';
import './CreateUserForm.css';
import UserForm from './UserForm';

function CreateUserForm() {
  return (
    <div>
      <div className="navbarcomponent">
        <Navbar/>
      </div>
      <UserForm/>
    </div>
  )
}

export default CreateUserForm
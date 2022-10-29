import React, {useState} from 'react';
import "./UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import { UserListColumn } from "./UserListColumn";
import Navbar from '../NavbarAdmin/Navbar';
import record from './MOCK_DATA (7).json';
function UserList() {
    const data = record;
  
    return (
      <div> 
          <div className="user-list-container">
              <DataGrid
              rows={data}
              getRowId={(row) => row.email}
              columns={UserListColumn}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              />       
          </div>
          
      </div>  
    );
}

export default UserList
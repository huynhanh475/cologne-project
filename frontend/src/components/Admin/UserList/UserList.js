import React, { useState, useEffect } from 'react';
import "./UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import { UserListColumn } from "./UserListColumn";
import { request } from '../../../utils/request';

function UserList() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem("AUTH_DATA");
    const params = {
        method: "GET",
        url: "/user",
        headers: { 'Content-Type': "application/json", 'x-access-token': token },
    }

    useEffect(() => {
        const getUsers = async () => {
            const response = await request(params);
            var rawData = await response.text();
            var jsonData = JSON.parse(rawData);
            console.log(jsonData["data"])
            setData(jsonData["data"])
        };
        getUsers(); 
        return () => {
            // this now gets called when the component unmounts
        };
    }, []);

    return (
        <div>
            <div className="user-list-container">
                <DataGrid
                    rows={data}
                    getRowId={(row) => row.userId}
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
import React from 'react';
import admin from "../../images/admin.svg";
import './HomePageAdmin.css';

function HomePageAdmin() {
    return (
        <div>
            <div>
                <div className="homepage">
                    <div className="first-part-landing">
                        <img className="image" src={admin} alt="Welcome" />
                    </div>
                    <div className="second-part-landing">
                        <div className="second-part-container">
                            <h1 className='text-container'>Welcome Admin!</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePageAdmin
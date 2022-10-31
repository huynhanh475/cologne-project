import React from 'react';
import manufacturer from "../../images/manufacturer.svg";
import './HomePage.css';
function HomePage() {
  return (
    <div>
        <div className="homepage">
            <div className="first-part-landing">
                <img src={manufacturer} alt="Welcome"/>
            </div>
            <div className="second-part-landing">
                <div className="second-part-container">
                    <h1 className='text-container'>Welcome <br/>Manufacturer!</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage
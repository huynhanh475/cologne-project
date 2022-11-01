import React from 'react';
import retailer from "../../images/retailer.svg";
import './HomePageRetailer.css';

function HomePageRetailer() {
    return (
        <div>
            <div>
                <div className="homepage">
                    <div className="first-part-landing">
                        <img className="image" src={retailer} alt="Welcome" />
                    </div>
                    <div className="second-part-landing">
                        <div className="second-part-container">
                            <h1 className='text-container'>Welcome Retailer!</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePageRetailer
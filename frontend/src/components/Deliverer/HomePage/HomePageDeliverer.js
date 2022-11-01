import React from 'react';
import deliverer from "../../images/deliverer.svg";
import './HomePageDeliverer.css';

function HomePageDeliverer() {
    return (
        <div>
            <div className="homepage1">
                <div className="first-part-landing1">
                    <img className="image1" src={deliverer} alt="Welcome" />
                </div>
                <div className="second-part-landing1">
                    <div className="second-part-container1">
                        <h1 className='text-container1'>Welcome Deliverer!</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePageDeliverer
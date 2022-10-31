import React from 'react';
import deliverer from "../../images/deliverer.svg";
import './HomePageDeliverer.css';

function HomePageDeliverer() {
    return (
        <div>
            <div className="homepage">
                <div className="first-part-landing">
                    <img className="image" src={deliverer} alt="Welcome" />
                </div>
                <div className="second-part-landing">
                    <div className="second-part-container">
                        <h1 className='text-container'>Welcome Deliverer!</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePageDeliverer
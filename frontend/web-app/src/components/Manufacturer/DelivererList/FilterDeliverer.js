import React from 'react'
import { useState } from 'react'
import "./FilterDeliverer.css"

function FilterDeliverer() {
    const [user, setUserID] = useState("");
  return (
    <div className='filter_user'>
        <input
            type="text"
            placeholder="Search by Deliverer ID..."
            onChange={(e)=>{setUserID(e.target.value)}}
        />
    </div>
  )
}

export default FilterDeliverer;
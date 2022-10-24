import React, {useState} from 'react';

function FilterTransferList() {
    const [batchID, setBatchID] = useState("");
    return (
      <div className='filter_batch'>
          <input
              type="text"
              placeholder="Search by Batch ID..."
              onChange={(e)=>{setBatchID(e.target.value)}}
          />
      </div>
    )
}

export default FilterTransferList
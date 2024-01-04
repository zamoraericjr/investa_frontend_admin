import React from 'react'

function InvRecs({amt, date}) {
    return (

        <div className="md:flex justify-between items-center bg-gray-50 border-2 border-gray-100 p-1 ml-3 mr-3">
          <div className="text-lg ml-4" >{date}</div>
          <div >Cash out</div>
          <div className="text-lg mr-4">{amt.toLocaleString('en-US', {style: 'currency', currency: 'Php', minimumFractionDigits: 0, maximumFractionDigits: 2})}</div>           
        </div>    
      );
}

export default InvRecs
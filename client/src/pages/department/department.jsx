import React from 'react';
import { Outlet } from 'react-router-dom';
function Department() {
    return (
        <div className='w-full'>
            <Outlet />
        </div >
    )
}

export default Department
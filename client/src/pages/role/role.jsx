import React from 'react';
import { Outlet } from 'react-router-dom';
function Role() {
    return (
        <div className='w-full'>
            <Outlet />
        </div >
    )
}

export default Role
import React from 'react';
import { Outlet } from 'react-router-dom';
function Employee() {
    return (
        <div className='w-full'>
            <Outlet />
        </div >
    )
}

export default Employee
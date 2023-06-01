import React, { useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { FaBriefcase, FaChartPie, FaCity, FaDesktop, FaUser, FaUserAlt, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Sidebar() {
    const [open, setOpen] = useState(true)
    const MENUS = [
        { title: 'Dashboard', icon: <FaChartPie />, path: '/dashboard' },
        { title: 'Departments', icon: <FaCity />, path: '/department' },
        { title: 'Roles', icon: <FaBriefcase />, path: '/role' },
        { title: 'Employees', icon: < FaUserAlt />, path: '/employee' },
        { title: 'Assets', icon: <FaDesktop />, path: '/asset' },
        // { title: 'Projects', icon: <BsBriefcase />, path: '/project' },
        { title: 'Profile', footer: true, icon: <FaUser />, path: '/profile' },
    ]
    return (
        <div className={`w-full px-2 ${open ? 'w-60' : 'w-20'} bg-slate-700 min-h-screen relative`}>
            <BsArrowRightShort className={`bg-white border-2 border-slate-700 text-slate-700 
            text-3xl rounded-md absolute -right-3 top-4 cursor-pointer transform 
            transition-transform duration-300 ${open && 'rotate-180'} z-10`}
                onClick={() => setOpen(!open)} />
            <div className={`flex my-3 items-center flex-col space-y-3`}>
                <FaUsers className='text-white text-4xl' />
                <h1 className={`text-lg font-semibold text-white uppercase ${!open && 'scale-0 hidden'}`}>EmployeePortal</h1>
            </div>
            <hr className={`border-t-2 border-slate-500 mt-5`} />
            <ul className={`w-full pt-2 flex flex-col`}>
                {
                    MENUS.map((item, index) => (
                        <Link to={item.path} key={index} className="w-full">
                            <li className={`px-2 ${!open && 'justify-center py-3'} w-full ${open && 'py-4 justify-start'}  
                            text-gray-200 text-sm flex items-center  gap-x-3 cursor-pointer 
                            hover:bg-slate-100 hover:text-slate-800 rounded-md`}>
                                <span className={`text-2xl ${!open && 'py-2'}`}>
                                    {item.icon}
                                </span>
                                <span className={`text-base font-medium ${!open && 'hidden'}`}>
                                    {item.title}
                                </span>
                            </li>
                        </Link>
                    ))}
            </ul>
        </div >

    )
}

export default Sidebar
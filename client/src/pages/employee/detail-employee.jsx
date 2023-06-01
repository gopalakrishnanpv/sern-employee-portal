import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBriefcase, FaPhone, FaStepBackward, FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../appconfig";
import Button from "../../components/button";
import LoadingSpinner from "../../modules/loading-spinner";

function DetailEmployee() {
    const [employee, setEmployee] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    let params = useParams();
    const [openTab, setOpenTab] = React.useState(1);

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${config.apiBaseurl}/employee/${params.id}`).then((response) => {
            setEmployee(response.data)
            setIsLoading(false)
        })

    }, [params])

    const handleCancel = () => {
        navigate('/employee')
    };

    return (
        <div className='w-full h-full px-5'>
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                            <Button
                                bgcolor='bg-amber-600'
                                action={handleCancel}
                                icon={<FaStepBackward />}
                                text={'BACK'} />
                        </div>
                        <h1 className='text-left uppercase  text-md font-medium py-5 text-gray-700'>Employee Detail</h1>

                    </div>
                    <div className="flex items-start justify-between w-full h-full gap-5">
                        <div className=" xl:w-3/12 lg:w-3/12 w-0">
                            <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                                className="rounded-lg object-cover" />
                        </div>
                        <div className="flex flex-wrap w-full ">
                            <div className="w-full">
                                <ul
                                    className="flex flex-wrap xl:flex-row lg:flex-row flex-col"
                                    role="tablist"
                                >
                                    {tabEntry(1, "Personal", <FaUser className="text-xl" />)}
                                    {tabEntry(2, "Work", <FaBriefcase className="text-xl" />)}
                                    {tabEntry(3, "Contact", <FaPhone className="text-xl" />)}

                                </ul>
                                <div className="flex flex-col break-all w-full h-full bg-gray-50 xl:p-5 lg:p-5 p-2">
                                    <div className="flex-auto w-full h-full">
                                        <div className={openTab === 1 ? "block h-full" : "hidden"} id="link1">
                                            <table className="w-full text-left border-2">
                                                <thead className="">
                                                    <tr>
                                                        <th className="text-white border-2 bg-slate-400 p-2 w-1/3">PROPERTY</th>
                                                        <th className="text-white border-2 bg-slate-400 p-2 w-2/3">VALUE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableEntry("Name", employee.Name)}
                                                    {tableEntry("Username", employee.UserName)}
                                                    {tableEntry("Employee Id", employee.EmployeeId)}
                                                    {tableEntry("Father Name", employee.FatherName)}
                                                    {tableEntry("Mother Name", employee.MotherName)}
                                                    {tableEntry("Gender", employee.Gender?.Name)}
                                                    {tableEntry("Marital Status", employee.MaritalStatus?.Name)}
                                                    {tableEntry("Blood Group", employee.BloodGroup?.Name)}
                                                    {tableEntry("Date of Birth", employee.DateOfBirth)}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                            <table className="w-full text-left border-2">
                                                <thead className="">
                                                    <tr>
                                                        <th className="text-white border-2 bg-slate-400 p-2 w-1/3">PROPERTY</th>
                                                        <th className="text-white border-2 bg-slate-400 p-2 w-2/3">VALUE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableEntry("Education", employee.Education)}
                                                    {tableEntry("Date Of Joining", employee.DateOfJoining)}
                                                    {tableEntry("Work Location", employee.WorkLocation)}
                                                    {tableEntry("Project", employee.Project)}
                                                    {tableEntry("Role", employee.Role?.Name)}
                                                    {tableEntry("Department", employee.Role?.Department?.Name)}
                                                    {tableEntry("Total Years Of Experience", employee.YearsOfExperience)}
                                                    {tableEntry("Assets", employee.Assets?.map(asset => asset.SerialNumber).join(" | "))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                            <table class="w-full text-left border-2">
                                                <thead className="">
                                                    <tr>
                                                        <th className="text-white border-2 bg-slate-400 p-2 w-1/3">PROPERTY</th>
                                                        <th className="text-white border-2 bg-slate-400 p-2 w-2/3">VALUE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableEntry("Mobile Number", employee.MobileNumber)}
                                                    {tableEntry("Email Id", employee.EmailId)}
                                                </tbody>
                                            </table>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            }
        </div>
    )

    function tableEntry(labelName, labelValue) {
        return (
            <tr>
                <td className="border-2 border-slate-300 p-2 text-xs font-medium bg-slate-200 uppercase">{labelName}</td>
                <td className="border-2 border-slate-300 p-2 text-xs font-medium uppercase">{labelValue}</td>
            </tr>
        )
    }

    function detailEntry(labelName, labelValue) {
        return (
            <div className="grid grid-cols-12 w-full p-2">
                <p className="text-xs uppercase font-medium col-span-4">{labelName}  </p>
                <p className="text-xs uppercase font-medium col-span-1">-</p>
                <p className="text-sm font-normal col-span-7">{labelValue}</p>
            </div>
        )
    }

    function tabEntry(tabIndex, tabName, icon) {
        return (
            <li className="flex-auto text-center">
                <a
                    className={
                        "text-xs font-semibold uppercase px-5 py-3 block  " +
                        (openTab === tabIndex
                            ? `text-amber-600 border-b-4 border-amber-600 bg-amber-600 bg-opacity-10`
                            : `text-gray-400 bg-gray-50 border-b-4 border-gray-100`)
                    }
                    onClick={e => {
                        e.preventDefault();
                        setOpenTab(tabIndex);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                >
                    <div className="flex items-center justify-center gap-2">
                        {icon}
                        <p>{tabName}</p>
                    </div>
                </a>
            </li>
        )
    }
}



export default DetailEmployee
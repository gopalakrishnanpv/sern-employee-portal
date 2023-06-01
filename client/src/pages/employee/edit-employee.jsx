import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaStepBackward } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../appconfig";
import Button from "../../components/button";
import DatePicker from "../../components/date-picker";
import Input from "../../components/input";
import Notification from "../../components/notification";
import Select from "../../components/select";
import LoadingSpinner from "../../modules/loading-spinner";

function EditEmployee() {
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({})
    const [message, setMessage] = useState("")
    const [snackbarDisplayed, setSnackbarDisplayed] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [genders, setGenders] = useState([]);
    const [bloodGroups, setBloodGroups] = useState([]);
    const [maritalStatuses, setMaritalStatuses] = useState([]);
    let params = useParams();

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${config.apiBaseurl}/employee/${params.id}`).then((response) => {
            setEmployee(response.data)
            setIsLoading(false)
        })
    }, [params])


    const getRoles = () => {
        axios.get(`${config.apiBaseurl}/role`).then((response) => {
            let roles = []
            for (let role of response.data) {
                roles.push({ value: role.Name, text: role.Name })
            }
            setRoles(roles)
        }, (error) => {
            console.log(error)
            setRoles([])
        });
    }

    const getGenders = () => {
        axios.get(`${config.apiBaseurl}/gender`).then((response) => {
            let genders = []
            for (let role of response.data) {
                genders.push({ value: role.Name, text: role.Name })
            }
            setGenders(genders)
        }, (error) => {
            console.log(error)
            setGenders([])
        });
    }

    const getBloodGroups = () => {
        axios.get(`${config.apiBaseurl}/bloodgroup`).then((response) => {
            let bloodgroups = []
            for (let bloodgroup of response.data) {
                bloodgroups.push({ value: bloodgroup.Name, text: bloodgroup.Name })
            }
            setBloodGroups(bloodgroups)
        }, (error) => {
            console.log(error)
            setBloodGroups([])
        });
    }

    const getMaritalStatuses = () => {
        axios.get(`${config.apiBaseurl}/maritalstatus`).then((response) => {
            let maritalStatuses = []
            for (let maritalStatus of response.data) {
                maritalStatuses.push({ value: maritalStatus.Name, text: maritalStatus.Name })
            }
            setMaritalStatuses(maritalStatuses)
        }, (error) => {
            console.log(error)
            setMaritalStatuses([])
        });
    }
    useEffect(() => {
        getRoles()
        getGenders()
        getBloodGroups()
        getMaritalStatuses()
    }, []);

    const handleCancel = () => {
        navigate('/employee')
    };

    const updateEmployee = (event) => {
        event.preventDefault()
        setIsLoading(true)
        axios.put(`${config.apiBaseurl}/employee/${params.id}`,
            {
                Name: event.target.Name.value,
                EmployeeId: event.target.EmployeeId.value,
                RoleName: event.target.RoleName.value,
                UserName: event.target.UserName.value,
                FatherName: event.target.FatherName.value,
                MotherName: event.target.MotherName.value,
                DateOfBirth: event.target.DateOfBirth.value,
                DateOfJoining: event.target.DateOfJoining.value,
                EmailId: event.target.EmailId.value,
                MobileNumber: event.target.MobileNumber.value,
                Education: event.target.Education.value,
                Gender: event.target.Gender.value,
                MaritalStatus: event.target.MaritalStatus.value,
                BloodGroup: event.target.BloodGroup.value,
            })
            .then((response) => {
                setMessage(response.data.message)
                setSnackbarDisplayed(true)
                setTimeout(function () {
                    setSnackbarDisplayed(false)
                    navigate('/employee')
                    setIsLoading(false)
                }, 1500);
            }, (error) => {
                setMessage(error.response.data.message)
                setSnackbarDisplayed(true)
                setTimeout(function () {
                    setSnackbarDisplayed(false)
                    setIsLoading(false)
                }, 1500);
            })
    };

    return (
        <div className='w-full h-screen px-10'>
            {isLoading && <LoadingSpinner />}
            {!isLoading && <form onSubmit={updateEmployee}>
                <h1 className='text-left uppercase text-xl font-medium py-5 text-gray-700'>Edit Employee</h1>
                <div className='mb-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 text-white'>
                    <Input value={employee.Name}
                        onChange={event => setEmployee({ ...employee, Name: event.target.value })}
                        id={'Name'}
                        label={'Name'}
                        required={true} />
                    <Input value={employee.EmployeeId}
                        onChange={event => setEmployee({ ...employee, EmployeeId: event.target.value })}
                        id={'EmployeeId'}
                        label={'Employee Id'}
                        required={true} />
                    <Input value={employee.UserName}
                        onChange={event => setEmployee({ ...employee, UserName: event.target.value })}
                        id={'UserName'}
                        label={'UserName'}
                        required={true} />
                    <Select id="RoleName" selectedValue={employee.Role?.Name}
                        onValueChange={(event) => setEmployee({ ...employee, Role: { Name: event.target.value } })}
                        options={roles} label="Select Role" />
                    <Input value={employee.FatherName}
                        onChange={event => setEmployee({ ...employee, FatherName: event.target.value })}
                        id={'FatherName'}
                        label={'Father Name'}
                        required={true} />
                    <Input value={employee.MotherName}
                        onChange={event => setEmployee({ ...employee, MotherName: event.target.value })}
                        id={'MotherName'}
                        label={'Mother Name'}
                        required={true} />
                    <Input value={employee.EmailId}
                        onChange={event => setEmployee({ ...employee, EmailId: event.target.value })}
                        id={'EmailId'}
                        label={'Email Id'}
                        required={true} />
                    <Input value={employee.MobileNumber}
                        onChange={event => setEmployee({ ...employee, MobileNumber: event.target.value })}
                        id={'MobileNumber'}
                        label={'Mobile Number'}
                        required={true} />
                    <Input value={employee.Education}
                        onChange={event => setEmployee({ ...employee, Education: event.target.value })}
                        id={'Education'}
                        label={'Education'}
                        required={true} />
                    <Select id="Gender" selectedValue={employee?.Gender?.Name}
                        onValueChange={(event) => setEmployee({ ...employee, Gender: event.target.value })}
                        options={genders} label="Select Gender" />
                    <Select id="MaritalStatus" selectedValue={employee?.MaritalStatus?.Name}
                        onValueChange={(event) => setEmployee({ ...employee, MaritalStatus: event.target.value })}
                        options={maritalStatuses} label="Select Marital Status" />
                    <Select id="BloodGroup" selectedValue={employee?.BloodGroup?.Name}
                        onValueChange={(event) => setEmployee({ ...employee, BloodGroup: event.target.value })}
                        options={bloodGroups} label="Select Blood Group" />
                    <DatePicker value={employee.DateOfBirth}
                        onChange={event => setEmployee({ ...employee, DateOfBirth: event.target.value })}
                        id={'DateOfBirth'}
                        label={'Date Of Birth'}
                        required={true} />
                    <DatePicker value={employee.DateOfJoining}
                        onChange={event => setEmployee({ ...employee, DateOfJoining: event.target.value })}
                        id={'DateOfJoining'}
                        label={'Date Of Joining'}
                        required={true} />
                </div>
                <div className="flex gap-2">
                    <Button
                        type='submit'
                        bgcolor='bg-sky-600'
                        icon={<FaEdit />}
                        text={'UPDATE'} />
                    <Button
                        bgcolor='bg-amber-600'
                        action={handleCancel}
                        icon={<FaStepBackward />}
                        text={'BACK'} />
                </div>
            </form>
            }
            {
                message && snackbarDisplayed &&
                <Notification message={message} showSnackbar={snackbarDisplayed}
                />
            }
        </div>
    )
}

export default EditEmployee
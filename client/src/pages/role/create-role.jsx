import axios from "axios";
import { useEffect, useState } from 'react';
import { FaPlus, FaStepBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import config from "../../appconfig";
import Button from "../../components/button";
import Input from "../../components/input";
import Notification from "../../components/notification";
import Select from "../../components/select";
import LoadingSpinner from "../../modules/loading-spinner";

function CreateRole() {
    const [role, setRole] = useState({})
    const [message, setMessage] = useState("")
    const [snackbarDisplayed, setSnackbarDisplayed] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    const addRole = (event) => {
        event.preventDefault()
        setIsLoading(true)
        axios.post(`${config.apiBaseurl}/role`, {
            "Name": event.target.Name.value,
            "DepartmentName": event.target.DepartmentName.value
        }).then((response) => {
            setIsLoading(false)
            setMessage(response.data.message)
            setSnackbarDisplayed(true)
            setTimeout(function () {
                setSnackbarDisplayed(false)
                navigate('/role')
            }, 1500);
        }, (error) => {
            setIsLoading(false)
            setMessage(error.response.data.message)
            setSnackbarDisplayed(true)
            setTimeout(function () {
                setSnackbarDisplayed(false)
            }, 1500);
        })
    };

    const handleCancel = () => {
        navigate('/role')
    };

    const getDepartments = () => {
        axios.get(`${config.apiBaseurl}/department`).then((response) => {
            let departments = []
            for (let department of response.data) {
                departments.push({ value: department.Name, text: department.Name })
            }
            setDepartments(departments)
        }, (error) => {
            console.log(error)
            setDepartments([])
        });
    }

    useEffect(() => {
        getDepartments()
    }, []);

    return (
        <div className='w-full h-screen px-10'>
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
                <div className="h-full">
                    <h1 className='text-left uppercase  text-xl font-medium py-5 text-gray-700'>Add Role</h1>
                    <form onSubmit={addRole}>
                        <div className='mb-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 text-white'>
                            <Input value={role.Name}
                                onChange={event => setRole({ ...role, Name: event.target.value })}
                                id={'Name'}
                                label={'Name'}
                                required={true} />
                            <Select id="DepartmentName" options={departments}
                                label="Select Department" />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                type='submit'
                                bgcolor='bg-sky-600'
                                icon={<FaPlus />}
                                text={'ADD'}
                                disabled={false} />
                            <Button
                                bgcolor='bg-amber-600'
                                action={handleCancel}
                                icon={<FaStepBackward />}
                                text={'BACK'} />
                        </div>
                    </form>
                </div>
            }
            {
                message && snackbarDisplayed &&
                <Notification message={message} showSnackbar={snackbarDisplayed}
                />
            }
        </div>
    )
}

export default CreateRole
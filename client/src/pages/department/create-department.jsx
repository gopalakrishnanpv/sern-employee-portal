import axios from "axios";
import { useState } from 'react';
import { FaPlus, FaStepBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import config from "../../appconfig";
import Button from "../../components/button";
import Input from "../../components/input";
import Notification from "../../components/notification";
import LoadingSpinner from "../../modules/loading-spinner";

function CreateDepartment() {
    const [department, setDepartment] = useState({})
    const [message, setMessage] = useState("")
    const [snackbarDisplayed, setSnackbarDisplayed] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const addDepartment = (event) => {
        event.preventDefault()
        setIsLoading(true)
        axios.post(`${config.apiBaseurl}/department`, {
            "Name": event.target.Name.value
        }).then((response) => {
            setIsLoading(false)
            setMessage(response.data.message)
            setSnackbarDisplayed(true)
            setTimeout(function () {
                setSnackbarDisplayed(false)
                navigate('/department')
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
        navigate('/department')
    };

    return (
        <div className='w-full h-screen px-10'>
            {isLoading && <LoadingSpinner />}
            {!isLoading && <form onSubmit={addDepartment}>
                <h1 className='text-left uppercase text-xl font-medium py-5 text-gray-700'>Add Department</h1>
                <div className='mb-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 text-white'>
                    <Input value={department.Name}
                        onChange={event => setDepartment({ ...department, Name: event.target.value })}
                        id={'Name'}
                        label={'Name'}
                        required={true} />
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
            }
            {
                message && snackbarDisplayed &&
                <Notification message={message} showSnackbar={snackbarDisplayed}
                />
            }
        </div>
    )
}

export default CreateDepartment
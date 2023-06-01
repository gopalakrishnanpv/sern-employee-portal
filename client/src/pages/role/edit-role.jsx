import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaStepBackward } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../appconfig";
import Button from "../../components/button";
import Input from "../../components/input";
import Notification from "../../components/notification";
import Select from "../../components/select";
import LoadingSpinner from "../../modules/loading-spinner";


function EditRole() {
    const navigate = useNavigate()
    const [role, setRole] = useState({})
    const [message, setMessage] = useState("")
    const [snackbarDisplayed, setSnackbarDisplayed] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    let params = useParams();

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${config.apiBaseurl}/role/${params.id}`).then((response) => {
            let role = response.data
            setRole(role)
            setIsLoading(false)
        }, (error) => {
            console.log(error)
            setIsLoading(false)
        })

    }, [params])


    const getDepartments = () => {
        setIsLoading(true)
        axios.get(`${config.apiBaseurl}/department`).then((response) => {
            let departments = []
            for (let department of response.data) {
                departments.push({ value: department.Name, text: department.Name })
            }
            setOptions(departments)
            setIsLoading(false)
        }, (error) => {
            console.log(error)
            setOptions([])
            setIsLoading(false)
        });
    }

    useEffect(() => {
        getDepartments()
    }, []);


    const handleCancel = () => {
        navigate('/role')
    };

    const updateRole = (event) => {
        event.preventDefault()
        setIsLoading(true)
        axios.put(`${config.apiBaseurl}/role/${params.id}`,
            {
                Name: event.target.Name.value,
                DepartmentName: event.target.DepartmentName.value,
            })
            .then((response) => {
                setMessage(response.data.message)
                setSnackbarDisplayed(true)
                setTimeout(function () {
                    setSnackbarDisplayed(false)
                    navigate('/role')
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
            {!isLoading &&
                <div className="h-full">
                    <h1 className='text-left uppercase text-xl font-medium py-5 text-gray-700'>Edit Role</h1>
                    <form onSubmit={updateRole}>
                        <div className='mb-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 text-white'>
                            <Input value={role.Name}
                                onChange={event => setRole({ ...role, Name: event.target.value })}
                                id={'Name'}
                                label={'Name'}
                                required={true} />
                            <Select id="DepartmentName" selectedValue={role.Department?.Name ?? ""}
                                onValueChange={(event) => { setRole({ ...role, Department: { Name: event.target.value } }) }}
                                options={options} label="Select Department" />
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

export default EditRole
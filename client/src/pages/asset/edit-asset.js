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


function EditAsset() {
    const navigate = useNavigate()
    const [asset, setAsset] = useState({})
    const [message, setMessage] = useState("")
    const [snackbarDisplayed, setSnackbarDisplayed] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [employees, setEmployees] = useState([]);

    let params = useParams();

    useEffect(() => {
        axios.get(`${config.apiBaseurl}/asset/${params.id}`).then((response) => {
            setAsset(response.data)
        })

    }, [params])


    const handleCancel = () => {
        navigate('/asset')
    };

    const updateAsset = (event) => {
        event.preventDefault()
        setIsLoading(true)
        axios.put(`${config.apiBaseurl}/asset/${params.id}`,
            {
                SerialNumber: event.target.SerialNumber.value,
                Make: event.target.Make.value,
                Model: event.target.Model.value,
                WarrantyStatus: event.target.WarrantyStatus.value,
                AssetStatus: event.target.AssetStatus.value,
                PurchaseDate: event.target.PurchaseDate.value,
                InvoiceNumber: event.target.InvoiceNumber.value,
                WarrantyExpirationDate: event.target.WarrantyExpirationDate.value,
                AssetType: event.target.AssetType.value,
                HostName: event.target.HostName.value,
                RequestNumber: event.target.RequestNumber.value,
                Age: event.target.Age.value,
                OperatingSystem: event.target.OperatingSystem.value,
                Processor: event.target.Processor.value,
                ClockSpeed: event.target.ClockSpeed.value,
                RAM: event.target.RAM.value,
                EmployeeId: event.target.EmployeeId.value,
            })
            .then((response) => {
                setMessage(response.data.message)
                setSnackbarDisplayed(true)
                setTimeout(function () {
                    setSnackbarDisplayed(false)
                    navigate('/asset')
                    setIsLoading(false)
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

    const getEmployees = () => {
        axios.get(`${config.apiBaseurl}/employee`).then((response) => {
            let employees = []
            for (let employee of response.data) {
                employees.push({ value: employee.Id, text: `${employee.Name} ${employee.FatherName} (${employee.EmployeeId})` })
            }
            setEmployees(employees)
        }, (error) => {
            console.log(error)
            setEmployees([])
        });
    }

    useEffect(() => {
        getEmployees()
    }, []);

    return (
        <div className='w-full h-screen px-10'>
            {isLoading && <LoadingSpinner />}
            {!isLoading && <form onSubmit={updateAsset}>
                <h1 className='text-left uppercase text-xl font-medium py-5 text-gray-700'>Edit Asset</h1>
                <div className='mb-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 text-white'>
                    <Input value={asset.SerialNumber}
                        onChange={event => setAsset({ ...asset, SerialNumber: event.target.value })}
                        id={'SerialNumber'}
                        label={'Serial Number'}
                        required={true} />
                    <Input value={asset.Make}
                        onChange={event => setAsset({ ...asset, Make: event.target.value })}
                        id={'Make'}
                        label={'Make'}
                        required={true} />
                    <Input value={asset.Model}
                        onChange={event => setAsset({ ...asset, Model: event.target.value })}
                        id={'Model'}
                        label={'Model'}
                        required={true} />
                    <Input value={asset.WarrantyStatus}
                        onChange={event => setAsset({ ...asset, WarrantyStatus: event.target.value })}
                        id={'WarrantyStatus'}
                        label={'Warranty Status'}
                        required={true} />
                    <Input value={asset.AssetStatus}
                        onChange={event => setAsset({ ...asset, AssetStatus: event.target.value })}
                        id={'AssetStatus'}
                        label={'Asset Status'}
                        required={true} />
                    <DatePicker value={asset.PurchaseDate}
                        onChange={event => setAsset({ ...asset, PurchaseDate: event.target.value })}
                        id={'PurchaseDate'}
                        label={'Purchase Date'}
                        required={true} />
                    <Input value={asset.InvoiceNumber}
                        onChange={event => setAsset({ ...asset, InvoiceNumber: event.target.value })}
                        id={'InvoiceNumber'}
                        label={'Invoice Number'}
                        required={true} />
                    <DatePicker value={asset.WarrantyExpirationDate}
                        onChange={event => setAsset({ ...asset, WarrantyExpirationDate: event.target.value })}
                        id={'WarrantyExpirationDate'}
                        label={'Warranty Expiration Date'}
                        required={true} />
                    <Input value={asset.AssetType}
                        onChange={event => setAsset({ ...asset, AssetType: event.target.value })}
                        id={'AssetType'}
                        label={'Asset Type'}
                        required={true} />
                    <Input value={asset.HostName}
                        onChange={event => setAsset({ ...asset, HostName: event.target.value })}
                        id={'HostName'}
                        label={'Host Name'}
                        required={true} />
                    <Input value={asset.RequestNumber}
                        onChange={event => setAsset({ ...asset, RequestNumber: event.target.value })}
                        id={'RequestNumber'}
                        label={'Request Number'}
                        required={true} />
                    <Input value={asset.Age}
                        onChange={event => setAsset({ ...asset, Age: event.target.value })}
                        id={'Age'}
                        label={'Age'}
                        required={true} />
                    <Input value={asset.OperatingSystem}
                        onChange={event => setAsset({ ...asset, OperatingSystem: event.target.value })}
                        id={'OperatingSystem'}
                        label={'Operating System'}
                        required={true} />
                    <Input value={asset.Processor}
                        onChange={event => setAsset({ ...asset, Processor: event.target.value })}
                        id={'Processor'}
                        label={'Processor'}
                        required={true} />
                    <Input value={asset.ClockSpeed}
                        onChange={event => setAsset({ ...asset, ClockSpeed: event.target.value })}
                        id={'ClockSpeed'}
                        label={'Clock Speed'}
                        required={true} />
                    <Input value={asset.RAM}
                        onChange={event => setAsset({ ...asset, RAM: event.target.value })}
                        id={'RAM'}
                        label={'RAM'}
                        required={true} />
                    <Select id="EmployeeId" selectedValue={asset.Employee?.Id}
                        onValueChange={(event) => setAsset({ ...asset, Employee: { Id: event.target.value } })}
                        options={employees} label="Select Assigned To" />
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

export default EditAsset
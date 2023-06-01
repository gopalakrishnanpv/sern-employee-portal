import axios from 'axios';
import { createRef, useState } from "react";
import { FaFileImport, FaStepBackward, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import config from "../../appconfig";
import Button from "../../components/button";
import Notification from "../../components/notification";
import LoadingSpinner from '../../modules/loading-spinner';

function ImportDepartment() {

    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState({});
    const [departments, setDepartments] = useState([]);
    const [message, setMessage] = useState("")
    const fileUploadRef = createRef();
    const [snackbarDisplayed, setSnackbarDisplayed] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()


    const importDepartment = (event) => {
        event.preventDefault()
        setIsLoading(true)
        axios.post(`${config.apiBaseurl}/department/bulkcreate`, departments).then((response) => {
            setMessage(response.data.message)
            setSnackbarDisplayed(true)
            setSelectedFile({})
            setTimeout(function () {
                setSnackbarDisplayed(false)
                navigate('/department')
                setIsLoading(false)
            }, 1500);
        }, (error) => {
            setIsLoading(false)
            setMessage(error.response.data.message)
            setSelectedFile({})
            setSnackbarDisplayed(true)
            setTimeout(function () {
                setSnackbarDisplayed(false)
            }, 1500);
        })
    };

    const handleCancel = () => {
        navigate('/department')
    };

    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            console.log("Dragactive")
        } else if (e.type === "dragleave") {
            setDragActive(false);

        }
    };

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            setSelectedFile(file)
            uploadFile(file)
        }
    };

    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setSelectedFile(file)
            uploadFile(file)

        }
    };

    const uploadFile = (file) => {
        const formData = new FormData();
        formData.append("file", file);
        axios.post(`${config.apiBaseurl}/upload`, formData).then((response) => {
            setDepartments(response.data.data)
        });
    }

    const removeFile = () => {
        setSelectedFile({})
        fileUploadRef.current.value = undefined
    };

    return (
        <div className="w-full h-full">
            {isLoading && <LoadingSpinner />}
            {!isLoading && <div className='w-full h-full px-5'>
                <h1 className='text-center uppercase text-xl font-medium py-3 text-gray-700'>Import Department</h1>
                <form id="form-file-upload"
                    encType="multipart/form-data"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className="block w-full">
                    <div className={`${dragActive ? 'bg-white' : 'bg-gray-200'} h-60 rounded-md border-2 
                    border-gray-500 border-dashed flex items-center justify-items-center`}>
                        <input type="file" ref={fileUploadRef} accept=".xls,.xlsx,.csv" id="input-file-upload" multiple={true} className="hidden" onChange={handleChange} />
                        {!selectedFile.name &&
                            <label id="label-file-upload" htmlFor="input-file-upload"
                                className="flex w-full align-middle items-center justify-center gap-2 text-gray-500 cursor-pointer">
                                <p>
                                    Drag and drop file here, or click to select file.</p>
                            </label>
                        }
                        {selectedFile.name && <label id="label-file-upload" htmlFor="input-file-upload"
                            className="flex w-full flex-col align-middle items-center justify-center gap-2">
                            <p className="text-gray-500">
                                Selected file: {selectedFile.name}</p>

                            <Button
                                type='button'
                                bgcolor='bg-yellow-600'
                                action={removeFile}
                                icon={<FaTrash />}
                                text={'REMOVE'} />
                        </label>
                        }
                        {dragActive &&
                            <div id="drag-file-element"
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}>
                            </div>}
                    </div>
                    <div className="w-full flex gap-2 justify-center p-3">
                        <Button
                            type='submit'
                            action={importDepartment}
                            bgcolor='bg-sky-600'
                            icon={<FaFileImport />}
                            text={'IMPORT'} />
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
        </div >
    )
}
export default ImportDepartment
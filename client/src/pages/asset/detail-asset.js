import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStepBackward } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../appconfig";
import Button from "../../components/button";
import LoadingSpinner from "../../modules/loading-spinner";

function DetailAsset() {
    const [asset, setAsset] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    let params = useParams();
    const [openTab, setOpenTab] = React.useState(1);

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${config.apiBaseurl}/asset/${params.id}`).then((response) => {
            setAsset(response.data)
            setIsLoading(false)
        })

    }, [params])

    const handleCancel = () => {
        navigate('/asset')
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
                        <h1 className='text-left uppercase  text-md font-medium py-5 text-gray-700'>Asset Detail</h1>

                    </div>
                    <div className="flex items-start justify-between w-full h-full">
                        <div className="flex flex-wrap w-full ">
                            <div className="w-full">
                                <div className="flex flex-row break-all w-full h-full">
                                    <div className="flex-auto w-full h-full">
                                        <table class="w-full text-left border-2">
                                            <thead className="">
                                                <tr>
                                                    <th className="text-white border-2 bg-slate-400 p-2 w-1/3">PROPERTY</th>
                                                    <th className="text-white border-2 bg-slate-400 p-2 w-2/3">VALUE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableEntry("SerialNumber", asset.SerialNumber)}
                                                {tableEntry("Make", asset.Make)}
                                                {tableEntry("Model", asset.Model)}
                                                {tableEntry("Warranty Status", asset.WarrantyStatus)}
                                                {tableEntry("Asset Status", asset.AssetStatus)}
                                                {tableEntry("Purchase Date", asset.PurchaseDate)}
                                                {tableEntry("Invoice Number", asset.InvoiceNumber)}
                                                {tableEntry("Warranty Expiration Date", asset.WarrantyExpirationDate)}
                                                {tableEntry("Asset Type", asset.AssetType)}
                                                {tableEntry("Host Name", asset.HostName)}
                                                {tableEntry("Request Number", asset.SerialNumber)}
                                                {tableEntry("Age", asset.Age)}
                                                {tableEntry("Operating System", asset.OperatingSystem)}
                                                {tableEntry("Processor", asset.Processor)}
                                                {tableEntry("Clock Speed", asset.ClockSpeed)}
                                                {tableEntry("RAM", asset.RAM)}
                                                {tableEntry("Clock Speed", asset.ClockSpeed)}
                                                {tableEntry("Assigned To", asset.Employee?.Name)}
                                            </tbody>
                                        </table>
                                        {/* {detailEntry("SerialNumber", asset.SerialNumber)}
                                        {detailEntry("Make", asset.Make)}
                                        {detailEntry("Model", asset.Model)}
                                        {detailEntry("Warranty Status", asset.WarrantyStatus)}
                                        {detailEntry("Asset Status", asset.AssetStatus)}
                                        {detailEntry("Purchase Date", asset.PurchaseDate)}
                                        {detailEntry("Invoice Number", asset.InvoiceNumber)}
                                        {detailEntry("Warranty Expiration Date", asset.WarrantyExpirationDate)}
                                        {detailEntry("Asset Type", asset.AssetType)}
                                        {detailEntry("Host Name", asset.HostName)}
                                        {detailEntry("Request Number", asset.SerialNumber)}
                                        {detailEntry("Age", asset.Age)}
                                        {detailEntry("Operating System", asset.OperatingSystem)}
                                        {detailEntry("Processor", asset.Processor)}
                                        {detailEntry("Clock Speed", asset.ClockSpeed)}
                                        {detailEntry("RAM", asset.RAM)}
                                        {detailEntry("Clock Speed", asset.ClockSpeed)}
                                        {detailEntry("Assigned To", asset.Employee?.Name)} */}
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
                <p className="text-xs uppercase font-medium col-span-2">{labelName}  </p>
                <p className="text-xs uppercase font-medium col-span-1">-</p>
                <p className="text-sm font-normal col-span-3">{labelValue}</p>
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
                            ? `text-slate-600 border-b-4 border-slate-600 bg-slate-600 bg-opacity-10`
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



export default DetailAsset
import axios from "axios";
import { format as formatDate } from 'date-fns';
import React, { useMemo } from 'react';
import config from "../../appconfig";
import DataTable from "../../modules/datatable";

function ListAsset() {
    const url = new URL(
        '/api/asset',
        `${config.baseurl}`,
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: 'Id',
                header: 'ID',
                size: 40
            },
            {
                accessorKey: 'SerialNumber',
                header: 'Serial Number',
                size: 180
            },
            {
                accessorKey: 'AssetStatus',
                header: 'Asset Status',
                size: 80
            },
            {
                accessorKey: 'Employee.Name',
                header: 'Assigned To',
                size: 180
            },
            {
                accessorKey: 'UpdatedAt',
                header: 'Updated On',
                size: 40,
                Cell: ({ cell }) => (
                    <span>{formatDate(new Date(cell.getValue()), 'dd-MM-yyyy hh:mm a')}</span>
                ),
            },
        ],
        [],
    );

    const deleteAsset = async (ids) => {
        return axios.delete(`${config.apiBaseurl}/asset`, { params: { ids: ids } });
    };

    return (
        <div className='w-full h-full'>
            <DataTable
                page={'Asset'}
                isDetailEnabled={true}
                url={url}
                columns={columns}
                deleteRows={deleteAsset} />
        </div >
    )
}

export default ListAsset
import axios from "axios";
import { format as formatDate } from 'date-fns';
import React, { useMemo } from 'react';
import config from "../../appconfig";
import DataTable from "../../modules/datatable";

function ListDepartment() {
    const url = new URL(
        '/api/department',
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
                accessorKey: 'Name',
                header: 'Name',
                size: 180
            },
            {
                accessorKey: 'Employees.length',
                header: 'Size',
                size: 40,
            },
            {
                accessorKey: 'UpdatedAt',
                header: 'UpdatedOn',
                size: 40,
                Cell: ({ cell }) => (
                    <span>{formatDate(new Date(cell.getValue()), 'dd-MM-yyyy hh:mm a')}</span>
                ),
            },
        ],
        [],
    );

    const deleteDepartment = async (ids) => {
        return axios.delete(`${config.apiBaseurl}/department`, { params: { ids: ids } });
    };

    return (
        <div className='w-full h-full'>
            <DataTable
                page={'Department'}
                url={url}
                columns={columns}
                deleteRows={deleteDepartment} />
        </div >
    )
}

export default ListDepartment
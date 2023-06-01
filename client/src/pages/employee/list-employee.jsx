import axios from "axios";
import { format as formatDate } from 'date-fns';
import React, { useMemo } from 'react';
import config from "../../appconfig";
import DataTable from "../../modules/datatable";

function ListEmployee() {
    const url = new URL(
        '/api/employee',
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
                accessorKey: 'EmployeeId',
                header: 'EmployeeId',
                size: 100
            },
            {
                accessorKey: 'UserName',
                header: 'UserName',
                size: 100
            },
            {
                accessorKey: 'Role.Name',
                header: 'Role',
                size: 180
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

    const deleteEmployee = async (ids) => {
        return axios.delete(`${config.apiBaseurl}/employee`, { params: { ids: ids } });
    };

    return (
        <div className='w-full h-full'>
            <DataTable
                page={'Employee'}
                url={url}
                isDetailEnabled={true}
                columns={columns}
                deleteRows={deleteEmployee} />
        </div >
    )
}

export default ListEmployee
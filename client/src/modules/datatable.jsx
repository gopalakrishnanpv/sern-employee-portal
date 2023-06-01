import axios from 'axios';
import { ExportToCsv } from 'export-to-csv';
import MaterialReactTable from 'material-react-table';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaFileExport, FaFileImport, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Button from '../components/button';
import Notification from "../components/notification";
import LoadingSpinner from "./loading-spinner";
function DataTable(props) {
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(true);
    const [rowCount, setRowCount] = useState(0);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [message, setMessage] = useState("")
    const [snackbarDisplayed, setSnackbarDisplayed] = useState(false)
    const navigate = useNavigate();

    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: props.columns.map((c) => c.header),
    };

    const csvExporter = new ExportToCsv(csvOptions);
    const fetchData = () => {
        if (!data.length) {
            setIsLoading(true);
        } else {
            setIsRefetching(true);
        }
        try {
            axios.get(props.url.href).then((response) => {
                setData(response.data);
                setRowCount(response.data.length);
                setIsError(false);
                setIsLoading(false);
                setIsRefetching(false);
            }, (error) => {
                setIsError(true);
                setIsLoading(false)
                setIsRefetching(false);
                return;
            });
        } catch (error) {
            setIsError(true);
            setIsLoading(false)
            setIsRefetching(false);
            return;
        }
    };


    useEffect(() => {
        fetchData()
    }, []
    );


    return (
        <div className='flex flex-col items-stretch h-full'>
            <div className='h-full'>
                {(isLoading || isRefetching) && <LoadingSpinner />}
                {(!isLoading && !isRefetching) &&
                    <div className='h-full'>
                        <h1 className='bg-gray-100 text-center uppercase text-lg p-5 text-slate-600 font-medium'>{props.page} List</h1>
                        <MaterialReactTable
                            positionToolbarAlertBanner={'bottom'}
                            positionPagination={'bottom'}
                            columns={props.columns}
                            data={data}
                            enableTopToolbar={true}
                            enableBottomToolbar={true}
                            enableStickyHeader={true}
                            initialState={{ showColumnFilters: false }}
                            layoutMode={'semantic'}
                            muiToolbarAlertBannerProps={
                                isError
                                    ? {
                                        color: 'error',
                                        children: `Error loading ${props.page} data.`,
                                    }
                                    : undefined
                            }
                            enableDensityToggle={false}
                            onColumnFiltersChange={setColumnFilters}
                            onGlobalFilterChange={setGlobalFilter}
                            onPaginationChange={setPagination}
                            onSortingChange={setSorting}
                            rowCount={rowCount}
                            state={{
                                showSkeletons: false,
                                columnFilters,
                                globalFilter,
                                isLoading,
                                pagination,
                                showAlertBanner: isError,
                                showProgressBars: isRefetching,
                                sorting,
                                density: 'compact'
                            }}
                            enableRowNumbers={false}
                            enableColumnActions={false}
                            enableColumnFilters={true}
                            enablePagination={true}
                            enableSorting={true}
                            enableRowSelection={true}
                            enableSelectAll={true}
                            enableMultiRowSelection={true}
                            muiTablePaginationProps={{
                                rowsPerPageOptions: [5, 10, 25, 50]
                            }}
                            muiLinearProgressProps={({ isTopToolbar }) => ({
                                color: 'primary',
                                sx: {
                                    display: isTopToolbar ? 'none' : 'none', //hide progress bar
                                },
                            })}
                            muiTableBodyRowProps={({ row }) => ({
                                onDoubleClick: (event) => {
                                    if (props.isDetailEnabled) {
                                        navigate(`detail/${row.getValue('Id')}`)
                                    }
                                },
                                sx: {
                                    cursor: 'pointer',
                                },
                            })}
                            renderTopToolbarCustomActions={({ table }) => {
                                const handleAdd = () => {
                                    navigate('create')
                                }

                                const handleEdit = () => {
                                    table.getSelectedRowModel().flatRows.map((row) => {
                                        navigate(`edit/${row.getValue('Id')}`)
                                    });
                                }

                                const handleDelete = () => {
                                    let ids = []
                                    setSnackbarDisplayed(false)
                                    setIsLoading(true)
                                    table.getSelectedRowModel().flatRows.map((row) => {
                                        ids.push(row.getValue('Id'))
                                    });
                                    props.deleteRows(ids.join(",")).then((response) => {
                                        table.resetRowSelection(true)
                                        fetchData()
                                        setIsLoading(false)
                                        setMessage(response.data.message)
                                        setSnackbarDisplayed(true)
                                        setTimeout(function () {
                                            setSnackbarDisplayed(false)
                                        }, 3000);

                                    }, (error) => {
                                        setIsLoading(false)
                                        setMessage(error.response.data.message)
                                        setSnackbarDisplayed(true)
                                        setTimeout(function () {
                                            setSnackbarDisplayed(false)
                                        }, 3000);
                                    })
                                };

                                const handleExportSelectedRows = (rows) => {
                                    csvExporter.generateCsv(rows.map((row) => row.original));
                                };

                                const handleExportAllData = () => {
                                    csvExporter.generateCsv(data);
                                };

                                const handleImport = () => {
                                    navigate('import')
                                }

                                return (
                                    <div className='flex gap-2 items-stretch'>
                                        <Button
                                            bgcolor='bg-sky-600'
                                            action={handleAdd}
                                            icon={<FaPlus />}
                                            text={'ADD'} />
                                        <Button
                                            bgcolor='bg-amber-600'
                                            action={handleEdit}
                                            icon={<FaEdit />}
                                            text={'EDIT'}
                                            disabled={table.getSelectedRowModel().flatRows.length !== 1} />
                                        <Button
                                            bgcolor='bg-red-600'
                                            action={handleDelete}
                                            icon={<FaTrash />}
                                            text={'DELETE'}
                                            disabled={table.getSelectedRowModel().flatRows.length === 0}
                                        />
                                        <Button
                                            bgcolor='bg-teal-600'
                                            action={() => table.getIsSomeRowsSelected() || table.getIsAllRowsSelected() ? handleExportSelectedRows(table.getSelectedRowModel().rows) : handleExportAllData()}
                                            icon={<FaFileExport />}
                                            text={'EXPORT'} />
                                        <Button
                                            bgcolor='bg-violet-600'
                                            action={handleImport}
                                            icon={<FaFileImport />}
                                            text={'IMPORT'} />
                                    </div>
                                );
                            }}
                        />
                    </div>
                }
            </div>
            {
                message && snackbarDisplayed &&
                <Notification message={message} showSnackbar={snackbarDisplayed}
                />
            }
        </div>

    )
}

export default DataTable
import axios from "axios";
import React, { useEffect, useState } from 'react';
import config from "../../appconfig";
import Card from '../../components/card';
import LoadingSpinner from "../../modules/loading-spinner";
import DoughnutChart from "./charts/doughnut-chart";
import VerticalBarChart from "./charts/verticalbar-chart";


function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState([]);
    const [genderData, setGenderData] = useState([]);
    const [genderLabels, setGenderLabels] = useState([]);
    const [bloodGroupData, setBloodGroupData] = useState([]);
    const [bloodGroupLabels, setBloodGroupLabels] = useState([]);
    const [maritalStatusData, setMaritalStatusData] = useState([]);
    const [maritalStatusLabels, setMaritalStatusLabels] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [departmentLabels, setDepartmentLabels] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [roleLabels, setRoleLabels] = useState([]);
    let employees = []

    const fetchData = () => {
        try {
            setIsLoading(true)
            axios.get(`${config.apiBaseurl}/dashboard`).then((response) => {
                let departments = response.data[0]
                let roles = response.data[1]
                employees = response.data[2]
                let assets = response.data[3]

                let dashboardSummary = []
                let department = { title: 'Departments', bgcolor: 'bg-slate-600', count: departments.length ?? 0 }
                dashboardSummary.push(department)
                let role = { title: 'Roles', bgcolor: 'bg-pink-600', count: roles.length ?? 0 }
                dashboardSummary.push(role)
                let employee = { title: 'Employees', bgcolor: 'bg-violet-600', count: employees.length ?? 0 }
                dashboardSummary.push(employee)
                let asset = { title: 'Assets', bgcolor: 'bg-teal-600', count: assets.length ?? 0 }
                dashboardSummary.push(asset)
                setDashboardData(dashboardSummary)
                updateGenderChartData()
                updateBloodGroupChartData()
                updateMaritalStatusChartData()
                updateDepartmentChartData()
                updateRoleChartData()
                setIsLoading(false)
            });
        } catch (error) {
            setIsLoading(false)
            return;
        }
    };

    useEffect(() => {
        fetchData()
    }, []
    );

    const updateGenderChartData = () => {
        let labels = Array.from(new Set(employees.map(employee => employee?.Gender?.Name)))
        let data = []
        for (let label of labels) {
            let count = employees.filter(employee => employee?.Gender?.Name === label).length;
            data.push(count)
        }
        setGenderLabels(labels)
        setGenderData(data)
    }

    const updateBloodGroupChartData = () => {
        let labels = Array.from(new Set(employees.map(employee => employee?.BloodGroup?.Name)))
        let data = []
        for (let label of labels) {
            let count = employees.filter(employee => employee?.BloodGroup?.Name === label).length;
            data.push(count)
        }
        setBloodGroupLabels(labels)
        setBloodGroupData(data)
    }

    const updateMaritalStatusChartData = () => {
        let labels = Array.from(new Set(employees.map(employee => employee?.MaritalStatus?.Name)))
        let data = []
        for (let label of labels) {
            let count = employees.filter(employee => employee?.MaritalStatus?.Name === label).length;
            data.push(count)
        }
        setMaritalStatusLabels(labels)
        setMaritalStatusData(data)
    }


    const updateDepartmentChartData = () => {
        let labels = Array.from(new Set(employees.map(employee => employee?.Role.Department?.Name)))
        let data = []
        for (let label of labels) {
            let count = employees.filter(employee => employee?.Role?.Department?.Name === label).length;
            data.push(count)
        }
        setDepartmentLabels(labels)
        setDepartmentData(data)
    }

    const updateRoleChartData = () => {
        let labels = Array.from(new Set(employees.map(employee => employee?.Role?.Name)))
        let data = []
        for (let label of labels) {
            let count = employees.filter(employee => employee?.Role?.Name === label).length;
            data.push(count)
        }
        setRoleLabels(labels)
        setRoleData(data)
    }


    return (
        <div className='w-full px-3 '>
            <div className='h-full'>
                {isLoading && <LoadingSpinner />}
                {!isLoading &&
                    <div>
                        <h1 className='text-center uppercase text-xl font-medium text-gray-700 p-5'>Summary</h1>
                        <div className='w-full text-center text-3xl uppercase font-semibold text-blue-900'>
                            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 text-white'>
                                {
                                    dashboardData.map((item, index) => (
                                        <Card key={index} bgcolor={item.bgcolor} title={item.title} count={item.count} />
                                    ))

                                }
                            </div>
                        </div>
                        <h1 className='text-center uppercase text-xl font-medium text-gray-700 p-5'>Charts</h1>
                        <div className='flex flex-wrap items-center justify-center'>
                            <div className="w-9/12">
                                <h1 className='text-center uppercase text-md font-medium text-gray-700 py-5'>Based On Department</h1>
                                <VerticalBarChart data={departmentData} labels={departmentLabels} />
                            </div>
                            <div className="w-9/12">
                                <h1 className='text-center uppercase text-md font-medium text-gray-700 py-5'>Based On Role</h1>
                                <VerticalBarChart data={roleData} labels={roleLabels} />
                            </div>
                            <div className="flex flex-wrap items-center justify-center py-10 w-full">
                                <div className="w-5/12">
                                    <h1 className='text-center uppercase text-md font-medium text-gray-700 py-5'>Based On Gender</h1>
                                    <DoughnutChart data={genderData} labels={genderLabels} />
                                </div>
                                <div className="w-5/12">
                                    <h1 className='text-center uppercase text-md font-medium text-gray-700 py-5'>Based On Blood Group</h1>
                                    <DoughnutChart data={bloodGroupData} labels={bloodGroupLabels} />
                                </div>
                                <div className="w-5/12">
                                    <h1 className='text-center uppercase text-md font-medium text-gray-700 py-5'>Based On Marital Status</h1>
                                    <DoughnutChart data={maritalStatusData} labels={maritalStatusLabels} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Dashboard
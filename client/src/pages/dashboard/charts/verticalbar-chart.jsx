import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import React from 'react';
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: "",
        },
        scales: {
            xAxes: [{
                ticks: {
                    display: false,
                    autoSkip: true,
                    maxRotation: 90,
                    minRotation: 90
                }
            }]
        }
    },
};


function VerticalBarChart(props) {


    const labels = props.labels
    const data = {
        labels: labels,
        datasets: [
            {
                indexAxis: 'y',
                label: "",
                data: props.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(213, 111, 62, 0.7)',
                    'rgba(171, 199, 152, 0.7)',
                    'rgba(0, 70, 67, 0.7)',
                    'rgba(187, 229, 237, 0.7)',
                    'rgba(155, 167, 192, 0.7)'
                ],
                borderColor: [
                ],
                borderWidth: 0,
            },
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
}

export default VerticalBarChart
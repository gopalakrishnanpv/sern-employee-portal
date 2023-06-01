import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from 'react';
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart(props) {

    const data = {
        labels: props.labels,
        datasets: [
            {
                label: 'Gender',
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
                borderWidth: 0
            },
        ],
    };


    const options = {
        plugins: {
            legend: {
                labels: {
                    generateLabels(chart) {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            const { labels: { pointStyle } } = chart.legend.options;

                            return data.labels.map((label, i) => {
                                const meta = chart.getDatasetMeta(0);
                                const style = meta.controller.getStyle(i);

                                return {
                                    text: `${label} (${data['datasets'][0].data[i]})`,
                                    fillStyle: style.backgroundColor,
                                    strokeStyle: style.borderColor,
                                    lineWidth: style.borderWidth,
                                    pointStyle: pointStyle,
                                    hidden: !chart.getDataVisibility(i),
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                },

                onClick(e, legendItem, legend) {
                    legend.chart.toggleDataVisibility(legendItem.index);
                    legend.chart.update();
                }
            }
        }
    }

    return (
        <Doughnut data={data} options={options} />
    )
}

export default DoughnutChart
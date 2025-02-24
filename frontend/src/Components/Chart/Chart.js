import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../../Context/globalContext';
import { dateFormat } from '../../Utils/dateFormat';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function Chart() {
    const { incomes = [], expenses = [] } = useGlobalContext();

    const data = {
        labels: incomes.map(inc => dateFormat(inc.date)),
        datasets: [
            {
                label: 'Income',
                data: incomes.map(income => income.amount),
                borderColor: '#10B981', // Green
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#10B981',
                pointBorderColor: '#10B981',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#10B981',
                pointRadius: 4,
                pointHoverRadius: 6,
            },
            {
                label: 'Expenses',
                data: expenses.map(expense => expense.amount),
                borderColor: '#EF4444', // Red
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#EF4444',
                pointBorderColor: '#EF4444',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#EF4444',
                pointRadius: 4,
                pointHoverRadius: 6,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#fff',
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif"
                    },
                    usePointStyle: true,
                    padding: 20,
                }
            },
            tooltip: {
                backgroundColor: '#1F2937',
                titleColor: '#fff',
                bodyColor: '#fff',
                bodyFont: {
                    size: 13
                },
                titleFont: {
                    size: 13
                },
                padding: 12,
                borderColor: '#374151',
                borderWidth: 1,
                displayColors: true,
                usePointStyle: true,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ₹${context.parsed.y}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#9CA3AF',
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(75, 85, 99, 0.2)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#9CA3AF',
                    font: {
                        size: 11
                    },
                    callback: function(value) {
                        return '₹' + value;
                    }
                }
            }
        }
    };

    return (
        <div className="w-full h-full">
            <Line data={data} options={options} />
        </div>
    );
}


export default Chart;

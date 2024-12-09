import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DoughnutChartProps {
    data: { label: string; value: number }[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
    const labels = data.map((item) => item.label);
    const values = data.map((item) => item.value);

    const chartData = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: [
                    '#7bd63c', // Color para el primer segmento
                    '#d63c3c', // Color para el segundo segmento
                    '#FFCE56', // Color para el tercero
                    '#4BC0C0', // Color adicional
                    '#9966FF',
                ],
                hoverBackgroundColor: [
                    '#149d03',
                    '#9d0303',
                    '#FFCE56CC',
                    '#4BC0C0CC',
                    '#9966FFCC',
                ],
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        size: 20,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg" style={{ margin: '0 auto' }}>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default DoughnutChart;

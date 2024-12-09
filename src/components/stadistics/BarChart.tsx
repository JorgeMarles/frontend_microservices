import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


interface BarChartProps {
    data: { name: string; total?: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const labels = data.map(item => item.name);
    const totals = data.map(item => item.total);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: '#Problems Solved',
                data: totals,
                backgroundColor: '#ffe44a',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 2,
                hoverBackgroundColor: '#d6bf3c'
            },
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Problems Solved by Topic',
                font: {
                    size: 20,
                },
            },
            legend: {
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, 
                },
                ticks: {
                    font: {
                        weight: 700, //Bold
                        size: 14,
                    },
                },
            },
            y: {
                grid: {
                    display: true,
                    lineWidth: 1,
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };
    

    return (
        <div className="">
            <div className='text-lg'>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default BarChart;

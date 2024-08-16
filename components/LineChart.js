import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement,
    Legend,
    Tooltip,
    Filler,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Filler
);

const values = [
    { time: "0", temp: 20 },
    { time: "2", temp: 21 },
    { time: "4", temp: 22 },
    { time: "6", temp: 23 },
    { time: "8", temp: 24 },
    { time: "10", temp: 30 },
    { time: "12", temp: 10 },
    { time: "14", temp: 19 },
    { time: "16", temp: 18 },
    { time: "18", temp: 16 },
    { time: "20", temp: 22 },
    { time: "22", temp: 25 },
    { time: "24", temp: 34 },
];

const LineChart = (props) => {
    const chartColor = props.category === "Temperature" ? "#179299" : "#DF8E1D";

    const temp = props.dataArray;


    const data = {
        labels: values.map((data) => data.time),
        datasets: [
            {
                label: "°C",
                data: values.map((data) => data.temp),
                borderColor: chartColor,
                borderWidth: 3,
                pointBorderColor: chartColor,
                pointBorderWidth: 3,
                tension: 0.1,
                fill: true,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, chartColor);
                    gradient.addColorStop(1, "white");
                    return gradient;
                },
            },
        ],
    };

    const options = {
        plugins: {
            legend: false,
        },
        responsive: true,
        scales: {
            y: {
                ticks: {
                    font: {
                        size: 17,
                        weight: "bold",
                    },
                },
                title: {
                    display: true,
                    padding: {
                        bottom: 10,
                    },
                    font: {
                        size: 30,
                        style: "italic",
                        family: "Arial",
                    },
                },
                min: 0,
                max: 50,
            },
            x: {
                ticks: {
                    font: {
                        size: 17,
                        weight: "bold",
                    },
                },
                title: {
                    display: true,
                    text: props.category,
                    color: chartColor,
                    padding: {
                        top: 10,
                    },
                    font: {
                        size: 30,
                        style: "italic",
                        family: "Arial",
                    },
                },
            },
        },
    };

    return (
        <div>
            <div
                style={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#DCE0E8",
                }}
            >
                <Line data={data} options={options}></Line>
            </div>
        </div >
    );
}

export default LineChart;
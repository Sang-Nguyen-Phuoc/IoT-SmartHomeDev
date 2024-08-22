import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement,
    Legend,
    Filler,
    Tooltip,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Filler,
    Tooltip
);

const LineChart = ({ dataArray, category }) => {
    const chartColor = category === "Temperature" ? "#179299" : "#DF8E1D";

    const values = dataArray && dataArray.map((data) => ({
        time: data.time,
        val: data.value,
    }));
    const maxVal = category === "Temperature" ? (Math.floor(Math.max(...values.map((data) => data.val)) * 1.1)) : (Math.floor(Math.max(...values.map((data) => data.val)) * 1.05));

    const data = {
        labels: values && values.map((data) => data.time),
        datasets: [
            {
                label: category === "Temperature" ? "Temperature (°C)" : "Humidity (%)",
                data: values && values.map((data) => data.val),
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
        responsive: true,
        scales: {
            y: {
                ticks: {
                    font: {
                        size: 14,
                        weight: "bold",
                    },
                },
                title: {
                    display: true,
                    text: category === "Temperature" ? "Celcius (°C)" : "Lux (lx)",
                    padding: {
                        bottom: 10,
                    },
                    font: {
                        size: 20,
                        style: "italic",
                        family: '"Fira Code Nerd Font", monospace',
                    },
                },
                min: 0,
                max: maxVal,
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
                    text: "Past 10 days",
                    padding: {
                        top: 10,
                    },
                    font: {
                        size: 30,
                        style: "italic",
                        family: '"Fira Code Nerd Font", monospace',
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
        </div>
    );
};

export default LineChart;

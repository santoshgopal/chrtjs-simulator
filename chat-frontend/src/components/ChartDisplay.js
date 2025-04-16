// src/components/ChartDisplay.js
import { Chart, registerables } from 'chart.js';
import React, { useEffect, useRef } from 'react';

Chart.register(...registerables);

const ChartDisplay = ({ chartConfig }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let chartInstance;
        if (canvasRef.current) {
            chartInstance = new Chart(canvasRef.current, chartConfig);
        }
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [chartConfig]);

    return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg">
            <canvas ref={canvasRef} />
        </div>
    );
};

export default ChartDisplay;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  labels: string[];
  data: number[];
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ labels, data, title }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: title,
              data,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: title },
          },
        }}
      />
    </div>
  );
};

export default BarChart;

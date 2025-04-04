import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Select } from '../ui/Select';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ entries = [], title = 'Category Distribution' }) {
  const [entryType, setEntryType] = useState('food');
  
  const prepareData = () => {
    // Filter by type
    const filteredEntries = entries.filter(entry => entry.type === entryType);
    
    // Count by category
    const categoryCounts = filteredEntries.reduce((acc, entry) => {
      const category = entry.category;
      
      if (!acc[category]) {
        acc[category] = 0;
      }
      
      acc[category] += 1;
      return acc;
    }, {});
    
    const labels = Object.keys(categoryCounts);
    const values = labels.map(label => categoryCounts[label]);
    
    return { labels, values };
  };
  
  const { labels, values } = prepareData();
  
  // Generate color shades
  const generateColors = (count) => {
    const baseColor = [53, 162, 235]; // Blue
    return Array.from({ length: count }, (_, i) => {
      const opacity = 0.5 + (i / count) * 0.5;
      return `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity})`;
    });
  };
  
  const chartData = {
    labels,
    datasets: [
      {
        label: `${entryType.charAt(0).toUpperCase() + entryType.slice(1)} Distribution`,
        data: values,
        backgroundColor: generateColors(labels.length),
        borderWidth: 1
      }
    ]
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="w-40">
          <Select
            value={entryType}
            onChange={(e) => setEntryType(e.target.value)}
            options={[
              { value: 'food', label: 'Food' },
              { value: 'medicine', label: 'Medicine' },
              { value: 'activity', label: 'Activity' },
              { value: 'therapy', label: 'Therapy' },
              { value: 'behavior', label: 'Behavior' },
              { value: 'progress', label: 'Progress' },
            ]}
          />
        </div>
      </div>
      
      {labels.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          No data available for the selected type
        </div>
      )}
    </div>
  );
}
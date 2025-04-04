import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Select } from '../ui/Select';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ entries = [], title = 'Data Visualization' }) {
  const [timeFrame, setTimeFrame] = useState('week');
  const [entryType, setEntryType] = useState('progress');
  
  const filterAndPrepareData = () => {
    // Filter by type
    const filteredEntries = entries.filter(entry => entry.type === entryType);
    
    // Determine date range based on timeFrame
    const now = new Date();
    let startDate = new Date();
    
    switch(timeFrame) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }
    
    // Filter by date range
    const dateFilteredEntries = filteredEntries.filter(entry => 
      new Date(entry.timestamp) >= startDate && 
      new Date(entry.timestamp) <= now
    );
    
    // Group by date
    const groupedData = dateFilteredEntries.reduce((acc, entry) => {
      const date = new Date(entry.timestamp).toLocaleDateString();
      
      if (!acc[date]) {
        acc[date] = [];
      }
      
      acc[date].push(entry);
      return acc;
    }, {});
    
    // Calculate average value per day for progress entries
    const labels = [];
    const values = [];
    
    Object.keys(groupedData)
      .sort((a, b) => new Date(a) - new Date(b))
      .forEach(date => {
        labels.push(date);
        
        if (entryType === 'progress') {
          // Calculate average progress value
          const sum = groupedData[date].reduce((acc, entry) => 
            acc + parseFloat(entry.value || 0), 0
          );
          values.push(sum / groupedData[date].length);
        } else {
          // Count occurrences for other types
          values.push(groupedData[date].length);
        }
      });
      
    return { labels, values };
  };
  
  const { labels, values } = filterAndPrepareData();
  
  const chartData = {
    labels,
    datasets: [
      {
        label: entryType === 'progress' ? 'Average Progress' : `${entryType} Entries`,
        data: values,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1
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
        beginAtZero: entryType !== 'progress',
      }
    }
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex space-x-2">
          <div className="w-32">
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
          <div className="w-32">
            <Select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              options={[
                { value: 'week', label: 'Week' },
                { value: 'month', label: 'Month' },
                { value: 'quarter', label: 'Quarter' },
                { value: 'year', label: 'Year' },
              ]}
            />
          </div>
        </div>
      </div>
      
      {labels.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          No data available for the selected filters
        </div>
      )}
    </div>
  );
}
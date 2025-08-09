import React, { useEffect, useState } from 'react';
import getSocket from '../components/AI/socket';
import BarChart from '../components/AI/AIAnalyticsChart';

interface RealTimeAnalytics {
  timestamp: string;
  activeUsers: number;
  newSignups: number;
  avgSessionTime: number;
  aiPrediction: string;
  topCourses: { name: string; completionRate: number }[];
}

const RealTimeAIDashboard: React.FC = () => {
  const [data, setData] = useState<RealTimeAnalytics | null>(null);
  const [history, setHistory] = useState<RealTimeAnalytics[]>([]);

  useEffect(() => {
    const socket = getSocket();
    socket.on('ai-analytics-update', (payload: RealTimeAnalytics) => {
      setData(payload);
      setHistory((prev) => [...prev.slice(-19), payload]);
    });
    return () => { socket.off('ai-analytics-update'); };
  }, []);

  return (
    <div className="ai-dashboard-container">
      <h2>Real-Time AI Analytics Dashboard</h2>
      {data ? (
        <>
          <div className="dashboard-metrics">
            <div className="metric-card">
              <h4>Active Users</h4>
              <p>{data.activeUsers}</p>
            </div>
            <div className="metric-card">
              <h4>New Signups</h4>
              <p>{data.newSignups}</p>
            </div>
            <div className="metric-card">
              <h4>Avg Session Time</h4>
              <p>{data.avgSessionTime} min</p>
            </div>
            <div className="metric-card">
              <h4>AI Prediction</h4>
              <p>{data.aiPrediction}</p>
            </div>
          </div>
          <div className="dashboard-charts">
            <BarChart
              labels={data.topCourses.map(c => c.name)}
              data={data.topCourses.map(c => c.completionRate)}
              title="Top Courses Completion Rate (%)"
            />
            <BarChart
              labels={history.map(h => h.timestamp)}
              data={history.map(h => h.activeUsers)}
              title="Active Users Over Time"
            />
          </div>
        </>
      ) : (
        <p>Waiting for real-time analytics...</p>
      )}
    </div>
  );
};

export default RealTimeAIDashboard;

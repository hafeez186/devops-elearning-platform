import React, { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  Speed as CpuIcon
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SystemMetrics, SystemInfo, SystemAlert } from '../types/monitoring';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

const SOCKET_URL = process.env.REACT_APP_SERVER_URL || 'https://devops-elearning-backend.onrender.com';
const MAX_METRICS_DISPLAY = 20; // Show last 20 data points in chart

export const MonitoringDashboard: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [metrics, setMetrics] = useState<SystemMetrics[]>([]);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Initialize socket connection
  useEffect(() => {
    const socketConnection = io(SOCKET_URL);
    
    socketConnection.on('connect', () => {
      setIsConnected(true);
      console.log('🔌 Connected to monitoring server');
    });

    socketConnection.on('disconnect', () => {
      setIsConnected(false);
      console.log('🔌 Disconnected from monitoring server');
    });

    socketConnection.on('system-metrics', (newMetrics: SystemMetrics) => {
      setMetrics(prev => {
        const updated = [...prev, { ...newMetrics, timestamp: new Date(newMetrics.timestamp) }];
        return updated.slice(-MAX_METRICS_DISPLAY); // Keep only last N metrics
      });
      setLastUpdate(new Date());
    });

    socketConnection.on('system-info', (info: SystemInfo) => {
      setSystemInfo(info);
    });

    socketConnection.on('metrics-history', (history: SystemMetrics[]) => {
      const formattedHistory = history.map(m => ({
        ...m,
        timestamp: new Date(m.timestamp)
      }));
      setMetrics(formattedHistory.slice(-MAX_METRICS_DISPLAY));
    });

    socketConnection.on('system-alerts', (newAlerts: SystemAlert[]) => {
      setAlerts(newAlerts);
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  // Manual refresh function
  const handleRefresh = useCallback(() => {
    if (socket && socket.connected) {
      socket.emit('get-current-metrics');
      socket.emit('get-metrics-history');
    }
  }, [socket]);

  // Format bytes to human readable
  const formatBytes = (bytes: number): string => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  };

  // Format uptime
  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Chart data preparation
  const chartData = {
    labels: metrics.map(m => new Date(m.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: metrics.map(m => m.cpu),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Memory Usage (%)',
        data: metrics.map(m => m.memory.percentage),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Disk Usage (%)',
        data: metrics.map(m => m.disk.percentage),
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'System Performance Metrics'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: any) => `${value}%`
        }
      },
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time'
        }
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    }
  };

  const currentMetrics = metrics.length > 0 ? metrics[metrics.length - 1] : null;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          🔍 System Monitoring Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControlLabel
            control={
              <Switch
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                color="primary"
              />
            }
            label="Auto Refresh"
          />
          <Tooltip title="Refresh Now">
            <IconButton onClick={handleRefresh} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton color="primary">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Connection Status */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Alert 
            severity={isConnected ? "success" : "error"} 
            icon={isConnected ? <CheckIcon /> : <WarningIcon />}
            sx={{ mb: 2 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span>
                {isConnected ? "🟢 Live Monitoring Active" : "🔴 Disconnected from Monitoring Server"}
              </span>
              {lastUpdate && (
                <Chip 
                  label={`Last Update: ${lastUpdate.toLocaleTimeString()}`} 
                  size="small" 
                  variant="outlined"
                />
              )}
            </Box>
          </Alert>
        </Grid>

        {/* System Alerts */}
        {alerts.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningIcon color="warning" />
                System Alerts
              </Typography>
              {alerts.map((alert, index) => (
                <Alert key={index} severity="warning" sx={{ mb: 1 }}>
                  <strong>{alert.message}</strong>
                  <br />
                  Current: {alert.value.toFixed(1)}% | Threshold: {alert.threshold}%
                </Alert>
              ))}
            </Paper>
          </Grid>
        )}

        {/* Current Metrics Cards */}
        {currentMetrics && (
          <>
            <Grid item xs={12} md={4}>
              <MetricCard
                title="CPU Usage"
                value={currentMetrics.cpu}
                unit="%"
                icon={<CpuIcon />}
                color={currentMetrics.cpu > 80 ? "error" : currentMetrics.cpu > 60 ? "warning" : "success"}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MetricCard
                title="Memory Usage"
                value={currentMetrics.memory.percentage}
                unit="%"
                icon={<MemoryIcon />}
                color={currentMetrics.memory.percentage > 85 ? "error" : currentMetrics.memory.percentage > 70 ? "warning" : "success"}
                subtitle={`${formatBytes(currentMetrics.memory.used)} / ${formatBytes(currentMetrics.memory.total)}`}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MetricCard
                title="Disk Usage"
                value={currentMetrics.disk.percentage}
                unit="%"
                icon={<StorageIcon />}
                color={currentMetrics.disk.percentage > 90 ? "error" : currentMetrics.disk.percentage > 80 ? "warning" : "success"}
                subtitle={`${formatBytes(currentMetrics.disk.used)} / ${formatBytes(currentMetrics.disk.total)}`}
              />
            </Grid>
          </>
        )}

        {/* Performance Chart */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Real-time Performance Metrics
            </Typography>
            {metrics.length > 0 ? (
              <Box sx={{ height: 320 }}>
                <Line data={chartData} options={chartOptions} />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 320 }}>
                <Typography color="text.secondary">
                  Waiting for metrics data...
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* System Information */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 2, height: 400, overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              System Information
            </Typography>
            {systemInfo ? (
              <Box>
                <InfoSection title="Operating System">
                  <InfoItem label="Platform" value={systemInfo.os.platform} />
                  <InfoItem label="Distribution" value={systemInfo.os.distro} />
                  <InfoItem label="Release" value={systemInfo.os.release} />
                  <InfoItem label="Hostname" value={systemInfo.os.hostname} />
                  <InfoItem label="Uptime" value={formatUptime(systemInfo.os.uptime)} />
                </InfoSection>
                
                <InfoSection title="CPU">
                  <InfoItem label="Brand" value={systemInfo.cpu.brand} />
                  <InfoItem label="Cores" value={`${systemInfo.cpu.cores} (${systemInfo.cpu.physicalCores} physical)`} />
                  <InfoItem label="Speed" value={`${systemInfo.cpu.speed} GHz`} />
                </InfoSection>
                
                <InfoSection title="Memory">
                  <InfoItem label="Total" value={`${systemInfo.memory.totalGB} GB`} />
                </InfoSection>

                {currentMetrics && (
                  <InfoSection title="Current Status">
                    <InfoItem label="Processes" value={currentMetrics.processes.toString()} />
                    <InfoItem label="Uptime" value={formatUptime(currentMetrics.uptime)} />
                  </InfoSection>
                )}
              </Box>
            ) : (
              <Typography color="text.secondary">
                Loading system information...
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  icon: React.ReactNode;
  color: "success" | "warning" | "error";
  subtitle?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit = "", icon, color, subtitle }) => {
  const getColorCode = (color: string) => {
    switch (color) {
      case 'success': return '#4caf50';
      case 'warning': return '#ff9800';
      case 'error': return '#f44336';
      default: return '#2196f3';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography color="text.secondary" gutterBottom variant="h6">
            {title}
          </Typography>
          <Box sx={{ color: getColorCode(color) }}>
            {icon}
          </Box>
        </Box>
        <Typography variant="h4" component="div" sx={{ color: getColorCode(color), mb: 1 }}>
          {value.toFixed(1)}{unit}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={Math.min(value, 100)}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: getColorCode(color),
              borderRadius: 4,
            }
          }}
        />
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

// System Info Components
interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, children }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
    <Typography variant="body2" color="text.secondary">
      {label}:
    </Typography>
    <Typography variant="body2">
      {value}
    </Typography>
  </Box>
);

export default MonitoringDashboard;

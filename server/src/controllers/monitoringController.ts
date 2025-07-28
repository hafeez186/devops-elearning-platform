import { Request, Response } from 'express';
import { MonitoringService } from '../services/MonitoringService';

// Note: In a real app, you'd inject this dependency properly
let monitoringServiceInstance: MonitoringService;

export const setMonitoringService = (service: MonitoringService) => {
  monitoringServiceInstance = service;
};

export const getCurrentMetrics = async (_req: Request, res: Response): Promise<void> => {
  try {
    if (!monitoringServiceInstance) {
      res.status(500).json({ error: 'Monitoring service not initialized' });
      return;
    }

    const metrics = await monitoringServiceInstance.getCurrentMetrics();
    res.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting current metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get current metrics'
    });
  }
};

export const getMetricsHistory = (req: Request, res: Response): void => {
  try {
    if (!monitoringServiceInstance) {
      res.status(500).json({ error: 'Monitoring service not initialized' });
      return;
    }

    const { limit = 50 } = req.query;
    const count = Math.min(parseInt(limit as string) || 50, 100); // Max 100 records
    
    const history = monitoringServiceInstance.getLatestMetrics(count);
    res.json({
      success: true,
      data: history,
      count: history.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting metrics history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get metrics history'
    });
  }
};

export const getSystemInfo = async (_req: Request, res: Response): Promise<void> => {
  try {
    if (!monitoringServiceInstance) {
      res.status(500).json({ error: 'Monitoring service not initialized' });
      return;
    }

    const systemInfo = await monitoringServiceInstance.getSystemInfo();
    res.json({
      success: true,
      data: systemInfo,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting system info:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get system info'
    });
  }
};

export const updateAlertThresholds = (req: Request, res: Response): void => {
  try {
    if (!monitoringServiceInstance) {
      res.status(500).json({ error: 'Monitoring service not initialized' });
      return;
    }

    const { cpu, memory, disk } = req.body;
    
    // Validate thresholds
    if (cpu && (cpu < 0 || cpu > 100)) {
      res.status(400).json({ error: 'CPU threshold must be between 0 and 100' });
      return;
    }
    if (memory && (memory < 0 || memory > 100)) {
      res.status(400).json({ error: 'Memory threshold must be between 0 and 100' });
      return;
    }
    if (disk && (disk < 0 || disk > 100)) {
      res.status(400).json({ error: 'Disk threshold must be between 0 and 100' });
      return;
    }

    const thresholds = { cpu, memory, disk };
    monitoringServiceInstance.updateAlertThresholds(thresholds);
    
    res.json({
      success: true,
      message: 'Alert thresholds updated successfully',
      data: thresholds,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating alert thresholds:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update alert thresholds'
    });
  }
};

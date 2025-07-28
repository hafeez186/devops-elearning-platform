import { EventEmitter } from 'events';
import si from 'systeminformation';

export interface SystemMetrics {
  timestamp: Date;
  cpu: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  disk: {
    used: number;
    total: number;
    percentage: number;
  };
  network: {
    rx: number;
    tx: number;
  };
  processes: number;
  uptime: number;
  loadAverage: number[];
}

export interface AlertThreshold {
  cpu: number;
  memory: number;
  disk: number;
}

export class MonitoringService extends EventEmitter {
  private intervalId: NodeJS.Timeout | null = null;
  private metricsHistory: SystemMetrics[] = [];
  private readonly maxHistoryLength = 100; // Keep last 100 metrics
  private readonly alertThresholds: AlertThreshold = {
    cpu: 80,
    memory: 85,
    disk: 90
  };

  constructor() {
    super();
  }

  /**
   * Start collecting system metrics at specified interval
   */
  start(intervalMs: number = 30000) {
    if (this.intervalId) {
      console.log('Monitoring service is already running');
      return;
    }

    console.log(`🔍 Starting monitoring service with ${intervalMs}ms interval`);
    
    // Collect initial metrics
    this.collectMetrics();
    
    // Set up interval for continuous monitoring
    this.intervalId = setInterval(() => {
      this.collectMetrics();
    }, intervalMs);
  }

  /**
   * Stop monitoring service
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('🛑 Monitoring service stopped');
    }
  }

  /**
   * Get current system metrics
   */
  async getCurrentMetrics(): Promise<SystemMetrics> {
    return await this.collectMetrics();
  }

  /**
   * Get metrics history
   */
  getMetricsHistory(): SystemMetrics[] {
    return [...this.metricsHistory];
  }

  /**
   * Get latest N metrics
   */
  getLatestMetrics(count: number = 10): SystemMetrics[] {
    return this.metricsHistory.slice(-count);
  }

  /**
   * Collect system metrics
   */
  private async collectMetrics(): Promise<SystemMetrics> {
    try {
      const [cpu, memory, disk, network, processes] = await Promise.all([
        si.currentLoad(),
        si.mem(),
        si.fsSize(),
        si.networkStats(),
        si.processes()
      ]);

      const metrics: SystemMetrics = {
        timestamp: new Date(),
        cpu: Math.round(cpu.currentLoad * 100) / 100,
        memory: {
          used: memory.used,
          total: memory.total,
          percentage: Math.round((memory.used / memory.total) * 100 * 100) / 100
        },
        disk: {
          used: disk[0]?.used || 0,
          total: disk[0]?.size || 0,
          percentage: disk[0] ? Math.round((disk[0].used / disk[0].size) * 100 * 100) / 100 : 0
        },
        network: {
          rx: network[0]?.rx_bytes || 0,
          tx: network[0]?.tx_bytes || 0
        },
        processes: processes.all,
        uptime: Date.now() / 1000, // System uptime in seconds
        loadAverage: [0, 0, 0] // Placeholder for load average
      };

      // Add to history
      this.addToHistory(metrics);

      // Check for alerts
      this.checkAlerts(metrics);

      // Emit metrics for real-time updates
      this.emit('metrics', metrics);

      return metrics;
    } catch (error) {
      console.error('❌ Error collecting system metrics:', error);
      throw error;
    }
  }

  /**
   * Add metrics to history with size limit
   */
  private addToHistory(metrics: SystemMetrics) {
    this.metricsHistory.push(metrics);
    
    // Keep only the last N metrics
    if (this.metricsHistory.length > this.maxHistoryLength) {
      this.metricsHistory = this.metricsHistory.slice(-this.maxHistoryLength);
    }
  }

  /**
   * Check if metrics exceed alert thresholds
   */
  private checkAlerts(metrics: SystemMetrics) {
    const alerts: Array<{type: string, message: string, value: number, threshold: number}> = [];

    if (metrics.cpu > this.alertThresholds.cpu) {
      alerts.push({
        type: 'cpu',
        message: `High CPU usage detected`,
        value: metrics.cpu,
        threshold: this.alertThresholds.cpu
      });
    }

    if (metrics.memory.percentage > this.alertThresholds.memory) {
      alerts.push({
        type: 'memory',
        message: `High memory usage detected`,
        value: metrics.memory.percentage,
        threshold: this.alertThresholds.memory
      });
    }

    if (metrics.disk.percentage > this.alertThresholds.disk) {
      alerts.push({
        type: 'disk',
        message: `High disk usage detected`,
        value: metrics.disk.percentage,
        threshold: this.alertThresholds.disk
      });
    }

    if (alerts.length > 0) {
      this.emit('alerts', alerts);
    }
  }

  /**
   * Update alert thresholds
   */
  updateAlertThresholds(thresholds: Partial<AlertThreshold>) {
    Object.assign(this.alertThresholds, thresholds);
    console.log('📊 Alert thresholds updated:', this.alertThresholds);
  }

  /**
   * Get system information summary
   */
  async getSystemInfo() {
    try {
      const [osInfo, cpu, memory] = await Promise.all([
        si.osInfo(),
        si.cpu(),
        si.mem()
      ]);

      return {
        os: {
          platform: osInfo.platform,
          distro: osInfo.distro,
          release: osInfo.release,
          hostname: osInfo.hostname,
          uptime: process.uptime() // Use process uptime instead
        },
        cpu: {
          manufacturer: cpu.manufacturer,
          brand: cpu.brand,
          cores: cpu.cores,
          physicalCores: cpu.physicalCores,
          speed: cpu.speed
        },
        memory: {
          total: memory.total,
          totalGB: Math.round(memory.total / (1024 ** 3) * 100) / 100
        }
      };
    } catch (error) {
      console.error('❌ Error getting system info:', error);
      return null;
    }
  }
}

// System monitoring types
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

export interface SystemInfo {
  os: {
    platform: string;
    distro: string;
    release: string;
    hostname: string;
    uptime: number;
  };
  cpu: {
    manufacturer: string;
    brand: string;
    cores: number;
    physicalCores: number;
    speed: number;
  };
  memory: {
    total: number;
    totalGB: number;
  };
}

export interface SystemAlert {
  type: string;
  message: string;
  value: number;
  threshold: number;
}

export interface AlertThreshold {
  cpu: number;
  memory: number;
  disk: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
  timestamp: string;
}

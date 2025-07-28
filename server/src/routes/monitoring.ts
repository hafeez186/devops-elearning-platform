import { Router } from 'express';
import {
  getCurrentMetrics,
  getMetricsHistory,
  getSystemInfo,
  updateAlertThresholds
} from '../controllers/monitoringController';

const router = Router();

/**
 * @route   GET /api/monitoring/metrics/current
 * @desc    Get current system metrics
 * @access  Public (you may want to add auth later)
 */
router.get('/metrics/current', getCurrentMetrics);

/**
 * @route   GET /api/monitoring/metrics/history
 * @desc    Get metrics history
 * @access  Public
 */
router.get('/metrics/history', getMetricsHistory);

/**
 * @route   GET /api/monitoring/system-info
 * @desc    Get system information
 * @access  Public
 */
router.get('/system-info', getSystemInfo);

/**
 * @route   POST /api/monitoring/alert-thresholds
 * @desc    Update alert thresholds
 * @access  Public
 */
router.post('/alert-thresholds', updateAlertThresholds);

export default router;

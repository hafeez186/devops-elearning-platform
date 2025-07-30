import React, { useState, useEffect } from 'react';
import './AIAnalytics.css';

interface AnalyticsData {
  userEngagement: {
    totalUsers: number;
    activeUsers: number;
    completionRate: number;
    averageSessionTime: number;
  };
  coursePerformance: {
    topCourses: Array<{
      name: string;
      completionRate: number;
      rating: number;
    }>;
    strugglingAreas: Array<{
      topic: string;
      failureRate: number;
    }>;
  };
  learningTrends: {
    popularTopics: string[];
    peakLearningHours: string[];
    preferredLearningMethods: Array<{
      method: string;
      percentage: number;
    }>;
  };
  predictions: {
    nextWeekSignups: number;
    courseCompletionForecast: number;
    churnRisk: Array<{
      userId: string;
      risk: number;
    }>;
  };
}

const AIAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ai/analytics');
      const data = await response.json();

      if (data.success) {
        setAnalyticsData(data.analytics);
      } else {
        throw new Error(data.error || 'Failed to fetch analytics');
      }
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ai-analytics-loading">
        <div className="loading-spinner"></div>
        <p>Loading AI Analytics...</p>
      </div>
    );
  }

  if (error || !analyticsData) {
    return (
      <div className="ai-analytics-error">
        <h3>Error Loading Analytics</h3>
        <p>{error}</p>
        <button onClick={fetchAnalytics} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="ai-analytics-container">
      <div>
        <div className="analytics-header">
          <h2>AI-Powered Learning Analytics</h2>
          <p>Intelligent insights to optimize your learning platform</p>
        </div>

        <div className="analytics-grid">
          {/* User Engagement Metrics */}
          <div className="analytics-card">
            <div className="card-header">
              <h3>User Engagement</h3>
              <div className="metric-icon engagement-icon">📊</div>
            </div>
            <div className="metrics-grid">
              <div className="metric">
                <span className="metric-value">{analyticsData.userEngagement.totalUsers}</span>
                <span className="metric-label">Total Users</span>
              </div>
              <div className="metric">
                <span className="metric-value">{analyticsData.userEngagement.activeUsers}</span>
                <span className="metric-label">Active Users</span>
              </div>
              <div className="metric">
                <span className="metric-value">{analyticsData.userEngagement.completionRate}%</span>
                <span className="metric-label">Completion Rate</span>
              </div>
              <div className="metric">
                <span className="metric-value">{analyticsData.userEngagement.averageSessionTime}m</span>
                <span className="metric-label">Avg Session Time</span>
              </div>
            </div>
          </div>

          {/* Course Performance */}
          <div className="analytics-card">
            <div className="card-header">
              <h3>Course Performance</h3>
              <div className="metric-icon performance-icon">🎯</div>
            </div>
            <div className="course-performance">
              <div className="top-courses">
                <h4>Top Performing Courses</h4>
                {analyticsData.coursePerformance.topCourses.map((course, index) => (
                  <div key={index} className="course-item">
                    <span className="course-name">{course.name}</span>
                    <div className="course-stats">
                      <span className="completion-rate">{course.completionRate}% complete</span>
                      <span className="rating">⭐ {course.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="struggling-areas">
                <h4>Areas Needing Attention</h4>
                {analyticsData.coursePerformance.strugglingAreas.map((area, index) => (
                  <div key={index} className="struggle-item">
                    <span className="topic-name">{area.topic}</span>
                    <span className="failure-rate">{area.failureRate}% struggle</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Trends */}
          <div className="analytics-card">
            <div className="card-header">
              <h3>Learning Trends</h3>
              <div className="metric-icon trends-icon">📈</div>
            </div>
            <div className="trends-content">
              <div className="popular-topics">
                <h4>Popular Topics</h4>
                <div className="topic-tags">
                  {analyticsData.learningTrends.popularTopics.map((topic, index) => (
                    <span key={index} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>
              <div className="learning-methods">
                <h4>Preferred Learning Methods</h4>
                {analyticsData.learningTrends.preferredLearningMethods.map((method, index) => (
                  <div key={index} className="method-item">
                    <span className="method-name">{method.method}</span>
                    <div className="method-bar">
                      <div 
                        className="method-fill" 
                        style={{ width: `${method.percentage}%` }}
                      ></div>
                    </div>
                    <span className="method-percentage">{method.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Predictions */}
          <div className="analytics-card">
            <div className="card-header">
              <h3>AI Predictions</h3>
              <div className="metric-icon predictions-icon">🔮</div>
            </div>
            <div className="predictions-content">
              <div className="prediction-metric">
                <span className="prediction-value">{analyticsData.predictions.nextWeekSignups}</span>
                <span className="prediction-label">Expected signups next week</span>
              </div>
              <div className="prediction-metric">
                <span className="prediction-value">{analyticsData.predictions.courseCompletionForecast}%</span>
                <span className="prediction-label">Course completion forecast</span>
              </div>
              {analyticsData.predictions.churnRisk.length > 0 && (
                <div className="churn-risk">
                  <h4>High Churn Risk Users</h4>
                  <div className="risk-users">
                    {analyticsData.predictions.churnRisk.slice(0, 3).map((user, index) => (
                      <div key={index} className="risk-user">
                        <span className="user-id">User {user.userId}</span>
                        <span className={`risk-level ${user.risk > 70 ? 'high' : user.risk > 40 ? 'medium' : 'low'}`}>
                          {user.risk}% risk
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="analytics-actions">
          <button onClick={fetchAnalytics} className="refresh-button">
            🔄 Refresh Analytics
          </button>
          <button className="export-button">
            📊 Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;

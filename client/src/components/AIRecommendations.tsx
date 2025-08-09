import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button, CircularProgress } from '@mui/material';

interface Recommendation {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

interface AIRecommendationsProps {
  userId: string;
  moduleId: string;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ userId, moduleId }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/recommendations?userId=${userId}&moduleId=${moduleId}`)
      .then(res => res.json())
      .then(data => setRecommendations(data))
      .finally(() => setLoading(false));
  }, [userId, moduleId]);

  if (loading) return (
    <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 3 }}>
      <CircularProgress />
      <Typography sx={{ ml: 2 }}>Loading AI recommendations...</Typography>
    </Box>
  );
  if (!recommendations.length) return null;

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main', display: 'flex', alignItems: 'center' }}>
        <span role="img" aria-label="AI">🤖</span> Recommended for You
      </Typography>
      <Grid container spacing={3}>
        {recommendations.map(rec => (
          <Grid item xs={12} sm={6} md={4} key={rec.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 3 }}>
              {rec.imageUrl && (
                <CardMedia
                  component="img"
                  height="140"
                  image={rec.imageUrl}
                  alt={rec.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {rec.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {rec.description}
                </Typography>
              </CardContent>
              {rec.link && (
                <Button
                  href={rec.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  color="secondary"
                  sx={{ m: 2 }}
                >
                  View Details
                </Button>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AIRecommendations;

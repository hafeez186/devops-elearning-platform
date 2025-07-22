import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  Settings,
  ClosedCaption,
} from '@mui/icons-material';

interface VideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
  autoplay?: boolean;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  poster,
  autoplay = false,
  onProgress,
  onComplete,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      setCurrentTime(current);
      
      if (onProgress && duration > 0) {
        onProgress((current / duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onComplete) {
        onComplete();
      }
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('waiting', handleWaiting);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('waiting', handleWaiting);
    };
  }, [duration, onProgress, onComplete]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number | number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const seekTime = Array.isArray(value) ? value[0] : value;
    video.currentTime = (seekTime / 100) * duration;
    setCurrentTime(video.currentTime);
  };

  const handleVolumeChange = (value: number | number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = Array.isArray(value) ? value[0] : value;
    video.volume = newVolume / 100;
    setVolume(newVolume / 100);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'black',
        borderRadius: 2,
        overflow: 'hidden',
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        poster={poster}
        autoPlay={autoplay}
        style={{ display: 'block' }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading Indicator */}
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <LinearProgress sx={{ width: 200 }} />
        </Box>
      )}

      {/* Video Controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          p: 2,
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Progress Bar */}
        <Slider
          value={(currentTime / duration) * 100 || 0}
          onChange={(_, value) => handleSeek(value)}
          sx={{
            color: 'primary.main',
            mb: 1,
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
            },
          }}
        />

        {/* Control Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Play/Pause */}
          <IconButton onClick={togglePlayPause} sx={{ color: 'white' }}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>

          {/* Time Display */}
          <Typography variant="body2" sx={{ color: 'white', minWidth: 80 }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Typography>

          {/* Volume Control */}
          <IconButton onClick={toggleMute} sx={{ color: 'white' }}>
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>

          <Slider
            value={isMuted ? 0 : volume * 100}
            onChange={(_, value) => handleVolumeChange(value)}
            sx={{
              width: 80,
              color: 'white',
              '& .MuiSlider-thumb': {
                width: 10,
                height: 10,
              },
            }}
          />

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Playback Speed */}
          <Tooltip title="Playback Speed">
            <IconButton
              onClick={() => {
                const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
                const currentIndex = rates.indexOf(playbackRate);
                const nextIndex = (currentIndex + 1) % rates.length;
                changePlaybackRate(rates[nextIndex]);
              }}
              sx={{ color: 'white' }}
            >
              <Typography variant="caption">
                {playbackRate}x
              </Typography>
            </IconButton>
          </Tooltip>

          {/* Closed Captions */}
          <Tooltip title="Closed Captions">
            <IconButton sx={{ color: 'white' }}>
              <ClosedCaption />
            </IconButton>
          </Tooltip>

          {/* Settings */}
          <Tooltip title="Settings">
            <IconButton sx={{ color: 'white' }}>
              <Settings />
            </IconButton>
          </Tooltip>

          {/* Fullscreen */}
          <IconButton onClick={toggleFullscreen} sx={{ color: 'white' }}>
            <Fullscreen />
          </IconButton>
        </Box>
      </Box>

      {/* Video Title Overlay */}
      {title && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            right: 16,
            opacity: showControls ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {title}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default VideoPlayer;

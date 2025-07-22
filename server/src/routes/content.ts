import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/videos');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only MP4, WebM, and OGG videos are allowed.'));
    }
  }
});

// Upload video endpoint
router.post('/upload/video', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    const videoData = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: `/api/content/videos/${req.file.filename}`
    };

    res.json({
      message: 'Video uploaded successfully',
      video: videoData
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload video' });
  }
});

// Serve video files
router.get('/videos/:filename', (req, res) => {
  const filename = req.params.filename;
  const videoPath = path.join(__dirname, '../uploads/videos', filename);
  
  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    // Support for video streaming with range requests
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

// Create course content
router.post('/courses', (req, res) => {
  try {
    const { title, description, category, difficulty, modules } = req.body;
    
    // In a real app, this would save to database
    const course = {
      id: Date.now().toString(),
      title,
      description,
      category,
      difficulty,
      modules,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.json({
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update course content
router.put('/courses/:id', (req, res) => {
  try {
    const courseId = req.params.id;
    const updates = req.body;
    
    // In a real app, this would update the database
    const updatedCourse = {
      id: courseId,
      ...updates,
      updatedAt: new Date()
    };

    res.json({
      message: 'Course updated successfully',
      course: updatedCourse
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Create lesson content
router.post('/lessons', (req, res) => {
  try {
    const { title, content, type, courseId, moduleId, videoUrl } = req.body;
    
    const lesson = {
      id: Date.now().toString(),
      title,
      content,
      type,
      courseId,
      moduleId,
      videoUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.json({
      message: 'Lesson created successfully',
      lesson
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lesson' });
  }
});

// Upload course materials (documents, images, etc.)
const documentUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '../uploads/documents');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  }
});

router.post('/upload/document', documentUpload.single('document'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No document uploaded' });
    }

    const documentData = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: `/api/content/documents/${req.file.filename}`
    };

    res.json({
      message: 'Document uploaded successfully',
      document: documentData
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// Serve document files
router.get('/documents/:filename', (req, res) => {
  const filename = req.params.filename;
  const documentPath = path.join(__dirname, '../uploads/documents', filename);
  
  if (!fs.existsSync(documentPath)) {
    return res.status(404).json({ error: 'Document not found' });
  }

  res.sendFile(documentPath);
});

// Get content statistics
router.get('/stats', (req, res) => {
  try {
    // In a real app, this would query the database
    const stats = {
      totalCourses: 15,
      totalLessons: 120,
      totalVideos: 85,
      totalLabs: 45,
      totalQuizzes: 30,
      totalStudents: 1250,
      completionRate: 78.5
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

export default router;

// MongoDB initialization script
db = db.getSiblingDB('devops-elearning');

// Create collections
db.createCollection('users');
db.createCollection('courses');
db.createCollection('lessons');
db.createCollection('progress');
db.createCollection('labs');

// Insert sample data
db.courses.insertMany([
  {
    _id: ObjectId(),
    title: 'Linux Command Line Fundamentals',
    description: 'Master essential Linux commands, file system navigation, and shell scripting',
    category: 'Linux',
    difficulty: 'Beginner',
    duration: '8 hours',
    lessons: 25,
    rating: 4.8,
    enrolled: 1204,
    scenarios: ['File Management', 'Process Control', 'System Monitoring'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId(),
    title: 'Docker Containerization',
    description: 'Learn container concepts, Dockerfile creation, and Docker Compose',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '10 hours',
    lessons: 30,
    rating: 4.8,
    enrolled: 1345,
    scenarios: ['Multi-stage Builds', 'Container Networking', 'Volume Management'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId(),
    title: 'Jenkins CI/CD Pipelines',
    description: 'Build automated pipelines with Jenkins, plugins, and integrations',
    category: 'CI/CD',
    difficulty: 'Intermediate',
    duration: '15 hours',
    lessons: 40,
    rating: 4.6,
    enrolled: 978,
    scenarios: ['Pipeline as Code', 'Multi-branch Workflows', 'Deployment Automation'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create indexes
db.courses.createIndex({ title: 1 });
db.courses.createIndex({ category: 1 });
db.courses.createIndex({ difficulty: 1 });
db.users.createIndex({ email: 1 }, { unique: true });
db.progress.createIndex({ userId: 1, courseId: 1 });

print('Database initialized successfully!');

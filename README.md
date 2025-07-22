# DevOps E-Learning Platform

A comprehensive, production-ready e-learning platform focused on Linux, DevOps, and advanced CI/CD tools with real-time scenarios and hands-on labs.

## 🌐 **Live Demo**
**🚀 Website**: https://hafeez186.github.io/devops-elearning-platform/  
**🔧 Admin Panel**: https://hafeez186.github.io/devops-elearning-platform/admin  
**📊 CI/CD Pipeline**: https://github.com/hafeez186/devops-elearning-platform/actions  

---

## 🎯 **Quick Start**
1. **Visit the live website** → https://hafeez186.github.io/devops-elearning-platform/
2. **Explore courses** → Browse Linux, DevOps, and CI/CD content
3. **Try admin features** → Visit `/admin` to see content management
4. **Check the code** → Clone this repository to explore the implementation

## 🚀 Features

- **Interactive Learning Modules**: Step-by-step courses with hands-on exercises
- **Real-time Scenarios**: Practical DevOps challenges and solutions
- **Virtual Labs**: Integrated terminal and code editors for practice
- **Progress Tracking**: Monitor learning progress and achievements
- **CI/CD Integration**: Built with modern DevOps practices
- **Responsive Design**: Works seamlessly across all devices

## 🛠️ **Technology Stack**

### **Frontend**
- ⚛️ **React 18** with TypeScript
- 🎨 **Material-UI (MUI)** for modern design
- 🧭 **React Router** for navigation
- 📱 **Responsive Design** for all devices
- 🎬 **Custom Video Player** component

### **Backend**
- 🟢 **Node.js** with Express.js
- 📘 **TypeScript** for type safety
- 🗄️ **MongoDB** for data storage
- 🔐 **JWT Authentication** system
- 📁 **Multer** for file uploads

### **DevOps & Deployment**
- 🐙 **GitHub Actions** for CI/CD pipeline
- 🐳 **Docker** for containerization
- 📄 **GitHub Pages** for hosting
- 🔍 **ESLint** for code quality
- 🧪 **Jest** for testing

## 📚 Course Content

### Linux Fundamentals
- Linux basics and command line
- File system navigation and permissions
- Process management and system monitoring
- Shell scripting and automation
- Advanced Linux administration

### DevOps Practices
- Version control with Git
- Infrastructure as Code (IaC)
- Configuration management
- Monitoring and logging
- Security best practices

### CI/CD Tools & Platforms
- **Jenkins**: Pipeline creation, plugins, and automation
- **GitHub Actions**: Workflow automation and deployment
- **GitLab CI/CD**: Advanced pipeline configurations
- **Docker**: Containerization and orchestration
- **Kubernetes**: Container orchestration and management
- **Terraform**: Infrastructure provisioning
- **Ansible**: Configuration management

## 🏗 Project Structure

```
devops-elearning-platform/
├── client/                 # React frontend
├── server/                 # Node.js backend
├── docker/                 # Docker configurations
├── .github/               # GitHub Actions workflows
├── docs/                  # Documentation
└── scripts/               # Utility scripts
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devops-elearning-platform
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp server/.env.example server/.env
   # Update the .env file with your configurations
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 Development Workflow

This project follows modern CI/CD practices:

1. **Feature Development**: Create feature branches from `develop`
2. **Code Quality**: Automated linting and testing
3. **Pull Requests**: Required for all changes to main branches
4. **Automated Testing**: Unit and integration tests on every commit
5. **Deployment**: Automated deployment to staging and production

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Learning Objectives

After completing this platform, learners will be able to:

- Master Linux command line and system administration
- Implement DevOps practices in real-world scenarios
- Design and manage CI/CD pipelines
- Deploy applications using modern containerization
- Monitor and maintain production systems
- Apply security best practices in DevOps workflows

## 🔗 Links

- [Documentation](./docs/)
- [API Reference](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

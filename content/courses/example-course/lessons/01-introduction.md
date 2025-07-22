# Lesson 1: Introduction to Docker

## 🎯 Learning Objectives
By the end of this lesson, you will be able to:
- Understand what containerization is and why it's important
- Explain the benefits of using Docker
- Identify key Docker concepts and terminology
- Set up Docker on your development environment

## 📹 Introduction Video
{{video: intro-to-docker.mp4}}

## 📖 What is Docker?

Docker is a platform that uses OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries and configuration files.

### Key Benefits:
- **Consistency**: "It works on my machine" problem solved
- **Portability**: Run anywhere Docker is supported
- **Efficiency**: Lightweight compared to traditional VMs
- **Scalability**: Easy horizontal scaling
- **DevOps Integration**: Perfect for CI/CD pipelines

## 🔧 Core Concepts

### Images vs Containers
- **Image**: Read-only template used to create containers
- **Container**: Running instance of an image

### Docker Architecture
{{video: docker-architecture.mp4}}

## 🚀 Hands-on Demo
Let's see Docker in action with a simple example:

{{video: first-docker-demo.mp4}}

## 💻 Interactive Exercise

Try these commands in your terminal:

```bash
# Check Docker version
docker --version

# Run your first container
docker run hello-world

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a
```

## 🧪 Lab Exercise
{{lab: docker-installation-lab}}

## ✅ Knowledge Check
{{quiz: docker-intro-quiz}}

## 📚 Additional Resources
- [Official Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Best Practices Guide](https://docs.docker.com/develop/dev-best-practices/)

---
**Next Lesson**: [Installing Docker](02-installation.md)

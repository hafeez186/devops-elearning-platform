# Contributing to DevOps E-Learning Platform

We welcome contributions to the DevOps E-Learning Platform! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/devops-elearning-platform.git
   cd devops-elearning-platform
   ```

3. **Install dependencies**
   ```bash
   npm run install:all
   ```

4. **Set up environment**
   ```bash
   cp server/.env.example server/.env
   # Update the .env file with your configurations
   ```

5. **Start development environment**
   ```bash
   npm run dev
   ```

## 📝 Development Workflow

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature development branches
- `hotfix/*` - Critical bug fixes
- `release/*` - Release preparation branches

### Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(courses): add interactive code editor
fix(auth): resolve JWT token expiration issue
docs(readme): update installation instructions
test(api): add unit tests for course endpoints
```

## 🔍 Code Quality

### Linting and Formatting

- **ESLint** for code linting
- **Prettier** for code formatting (coming soon)
- **TypeScript** for type checking

Run quality checks:
```bash
npm run lint
npm run test
```

### Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Aim for good test coverage

```bash
# Run all tests
npm test

# Run frontend tests
npm run test:client

# Run backend tests
npm run test:server
```

## 📚 Adding New Content

### Course Structure

When adding new courses, follow this structure:

```
courses/
├── course-id/
│   ├── metadata.json
│   ├── lessons/
│   │   ├── 01-introduction.md
│   │   ├── 02-getting-started.md
│   │   └── ...
│   ├── labs/
│   │   ├── lab-01/
│   │   └── ...
│   └── scenarios/
│       ├── scenario-01/
│       └── ...
```

### Lab Exercises

Labs should include:
- Clear objectives
- Step-by-step instructions
- Expected outcomes
- Troubleshooting tips
- Real-world applications

### Real-time Scenarios

Scenarios should:
- Reflect actual DevOps challenges
- Include multiple solution approaches
- Provide learning objectives
- Include assessment criteria

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment details**
   - OS and version
   - Node.js version
   - Browser (if frontend issue)

2. **Steps to reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior
   - Screenshots if applicable

3. **Additional context**
   - Error messages
   - Log files
   - Related issues

## 💡 Feature Requests

For new features, please provide:

1. **Use case description**
2. **Proposed solution**
3. **Alternative solutions considered**
4. **Implementation considerations**

## 📋 Pull Request Process

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow coding standards
   - Add tests for new functionality
   - Update documentation

3. **Test thoroughly**
   ```bash
   npm run lint
   npm test
   ```

4. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Use descriptive title
   - Fill out PR template
   - Link related issues
   - Request review

### PR Requirements

- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Self-review completed
- [ ] Related issues linked

## 🏗 Architecture Guidelines

### Frontend (React/TypeScript)

- Use functional components with hooks
- Implement proper TypeScript types
- Follow Material-UI design patterns
- Optimize for performance
- Ensure accessibility compliance

### Backend (Node.js/Express/TypeScript)

- Use RESTful API design
- Implement proper error handling
- Add input validation
- Use middleware appropriately
- Follow security best practices

### Database (MongoDB)

- Design efficient schemas
- Use proper indexing
- Implement data validation
- Consider performance implications

## 🚀 Deployment

### CI/CD Pipeline

Our GitHub Actions workflow:
1. Code quality checks
2. Unit testing
3. Build application
4. Docker image creation
5. Deployment to staging/production

### Environment Management

- **Development**: Local development
- **Staging**: Pre-production testing
- **Production**: Live environment

## 📞 Communication

- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Use GitHub Issues for bugs and features
- **Code Review**: Provide constructive feedback
- **Documentation**: Keep README and docs updated

## 🎯 Goals and Roadmap

### Current Focus
- Core learning platform functionality
- Interactive lab environments
- Real-time scenario simulations
- Progress tracking and analytics

### Future Features
- Live instructor-led sessions
- Peer collaboration tools
- Advanced assessment system
- Mobile application
- Integration with cloud platforms

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You

Thank you for contributing to the DevOps E-Learning Platform! Your contributions help make learning DevOps more accessible and effective for everyone.

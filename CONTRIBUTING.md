# Contributing to Portfolio

Thank you for your interest in contributing to this portfolio project! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- Node.js 18.x or higher
- npm, yarn, or pnpm package manager
- Git for version control
- VS Code (recommended) with suggested extensions

### Local Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Visit** `http://localhost:3000`

## 📋 Development Workflow

### Branch Naming Convention

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `refactor/component-name` - Code refactoring
- `test/test-description` - Test additions/updates

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(components): add dark mode toggle
fix(layout): resolve mobile navigation issue
docs(readme): update installation instructions
test(hero): add unit tests for Hero component
```

## 🧪 Testing Guidelines

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Writing Tests

- **Unit Tests**: Test individual components and utilities
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows

**Test Structure:**
```javascript
// __tests__/ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import ComponentName from '@/components/ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## 🎨 Code Style Guidelines

### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary
- Use descriptive variable and function names

### React Components
- Use functional components with hooks
- Implement proper prop typing
- Follow single responsibility principle
- Use meaningful component names

### Styling
- Use Tailwind CSS for styling
- Follow responsive-first approach
- Use semantic HTML elements
- Ensure accessibility standards

### Code Formatting
- Prettier is configured for automatic formatting
- ESLint enforces code quality rules
- Run `npm run lint:fix` before committing

## 📁 Project Structure

```
portfolio/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── sections/      # Page sections
├── lib/               # Utility functions
├── types/             # TypeScript type definitions
├── public/            # Static assets
├── __tests__/         # Test files
├── .github/           # GitHub workflows
├── config/            # Configuration files
└── scripts/           # Build and deployment scripts
```

## 🔧 Development Tools

### Recommended VS Code Extensions
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- TypeScript and JavaScript Language Features
- Auto Rename Tag
- Path Intellisense
- Jest
- Playwright Test for VS Code

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript checks
npm run test         # Run tests
npm run format       # Format code with Prettier
```

## 🚀 Pull Request Process

### Before Submitting
1. **Test Your Changes**
   ```bash
   npm run test
   npm run build
   npm run type-check
   npm run lint
   ```

2. **Update Documentation**
   - Update README if needed
   - Add JSDoc comments for new functions
   - Update type definitions

3. **Check Accessibility**
   - Test with screen readers
   - Verify keyboard navigation
   - Check color contrast ratios

### PR Submission
1. Create a descriptive PR title
2. Provide detailed description of changes
3. Link to relevant issues
4. Add screenshots for UI changes
5. Ensure all checks pass

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Screenshots
(If applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🐛 Issue Reporting

### Bug Reports
Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable

### Feature Requests
Include:
- Clear description of the feature
- Use case and motivation
- Potential implementation approach
- Mockups or examples if helpful

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Testing
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Playwright Documentation](https://playwright.dev/docs/intro)

## 🤝 Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the code of conduct
- Ask questions when unsure

## 📞 Getting Help

- Open a GitHub issue for bugs or features
- Start a GitHub discussion for questions
- Check existing issues and discussions first
- Be patient and provide details

## 🎉 Recognition

Contributors will be recognized in:
- README.md acknowledgments
- Release notes for significant contributions
- GitHub contributor statistics

Thank you for contributing to make this portfolio better! 🚀

---

**Questions?** Feel free to open an issue or discussion.
**Last Updated**: December 2024

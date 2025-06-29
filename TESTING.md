# Testing Strategy for KupDom

## Overview

This document outlines the comprehensive testing strategy for the KupDom shopping list application, covering unit tests, integration tests, and end-to-end tests.

## Test Structure

```
src/
├── lib/__tests__/
│   └── database.test.ts          # Database layer unit tests
├── app/__tests__/
│   └── HomePage.test.tsx         # Component tests
└── app/api/__tests__/
    └── lists.test.ts             # API integration tests
```

## Test Categories

### 1. Unit Tests (High Priority) ✅

**Database Layer (`src/lib/__tests__/database.test.ts`)**
- ✅ `generateListCode()` - Tests uniqueness and format
- ✅ `createShoppingList()` - Tests creation with unique codes
- ✅ `getShoppingListByCode()` - Tests retrieval and not found cases
- ✅ `addItem()` - Tests position ordering
- ✅ `updateItemStatus()` - Tests status transitions
- ✅ `verifyAdminCredentials()` - Tests authentication
- ✅ `getAllShoppingLists()` - Tests pagination logic

**Coverage Areas:**
- Code generation uniqueness
- Item position management
- Status validation
- Input sanitization
- Error handling

### 2. Integration Tests (High Priority) ✅

**API Routes (`src/app/api/__tests__/lists.test.ts`)**
- ✅ `POST /api/lists` - Create list with validation
- ✅ `GET /api/lists/[code]` - Retrieve list with items
- ✅ Error handling for invalid inputs
- ✅ Database error scenarios

**Coverage Areas:**
- Request/response handling
- Input validation
- Error responses
- Database integration

### 3. Component Tests (Medium Priority) ✅

**React Components (`src/app/__tests__/HomePage.test.tsx`)**
- ✅ Homepage rendering
- ✅ Form interactions
- ✅ API calls
- ✅ Error handling
- ✅ Loading states

**Coverage Areas:**
- Component rendering
- User interactions
- State management
- Navigation

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage Goals

- **Lines**: 70%
- **Functions**: 70%
- **Branches**: 70%
- **Statements**: 70%

## Test Patterns

### Database Testing
```typescript
// Mock better-sqlite3
jest.mock('better-sqlite3')

// Test database operations
describe('Database Operations', () => {
  it('should create shopping list with unique code', () => {
    // Mock database responses
    // Test business logic
    // Verify database calls
  })
})
```

### API Testing
```typescript
// Mock database functions
jest.mock('@/lib/database', () => ({
  createShoppingList: jest.fn(),
  getShoppingListByCode: jest.fn(),
}))

// Test API endpoints
describe('Lists API', () => {
  it('should create new shopping list', async () => {
    // Create mock request
    // Call API function
    // Verify response
  })
})
```

### Component Testing
```typescript
// Mock Next.js router and fetch
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

// Test React components
describe('HomePage', () => {
  it('should render KupDom branding', () => {
    // Render component
    // Assert presence of elements
  })
})
```

## Areas for Future Testing

### 4. E2E Tests (Medium Priority) 🔄

**Recommended Tools:**
- Playwright or Cypress
- Test user workflows end-to-end

**Critical User Flows:**
- Create new shopping list → Add items → Mark as bought
- Join existing list → Edit items → Delete items
- Admin login → View dashboard → Access specific list
- Mobile responsiveness testing

**Test Scenarios:**
```typescript
describe('Shopping List Workflow', () => {
  it('should create list and add items', async () => {
    // Navigate to homepage
    // Create new list
    // Add items
    // Verify items appear
    // Mark items as bought
  })
})
```

### 5. Performance Tests (Low Priority) 📋

**Areas to Test:**
- Database query performance
- API response times
- Component rendering performance
- Memory usage

### 6. Security Tests (Medium Priority) 🔒

**Areas to Test:**
- Input validation and sanitization
- SQL injection prevention
- Authentication security
- Authorization checks

## Test Data Management

### Mock Data
```typescript
const mockShoppingList = {
  id: 1,
  code: 'ABC123',
  title: 'Test Shopping List',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

const mockItems = [
  { id: 1, name: 'Milk', status: 'pending', position: 1 },
  { id: 2, name: 'Bread', status: 'bought', position: 2 },
]
```

### Test Database
- Use in-memory SQLite for tests
- Reset database state between tests
- Use transaction rollbacks for isolation

## Continuous Integration

### GitHub Actions (Recommended)
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage
```

## Best Practices

### 1. Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### 2. Mocking Strategy
- Mock external dependencies (database, API calls)
- Use realistic mock data
- Reset mocks between tests

### 3. Error Testing
- Test both success and failure scenarios
- Verify error messages and status codes
- Test edge cases and boundary conditions

### 4. Coverage
- Aim for high coverage but focus on critical paths
- Don't test implementation details
- Test user-facing functionality

## Current Test Status

- ✅ **Unit Tests**: Database layer fully covered
- ✅ **Integration Tests**: API endpoints covered
- ✅ **Component Tests**: Homepage component covered
- 🔄 **E2E Tests**: Not implemented yet
- 📋 **Performance Tests**: Not implemented yet
- 🔒 **Security Tests**: Basic validation covered

## Next Steps

1. **Implement E2E Tests** using Playwright
2. **Add more component tests** for shopping list page
3. **Add performance benchmarks**
4. **Implement security testing**
5. **Set up CI/CD pipeline**

## Maintenance

- Run tests before each commit
- Update tests when adding new features
- Review test coverage regularly
- Refactor tests when code changes 
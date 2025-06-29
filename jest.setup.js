import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  useParams() {
    return {}
  },
}))

// Mock fetch globally
global.fetch = jest.fn()

// Polyfill window.alert
global.alert = jest.fn()

// Polyfill web Request for API route tests
try {
  const { Request } = require('node-fetch');
  global.Request = Request;
} catch (e) {
  // node-fetch not installed or not needed
}

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks()
}) 
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

// Polyfill web Request and Response for API route tests
if (typeof global.Request === 'undefined') {
  global.Request = class MockRequest {
    constructor(url, init) {
      this.url = url;
      this.init = init;
    }
  };
}

if (typeof global.Response === 'undefined') {
  global.Response = class MockResponse {
    constructor(body, init) {
      this.body = body;
      this.init = init;
      this.status = init?.status || 200;
      this.statusText = init?.statusText || 'OK';
      this.headers = new Map();
    }
    
    json() {
      return Promise.resolve(JSON.parse(this.body));
    }
  };
}

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks()
}) 
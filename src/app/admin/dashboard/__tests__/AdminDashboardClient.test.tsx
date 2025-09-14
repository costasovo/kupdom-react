import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminDashboardClient from '../AdminDashboardClient';

// Mock Next.js router
const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

// Mock fetch
global.fetch = jest.fn();

const mockLists = [
  {
    id: 1,
    code: 'ABC123',
    title: 'Weekly Groceries',
    created_at: '2023-01-01T00:00:00Z',
    item_count: 5,
  },
  {
    id: 2,
    code: 'XYZ789',
    title: 'Party Supplies',
    created_at: '2023-01-02T00:00:00Z',
    item_count: 3,
  },
];

describe('AdminDashboardClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('shows loading spinner initially', () => {
      // Mock a slow response
      (global.fetch as jest.Mock).mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      render(<AdminDashboardClient />);

      expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();
      expect(screen.getByText('Loading dashboard...').previousElementSibling).toHaveClass('animate-spin');
    });
  });

  describe('Successful Data Loading', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          lists: mockLists,
          total: 25,
          page: 1,
          limit: 10,
          totalPages: 3,
        }),
      });
    });

    it('renders dashboard header', async () => {
      render(<AdminDashboardClient />);

      await waitFor(() => {
        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Manage shopping lists')).toBeInTheDocument();
      });
    });

    it('renders navigation buttons', async () => {
      render(<AdminDashboardClient />);

      await waitFor(() => {
        expect(screen.getByText('← Back to Home')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
      });
    });

    it('displays correct statistics', async () => {
      render(<AdminDashboardClient />);

      await waitFor(() => {
        // Total Lists should show total from API, not just current page count
        expect(screen.getByText('25')).toBeInTheDocument(); // Total lists
        expect(screen.getByText('8')).toBeInTheDocument(); // Total items (5+3)
        expect(screen.getByText('1 / 3')).toBeInTheDocument(); // Page info
      });
    });

    it('renders shopping lists table', async () => {
      render(<AdminDashboardClient />);

      await waitFor(() => {
        expect(screen.getByText('Shopping Lists')).toBeInTheDocument();
        expect(screen.getByText('ABC123')).toBeInTheDocument();
        expect(screen.getByText('Weekly Groceries')).toBeInTheDocument();
        expect(screen.getByText('XYZ789')).toBeInTheDocument();
        expect(screen.getByText('Party Supplies')).toBeInTheDocument();
      });
    });

    it('displays item counts correctly', async () => {
      render(<AdminDashboardClient />);

      await waitFor(() => {
        expect(screen.getByText('5 items')).toBeInTheDocument();
        expect(screen.getByText('3 items')).toBeInTheDocument();
      });
    });
  });

  describe('Pagination', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          lists: mockLists,
          total: 25,
          page: 1,
          limit: 10,
          totalPages: 3,
        }),
      });
    });

    it('shows pagination controls when totalPages > 1', async () => {
      render(<AdminDashboardClient />);

      await waitFor(() => {
        expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
      });
    });

    it('disables Previous button on first page', async () => {
      render(<AdminDashboardClient />);

      await waitFor(() => {
        const prevButton = screen.getByText('Previous');
        expect(prevButton).toBeDisabled();
      });
    });

    it('enables Next button when not on last page', async () => {
      render(<AdminDashboardClient />);

      await waitFor(() => {
        const nextButton = screen.getByText('Next');
        expect(nextButton).not.toBeDisabled();
      });
    });

    it('navigates to next page when Next is clicked', async () => {
      const user = userEvent.setup();
      
      // Mock first page response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          lists: mockLists,
          total: 25,
          page: 1,
          limit: 10,
          totalPages: 3,
        }),
      });

      render(<AdminDashboardClient />);

      await waitFor(() => {
        expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
      });

      // Mock second page response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          lists: [],
          total: 25,
          page: 2,
          limit: 10,
          totalPages: 3,
        }),
      });

      const nextButton = screen.getByText('Next');
      await user.click(nextButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/admin/lists?page=2&limit=10');
      });
    });

    it('navigates to previous page when Previous is clicked', async () => {
      const user = userEvent.setup();
      
      // Mock initial page 2 response
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            lists: mockLists,
            total: 25,
            page: 2,
            limit: 10,
            totalPages: 3,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            lists: mockLists,
            total: 25,
            page: 1,
            limit: 10,
            totalPages: 3,
          }),
        });

      render(<AdminDashboardClient />);

      // Wait for initial load and then click Next to get to page 2
      await waitFor(() => {
        expect(screen.getByText('Next')).toBeInTheDocument();
      });

      const nextButton = screen.getByText('Next');
      await user.click(nextButton);

      // Wait for page 2 to load, then click Previous
      await waitFor(() => {
        const prevButton = screen.getByText('Previous');
        expect(prevButton).not.toBeDisabled();
      });

      const prevButton = screen.getByText('Previous');
      await user.click(prevButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/admin/lists?page=1&limit=10');
      });
    });

    it('disables Next button on last page', async () => {
      // Start with page 1, then navigate to last page
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            lists: mockLists,
            total: 25,
            page: 1,
            limit: 10,
            totalPages: 3,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            lists: mockLists,
            total: 25,
            page: 2,
            limit: 10,
            totalPages: 3,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            lists: mockLists,
            total: 25,
            page: 3,
            limit: 10,
            totalPages: 3,
          }),
        });

      const user = userEvent.setup();
      render(<AdminDashboardClient />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText('Next')).toBeInTheDocument();
      });

      // Navigate to page 2
      let nextButton = screen.getByText('Next');
      await user.click(nextButton);

      // Navigate to page 3 (last page)
      await waitFor(() => {
        nextButton = screen.getByText('Next');
        expect(nextButton).not.toBeDisabled();
      });
      
      await user.click(nextButton);

      // Check that Next button is now disabled on last page
      await waitFor(() => {
        nextButton = screen.getByText('Next');
        expect(nextButton).toBeDisabled();
      });
    });
  });

  describe('No Pagination for Single Page', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          lists: mockLists,
          total: 2,
          page: 1,
          limit: 10,
          totalPages: 1,
        }),
      });
    });

    it('hides pagination controls when totalPages <= 1', async () => {
      render(<AdminDashboardClient />);

      await waitFor(() => {
        expect(screen.queryByText('Previous')).not.toBeInTheDocument();
        expect(screen.queryByText('Next')).not.toBeInTheDocument();
        expect(screen.queryByText('Page 1 of 1')).not.toBeInTheDocument();
      });
    });
  });

  describe('Empty State', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          lists: [],
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        }),
      });
    });

    it('shows empty state when no lists are found', async () => {
      render(<AdminDashboardClient />);

      await waitFor(() => {
        expect(screen.getByText('No shopping lists found')).toBeInTheDocument();
        // Use getAllByText to get the empty state emoji specifically (not the stats one)
        const emojis = screen.getAllByText('📋');
        expect(emojis.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('shows zero in statistics for empty state', async () => {
      render(<AdminDashboardClient />);

      await waitFor(() => {
        // Check for the Total Lists section specifically
        expect(screen.getByText('Total Lists')).toBeInTheDocument();
        // Use getAllByText to handle multiple "0" values
        const zeros = screen.getAllByText('0');
        expect(zeros.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('Actions', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          lists: mockLists,
          total: 25,
          page: 1,
          limit: 10,
          totalPages: 3,
        }),
      });
    });

    it('navigates to home when Back to Home is clicked', async () => {
      const user = userEvent.setup();
      
      render(<AdminDashboardClient />);

      await waitFor(() => {
        const backButton = screen.getByText('← Back to Home');
        expect(backButton).toBeInTheDocument();
      });

      const backButton = screen.getByText('← Back to Home');
      await user.click(backButton);

      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('navigates to list when View is clicked', async () => {
      const user = userEvent.setup();
      
      render(<AdminDashboardClient />);

      await waitFor(() => {
        const viewButtons = screen.getAllByText('View');
        expect(viewButtons).toHaveLength(2);
      });

      const viewButtons = screen.getAllByText('View');
      await user.click(viewButtons[0]);

      expect(mockPush).toHaveBeenCalledWith('/list/ABC123');
    });

    it('handles logout successfully', async () => {
      const user = userEvent.setup();
      
      render(<AdminDashboardClient />);

      // Wait for component to load
      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument();
      });

      // Mock logout API response after component is rendered
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: async () => ({ success: true }),
        })
      );

      const logoutButton = screen.getByText('Logout');
      await user.click(logoutButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/admin/logout', {
          method: 'POST',
        });
        expect(mockPush).toHaveBeenCalledWith('/admin/login');
      });
    });
  });

  describe('Error Handling', () => {
    it('handles API error gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
      });

      render(<AdminDashboardClient />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to load lists');
      });

      consoleSpy.mockRestore();
    });

    it('handles network error gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      render(<AdminDashboardClient />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to load lists');
      });

      consoleSpy.mockRestore();
    });
  });
});

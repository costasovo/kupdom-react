import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomePage from '../page'

// Mock Next.js router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders KupDom branding', () => {
    render(<HomePage />)
    
    expect(screen.getByText('KupDom')).toBeInTheDocument()
    expect(screen.getByText('Your Smart Shopping Companion')).toBeInTheDocument()
  })

  it('renders man image', () => {
    render(<HomePage />)
    
    const image = screen.getByAltText('Man with shopping bag heading to grocery store')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', expect.stringContaining('man.png'))
  })

  it('renders create new list button', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Create New Shopping List')).toBeInTheDocument()
  })

  it('renders list code input and go to list button', () => {
    render(<HomePage />)
    
    expect(screen.getByLabelText('Enter List Code')).toBeInTheDocument()
    expect(screen.getByText('Go to List')).toBeInTheDocument()
  })

  it('renders admin link', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  describe('Create New Shopping List', () => {
    it('creates a new list successfully', async () => {
      const user = userEvent.setup()

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ code: 'ABC123', id: 1 }),
      })

      render(<HomePage />)
      
      const createButton = screen.getByText('Create New Shopping List')
      await user.click(createButton)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/lists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'My Shopping List' }),
        })
      })
    })

    it('shows loading state while creating', async () => {
      const user = userEvent.setup()
      
      // Mock a slow response that will eventually resolve properly
      ;(global.fetch as jest.Mock).mockImplementationOnce(() => 
        new Promise(resolve => 
          setTimeout(() => resolve({
            ok: true,
            json: async () => ({ code: 'ABC123', id: 1 }),
          }), 100)
        )
      )

      render(<HomePage />)
      
      const createButton = screen.getByText('Create New Shopping List')
      await user.click(createButton)

      expect(screen.getByText('Creating...')).toBeInTheDocument()
    })

    it('handles creation error', async () => {
      const user = userEvent.setup()
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      })

      render(<HomePage />)
      
      const createButton = screen.getByText('Create New Shopping List')
      await user.click(createButton)

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Failed to create shopping list')
      })

      alertSpy.mockRestore()
    })
  })

  describe('Go to List', () => {
    it('navigates to list with valid code', async () => {
      const user = userEvent.setup()

      render(<HomePage />)
      
      const input = screen.getByLabelText('Enter List Code')
      const goButton = screen.getByText('Go to List')

      await user.type(input, 'ABC123')
      await user.click(goButton)

      expect(mockPush).toHaveBeenCalledWith('/list/ABC123')
    })

    it('navigates on Enter key press', async () => {
      const user = userEvent.setup()

      render(<HomePage />)
      
      const input = screen.getByLabelText('Enter List Code')
      await user.type(input, 'ABC123{enter}')

      expect(mockPush).toHaveBeenCalledWith('/list/ABC123')
    })

    it('converts code to uppercase', async () => {
      const user = userEvent.setup()

      render(<HomePage />)
      
      const input = screen.getByLabelText('Enter List Code')
      const goButton = screen.getByText('Go to List')

      await user.type(input, 'abc123')
      await user.click(goButton)

      expect(mockPush).toHaveBeenCalledWith('/list/ABC123')
    })

    it('disables go button when input is empty', () => {
      render(<HomePage />)
      
      const goButton = screen.getByText('Go to List')
      expect(goButton).toBeDisabled()
    })

    it('enables go button when input has content', async () => {
      const user = userEvent.setup()
      render(<HomePage />)
      
      const input = screen.getByLabelText('Enter List Code')
      const goButton = screen.getByText('Go to List')

      await user.type(input, 'ABC123')
      expect(goButton).not.toBeDisabled()
    })
  })

  describe('Admin Link', () => {
    it('navigates to admin login', async () => {
      const user = userEvent.setup()

      render(<HomePage />)
      
      const adminLink = screen.getByText('Admin')
      await user.click(adminLink)

      expect(mockPush).toHaveBeenCalledWith('/admin/login')
    })
  })
}) 
# KupDom - Shopping List App

A real-time collaborative shopping list application built with Next.js, Socket.io, and SQLite.

## Development Scripts

### Development Mode
```bash
# Fast development with HMR and Fast Refresh (Next.js only)
npm run dev

# Production-like development with WebSocket (Next.js + Socket.io)
npm run dev:socket

# Full development with both HMR and WebSocket (recommended for WebSocket features)
npm run dev:full
```

### Production
```bash
# Build the application
npm run build

# Start production server (Next.js + Socket.io)
npm run start
```

### Database
```bash
# Initialize database and create admin user
npm run init-db
```

## Development Workflow

1. **Most development**: Use `npm run dev` for fast development with Hot Module Replacement
2. **WebSocket features**: Use `npm run dev:full` when you need to test real-time functionality
3. **Production testing**: Use `npm run dev:socket` to test the production setup locally

## Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
# Development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://kupdom.cz
HOSTNAME=0.0.0.0
PORT=3001
DATABASE_PATH=./kupdom.db
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
```

## Features

- Real-time collaborative shopping lists
- WebSocket-based live updates
- Admin dashboard
- SQLite database with automatic initialization
- TypeScript support
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Database**: SQLite with better-sqlite3
- **Authentication**: bcryptjs for password hashing
- **Styling**: Tailwind CSS for responsive design

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kupdom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup

The application uses SQLite for data storage. To set up the database securely:

1. **Initialize the database with admin credentials**
   ```bash
   npm run init-db
   ```
   
   This will prompt you for:
   - Admin username (default: kupdom)
   - Admin password (required)
   
   **Alternative methods:**
   ```bash
   # Using command line arguments
   npm run init-db -- --username admin --password mypassword
   
   # Using environment variables
   ADMIN_USERNAME=admin ADMIN_PASSWORD=mypassword npm run init-db
   ```

2. **Database file location**
   The SQLite database (`kupdom.db`) will be created in the project root directory.

3. **Security note**
   The database initialization script creates a secure bcrypt hash of your password. 
   No plain text passwords are stored in the database or source code.

4. **Reset database (if needed)**
   ```bash
   npm run init-db
   ```
   The script will ask for confirmation before overwriting an existing database.

## Usage

### Creating a Shopping List
1. Visit the homepage
2. Click "Create New Shopping List"
3. You'll be redirected to your new list with a unique 6-character code

### Joining an Existing List
1. Enter the 6-character list code on the homepage
2. Click "Go to List"
3. You can now view and edit the list

### Managing Items
- **Add Item**: Type in the input field and press Enter or click "Add"
- **Mark Status**: Use the colored circles to mark items as:
  - Gray: Pending (default)
  - Green: Bought
  - Red: Unavailable
- **Edit Item**: Click the pencil icon to edit item names
- **Delete Item**: Click the trash icon to remove items

### Admin Access
1. Click the "Admin" link in the top-right corner of the homepage
2. Login with the admin credentials
3. View all shopping lists with pagination
4. Click "View List" to access any specific list

## Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── lists/             # Shopping list operations
│   │   ├── items/             # Item operations
│   │   └── admin/             # Admin operations
│   ├── list/[code]/           # Shopping list page
│   ├── admin/                 # Admin pages
│   │   ├── login/             # Admin login
│   │   └── dashboard/         # Admin dashboard
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── lib/
│   └── database.ts            # Database operations
└── types/
    └── index.ts               # TypeScript types
```

## API Endpoints

### Shopping Lists
- `POST /api/lists` - Create new shopping list
- `GET /api/lists/[code]` - Get shopping list by code
- `PUT /api/lists/[code]/title` - Update list title
- `POST /api/lists/[code]/items` - Add item to list

### Items
- `PUT /api/items/[id]` - Update item (status/name)
- `DELETE /api/items/[id]` - Delete item

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/lists` - Get paginated shopping lists

## Database Schema

### shopping_lists
- `id` (INTEGER PRIMARY KEY)
- `code` (TEXT UNIQUE) - 6-character alphanumeric code
- `title` (TEXT) - List title
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

### items
- `id` (INTEGER PRIMARY KEY)
- `list_id` (INTEGER) - Foreign key to shopping_lists
- `name` (TEXT) - Item name
- `status` (TEXT) - 'pending', 'bought', or 'unavailable'
- `position` (INTEGER) - Order in list
- `created_at` (DATETIME)

### users
- `id` (INTEGER PRIMARY KEY)
- `username` (TEXT UNIQUE)
- `password_hash` (TEXT) - bcrypt hashed password
- `created_at` (DATETIME)

## Mobile-Friendly Features

- Responsive design that works on all screen sizes
- Touch-friendly buttons and inputs
- Optimized for shopping on mobile devices
- Simple, intuitive interface

## Security Features

- Password hashing with bcryptjs
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- Secure admin authentication

## Development

### Running in Development
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Database Location
The SQLite database file (`kupdom.db`) is created in the project root directory.

## Future Enhancements and Todos

- Add functionality for links that generate new prefilled list
- Add e2e tests
- Improve autocomplete for basic groceries
- Add czech/english language switch
- Shopping history and analytics

## License

This project is open source and available under the MIT License.

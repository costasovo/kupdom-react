# KupDom - Smart Shopping Lists

A Next.js-powered React SSR application for managing shopping lists with a simple, mobile-friendly interface.

## Features

### For Users
- **Homepage**: Create new shopping lists or join existing ones with a 6-character code
- **Shopping List Management**: 
  - Add, edit, and delete items
  - Mark items as bought, unavailable, or pending
  - Edit list title
  - Mobile-friendly design for shopping on the go
- **Real-time Updates**: Changes are immediately reflected

### For Admins
- **Secure Login**: Admin access with username/password authentication
- **Dashboard**: View all shopping lists with pagination
- **List Management**: Access any shopping list for monitoring

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

The application automatically creates the SQLite database (`kupdom.db`) and required tables on first run. The admin user is also automatically created with:

- **Username**: `kupdom`
- **Password**: `gZ43vJrbV3Kqt4Pb8nfUipARJL6dpxf3`

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

## Future Enhancements

- User registration and authentication
- Real-time collaboration with WebSockets
- Push notifications for list updates
- Categories and tags for items
- Shopping history and analytics
- Export/import functionality
- Multi-language support

## License

This project is open source and available under the MIT License.

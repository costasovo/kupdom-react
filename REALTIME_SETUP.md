# Real-time Shopping List Setup

This guide explains how to run the KupDom shopping list app with real-time synchronization using Socket.io.

## Prerequisites

- Node.js 18+ installed
- All dependencies installed (`npm install`)

## Running the App

### Option 1: Run Both Servers Together (Recommended)

```bash
npm run dev:full
```

This will start both the Next.js development server and the Socket.io server simultaneously.

### Option 2: Run Servers Separately

In one terminal:
```bash
npm run dev
```

In another terminal:
```bash
npm run dev:socket
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

For production, set this to your actual domain.

## How It Works

1. **Socket.io Server**: Runs on port 3001 and handles real-time communication
2. **Next.js App**: Runs on port 3000 (or 3001 if 3000 is busy) and serves the web interface
3. **Real-time Features**:
   - Live item updates (add, edit, delete, status changes)
   - Live title updates
   - User presence indicators
   - Connection status display

## Testing Real-time Features

1. Open the app in multiple browser tabs/windows
2. Navigate to the same shopping list
3. Make changes in one tab and watch them appear instantly in other tabs
4. Check the connection status indicator in the header

## Production Deployment

For production deployment on Vercel:

1. The Socket.io server will be integrated into the Next.js app
2. Set `NEXT_PUBLIC_APP_URL` to your production domain
3. Vercel supports WebSockets natively

## Troubleshooting

- If you see connection errors, make sure both servers are running
- Check the browser console for Socket.io connection logs
- Ensure the correct ports are being used (3000 for Next.js, 3001 for Socket.io) 
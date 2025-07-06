const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3001;

// Initialize database before starting the server
async function startServer() {
  try {
    // Import and run database initialization
    const { initializeDatabase } = require('./src/lib/database-init.cjs');
    await initializeDatabase();
    
    // Prepare the Next.js app
    const app = next({ dev, hostname, port });
    const handle = app.getRequestHandler();

    app.prepare().then(() => {
      const server = createServer(async (req, res) => {
        try {
          await handle(req, res);
        } catch (err) {
          console.error('Error occurred handling', req.url, err);
          res.statusCode = 500;
          res.end('internal server error');
        }
      });

      // Create Socket.io server
      const io = new Server(server, {
        cors: {
          origin: dev ? ['http://localhost:3000', 'http://localhost:3001'] : process.env.NEXT_PUBLIC_APP_URL,
          methods: ['GET', 'POST']
        }
      });

      // Socket.io event handlers
      io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        
        // Join a specific list room
        socket.on('join-list', ({ listCode }) => {
          socket.join(`list-${listCode}`);
          console.log(`Client ${socket.id} joined list ${listCode}`);
          
          // Notify other clients in the room
          socket.to(`list-${listCode}`).emit('user-joined', {
            socketId: socket.id,
            timestamp: new Date().toISOString()
          });
        });
        
        // Handle item updates
        socket.on('item-updated', (data) => {
          console.log(`Item ${data.action}:`, data);
          
          // Broadcast to all clients in the list room (except sender)
          socket.to(`list-${data.listCode}`).emit('item-updated', {
            ...data,
            timestamp: new Date().toISOString()
          });
        });
        
        // Handle list title updates
        socket.on('title-updated', (data) => {
          console.log(`Title updated for list ${data.listCode}:`, data.title);
          
          socket.to(`list-${data.listCode}`).emit('title-updated', {
            ...data,
            timestamp: new Date().toISOString()
          });
        });
        
        // Handle user presence
        socket.on('user-activity', (data) => {
          socket.to(`list-${data.listCode}`).emit('user-activity', {
            ...data,
            socketId: socket.id,
            timestamp: new Date().toISOString()
          });
        });
        
        // Handle disconnection
        socket.on('disconnect', () => {
          console.log('Client disconnected:', socket.id);
        });
      });

      server.listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
        console.log('> Socket.io server is running');
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = () => {
  if (!socket) {
    socket = io(process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.vercel.app'
      : 'http://localhost:3001',
      {
        // Prevent automatic reconnection to avoid loops
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
      }
    );
    
    socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });
    
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
    });
    
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('reconnect', (attemptNumber) => {
      console.log(`Reconnected to Socket.io server after ${attemptNumber} attempts`);
    });

    socket.on('reconnect_error', (error) => {
      console.error('Socket reconnection error:', error);
    });
  }
  
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Event types for type safety
export interface ItemUpdateEvent {
  listCode: string;
  itemId: string;
  action: 'added' | 'updated' | 'deleted';
  item?: any;
  timestamp: string;
}

export interface TitleUpdateEvent {
  listCode: string;
  title: string;
  timestamp: string;
}

export interface UserActivityEvent {
  listCode: string;
  action: 'typing' | 'editing' | 'idle';
  itemId?: string;
  socketId: string;
  timestamp: string;
}

export interface UserJoinedEvent {
  socketId: string;
  timestamp: string;
} 
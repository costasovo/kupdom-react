import { useEffect, useRef, useCallback, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { getSocket, ItemUpdateEvent, TitleUpdateEvent, UserActivityEvent, UserJoinedEvent } from './socket';

interface UseSocketOptions {
  listCode: string;
  onItemUpdate?: (event: ItemUpdateEvent) => void;
  onTitleUpdate?: (event: TitleUpdateEvent) => void;
  onUserActivity?: (event: UserActivityEvent) => void;
  onUserJoined?: (event: UserJoinedEvent) => void;
}

export const useSocket = ({
  listCode,
  onItemUpdate,
  onTitleUpdate,
  onUserActivity,
  onUserJoined
}: UseSocketOptions) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const hasJoinedRef = useRef(false);

  // Join list room
  const joinList = useCallback(() => {
    if (socketRef.current && isConnected && !hasJoinedRef.current) {
      socketRef.current.emit('join-list', { listCode });
      hasJoinedRef.current = true;
    }
  }, [listCode, isConnected]);

  // Emit item updates
  const emitItemUpdate = useCallback((data: {
    itemId: string;
    action: 'added' | 'updated' | 'deleted';
    item?: unknown;
  }) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('item-updated', {
        listCode,
        ...data
      });
    }
  }, [listCode, isConnected]);

  // Emit title updates
  const emitTitleUpdate = useCallback((title: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('title-updated', {
        listCode,
        title
      });
    }
  }, [listCode, isConnected]);

  // Emit user activity
  const emitUserActivity = useCallback((data: {
    action: 'typing' | 'editing' | 'idle';
    itemId?: string;
  }) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('user-activity', {
        listCode,
        ...data
      });
    }
  }, [listCode, isConnected]);

  // Initialize socket connection
  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    // Set up event listeners
    if (onItemUpdate) {
      socket.on('item-updated', onItemUpdate);
    }
    
    if (onTitleUpdate) {
      socket.on('title-updated', onTitleUpdate);
    }
    
    if (onUserActivity) {
      socket.on('user-activity', onUserActivity);
    }
    
    if (onUserJoined) {
      socket.on('user-joined', onUserJoined);
    }

    // Handle connection
    const handleConnect = () => {
      setIsConnected(true);
    };

    // Handle disconnection
    const handleDisconnect = () => {
      setIsConnected(false);
      hasJoinedRef.current = false;
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    // Set initial connection state
    setIsConnected(socket.connected);

    // Cleanup on unmount
    return () => {
      if (onItemUpdate) socket.off('item-updated', onItemUpdate);
      if (onTitleUpdate) socket.off('title-updated', onTitleUpdate);
      if (onUserActivity) socket.off('user-activity', onUserActivity);
      if (onUserJoined) socket.off('user-joined', onUserJoined);
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [onItemUpdate, onTitleUpdate, onUserActivity, onUserJoined]);

  // Join room when connected
  useEffect(() => {
    if (isConnected) {
      joinList();
    }
  }, [isConnected, joinList]);

  return {
    emitItemUpdate,
    emitTitleUpdate,
    emitUserActivity,
    isConnected
  };
}; 
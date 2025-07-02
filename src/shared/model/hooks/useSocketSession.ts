import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { socket } from '@/shared';
import { setSessionCount } from '@/entities';

export const useSocketSession = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const onSessionCount = (count: number) => {
      dispatch(setSessionCount(count));
    };

    socket.on('sessionCount', onSessionCount);

    return () => {
      socket.off('sessionCount', onSessionCount);
      // socket.disconnect();
    };
  }, [dispatch]);
};

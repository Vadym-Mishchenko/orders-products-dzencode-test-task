import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { socket } from '@/shared';
import { setSessionCount } from '@/entities';

export const useSocketSession = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.connect();

    socket.on('sessionCount', (count: number) => {
      dispatch(setSessionCount(count));
    });

    return () => {
      socket.off('sessionCount');
      socket.disconnect();
    };
  }, [dispatch]);
};

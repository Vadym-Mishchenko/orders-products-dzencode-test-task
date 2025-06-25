import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app';

export const useAppDispatch = () => useDispatch<AppDispatch>();

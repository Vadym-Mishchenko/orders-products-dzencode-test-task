import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '@/app';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

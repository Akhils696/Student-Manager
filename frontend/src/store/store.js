import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import studentSlice from './studentSlice';
import taskSlice from './taskSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    students: studentSlice,
    tasks: taskSlice,
  },
});
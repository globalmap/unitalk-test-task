import { configureStore } from '@reduxjs/toolkit';
import operatorsReducer from '../features/operators/slices/operatorsSlice';

export const store = configureStore({
  reducer: {
    operators: operatorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

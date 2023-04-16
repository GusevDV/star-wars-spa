import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { swapi } from 'shared/api';

export const store = configureStore({
  reducer: {
    [swapi.reducerPath]: swapi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true,
    }).concat(swapi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

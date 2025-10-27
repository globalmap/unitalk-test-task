import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './app/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './app/queryClient';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/GlobalStyles.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)

import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from 'sonner';
import { ThemeProvider } from '../components/theme-provider';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}

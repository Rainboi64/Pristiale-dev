import { ThemeProvider } from './components/theme-provider';
import Home from './Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Test from './Test';
import { LoginForm } from './components/login-form';
import SignUpForm from './components/signup-form';
import Checkout from './components/Checkout/checkout';
import ThankYou from './components/Checkout/thank-you';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/signup',
    element: <SignUpForm />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/thank-you',
    element: <ThankYou />,
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;

import { ThemeProvider } from './components/theme-provider';
import Home from './Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Test from './Test';
import { LoginForm } from './components/login-form';
import SignUpForm from './components/signup-form';
import Checkout from './components/Checkout/checkout';
import ThankYou from './components/Checkout/thank-you';
import './i18n';
import Products from './products/Products';
import ErrorPage from './errorPage';
import ProductPage from './components/Product/ProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/test',
    element: <Test />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignUpForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/thank-you',
    element: <ThankYou />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/products',
    element: <Products />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/product/:productId',
    element: <ProductPage />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider
        fallbackElement={<h1>Seems like something broke.</h1>}
        router={router}
      />
    </ThemeProvider>
  );
};

export default App;

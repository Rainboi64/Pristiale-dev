import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <TooltipProvider>
      <App />
    </TooltipProvider>
    <div className="helvetica">
      <Toaster />
    </div>
  </StrictMode>,
);

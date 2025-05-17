
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Update document title
document.title = 'StraightGreenCard EB1A Application Navigator';

// Initialize the application
const renderApp = () => {
  createRoot(document.getElementById("root")!).render(<App />);
  
  // Hide preloader if it exists (as a backup to the HTML script)
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.parentNode?.removeChild(preloader);
    }, 500);
  }
};

// Render the application
renderApp();

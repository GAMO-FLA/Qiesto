import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/providers/AuthProvider';
import { AppRoutes } from './components/AppRoutes';
import { Toaster } from 'sonner';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;

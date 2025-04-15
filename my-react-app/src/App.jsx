import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import Settings from './pages/Settings';
import Error404 from './pages/errors/Error404';
import Error403 from './pages/errors/Error403';
import Error500 from './pages/errors/Error500';

import AppLayout from './components/ui/AppLayout';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppWithProviders = () => {
  const { themeConfig } = useTheme();
  
  return (
    <ConfigProvider theme={themeConfig}>
      <AntApp>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="project/:id" element={<ProjectDetails />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="/403" element={<Error403 />} />
          <Route path="/500" element={<Error500 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AntApp>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <AppWithProviders />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

import { theme } from 'antd';

const baseTokens = {
  colorPrimary: '#4D96FF',  // Brighter blue for dark mode visibility
  colorSuccess: '#6BCB77', 
  colorWarning: '#FFD93D', 
  colorError: '#FF6B6B', 
  colorInfo: '#4D96FF', 
  borderRadius: 2,  // Reduced border radius for more minimal look
  fontSize: 14, 
  fontSizeSM: 12, 
  fontSizeLG: 16, 
  lineHeight: 1.5, 
  controlHeight: 32, 
};

export const getThemeConfig = (mode) => {
  const algorithm = mode === 'dark' 
    ? theme.darkAlgorithm 
    : theme.defaultAlgorithm;
  
  const themeTokens = {
    ...baseTokens,
    ...(mode === 'dark' ? {
      colorBgContainer: '#1E1E1E',      // Darker background
      colorBgElevated: '#2D2D2D',       // Slightly lighter for elevated elements
      colorBorderSecondary: '#3A3A3A',  // More visible borders
      colorText: 'rgba(255, 255, 255, 0.95)', // Brighter text
      colorTextSecondary: 'rgba(255, 255, 255, 0.65)', // More visible secondary text
    } : {
      colorBgContainer: '#ffffff',
      colorBgElevated: '#fafafa',
      colorBorderSecondary: '#f0f0f0',
      colorText: 'rgba(0, 0, 0, 0.85)',         // Darker text for better visibility
      colorTextSecondary: 'rgba(0, 0, 0, 0.65)', // Darker secondary text
    })
  };
  
  return {
    algorithm,
    token: themeTokens,
    components: {
      Card: {
        colorBorderSecondary: mode === 'dark' ? '#3A3A3A' : '#f0f0f0',
        boxShadow: mode === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none',
      },
      Layout: {
        headerBg: mode === 'dark' ? '#141414' : '#ffffff',
        bodyBg: mode === 'dark' ? '#121212' : '#f9f9f9',
        triggerBg: mode === 'dark' ? '#1E1E1E' : '#ffffff',
        siderBg: mode === 'dark' ? '#121212' : '#ffffff',
      },
      Button: {
        borderRadius: 2,
        colorPrimaryBg: mode === 'dark' ? '#4D96FF' : undefined,
        colorPrimaryHover: mode === 'dark' ? '#69A7FF' : undefined,
      },
      Menu: {
        itemBg: 'transparent',
        itemActiveBg: mode === 'dark' ? 'rgba(77, 150, 255, 0.15)' : '#f0f0f0',
        itemSelectedBg: mode === 'dark' ? 'rgba(77, 150, 255, 0.2)' : '#f0f0f0',
        itemSelectedColor: mode === 'dark' ? '#4D96FF' : undefined,
      },
      Tag: {
        colorBgContainer: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : undefined,
      },
      Typography: {
        colorText: mode === 'dark' ? 'rgba(255, 255, 255, 0.95)' : undefined,
        colorTextSecondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.65)' : undefined,
      },
    }
  };
};

export const getThemeVariables = (mode) => {
  const cssVars = {
    '--bg-color': mode === 'dark' ? '#121212' : '#f9f9f9',
    '--card-bg': mode === 'dark' ? '#1E1E1E' : '#ffffff',
    '--text-color': mode === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.75)',
    '--text-secondary': mode === 'dark' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.45)',
    '--border-color': mode === 'dark' ? '#3A3A3A' : '#f0f0f0',
    '--shadow': mode === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none',
    '--primary-color': baseTokens.colorPrimary,
    '--success-color': baseTokens.colorSuccess,
    '--warning-color': baseTokens.colorWarning,
    '--error-color': baseTokens.colorError,
  };
  
  return cssVars;
};

export const customStyles = {
  pageContainer: {
    padding: '32px',
    minHeight: 'calc(100vh - 64px)',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 64,
    boxShadow: 'none',
    borderBottom: '1px solid var(--border-color)',
  },
  logo: {
    height: '32px',
    margin: '16px',
    color: 'var(--primary-color)',
    fontSize: '18px',
    fontWeight: '400',
  },
  priorityColors: {
    low: '#6BCB77',     
    medium: '#FFD93D',  
    high: '#FF6B6B',    
  },
  
  statusColors: {
    todo: '#4D96FF',    // Brighter blue for better visibility
    doing: '#FFD93D',   // Brighter yellow
    done: '#6BCB77',    // Brighter green
  },
  
  // Kanban board styling
  kanbanColumn: {
    flex: 1,
    minWidth: '280px',
    maxWidth: '350px',
    borderRadius: '4px',
    padding: '16px',
    marginRight: '16px',
  },
  
  // Task card styling in dark mode
  taskCard: {
    darkMode: {
      backgroundColor: '#2D2D2D',
      border: '1px solid #3A3A3A',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    lightMode: {
      backgroundColor: '#fff',
      border: '1px solid #f0f0f0',
      boxShadow: 'none',
    }
  },
  
  // Status tag styling for better visibility
  statusTag: {
    todo: {
      backgroundColor: 'rgba(77, 150, 255, 0.15)',
      color: '#4D96FF',
      border: '1px solid rgba(77, 150, 255, 0.3)',
      fontWeight: 'bold',
    },
    doing: {
      backgroundColor: 'rgba(255, 217, 61, 0.15)',
      color: '#FFD93D',
      border: '1px solid rgba(255, 217, 61, 0.3)',
      fontWeight: 'bold',
    },
    done: {
      backgroundColor: 'rgba(107, 203, 119, 0.15)',
      color: '#6BCB77',
      border: '1px solid rgba(107, 203, 119, 0.3)',
      fontWeight: 'bold',
    }
  }
}; 
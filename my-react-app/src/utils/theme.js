import { theme } from 'antd';

const baseTokens = {
  colorPrimary: '#1890ff', 
  colorSuccess: '#52c41a', 
  colorWarning: '#faad14', 
  colorError: '#f5222d', 
  colorInfo: '#1890ff', 
  borderRadius: 4, 
  fontSize: 14, 
  fontSizeSM: 12, 
  fontSizeLG: 16, 
  lineHeight: 1.5715, 
  controlHeight: 32, 
};

export const getThemeConfig = (mode) => {
  const algorithm = mode === 'dark' 
    ? theme.darkAlgorithm 
    : theme.defaultAlgorithm;
  
  const themeTokens = {
    ...baseTokens,
    ...(mode === 'dark' ? {
      colorBgContainer: '#1f1f1f',
      colorBgElevated: '#303030',
      colorBorderSecondary: '#303030',
    } : {})
  };
  
  return {
    algorithm,
    token: themeTokens,
    components: {
      Card: {
        colorBorderSecondary: mode === 'dark' ? '#303030' : '#f0f0f0',
      },
      Layout: {
        colorBgHeader: mode === 'dark' ? '#141414' : '#fff',
        colorBgBody: mode === 'dark' ? '#141414' : '#f0f2f5',
        colorBgTrigger: mode === 'dark' ? '#1f1f1f' : '#fff',
      },
    }
  };
};

export const getThemeVariables = (mode) => {
  const cssVars = {
    '--bg-color': mode === 'dark' ? '#141414' : '#f0f2f5',
    '--card-bg': mode === 'dark' ? '#1f1f1f' : '#fff',
    '--text-color': mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
    '--text-secondary': mode === 'dark' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
    '--border-color': mode === 'dark' ? '#303030' : '#f0f0f0',
    '--shadow': mode === 'dark' 
      ? '0 1px 2px 0 rgba(0, 0, 0, 0.8)'
      : '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    '--primary-color': baseTokens.colorPrimary,
    '--success-color': baseTokens.colorSuccess,
    '--warning-color': baseTokens.colorWarning,
    '--error-color': baseTokens.colorError,
  };
  
  return cssVars;
};

export const customStyles = {
  pageContainer: {
    padding: '24px',
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
  },
  logo: {
    height: '32px',
    margin: '16px',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  priorityColors: {
    low: '#52c41a',     
    medium: '#faad14',  
    high: '#f5222d',    
  },
  
  statusColors: {
    todo: '#1890ff',    
    doing: '#faad14',   
    done: '#52c41a',    
  }
}; 
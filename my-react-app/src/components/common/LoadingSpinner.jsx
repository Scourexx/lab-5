import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingSpinner = ({ 
  size = 'default', 
  fullPage = false,
  tip = 'Loading...',
  children = null,
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size === 'large' ? 40 : 24 }} spin />;
  
  if (fullPage) {
    return (
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9999,
        }}
      >
        <Spin 
          indicator={antIcon} 
          size={size} 
          tip={tip}
        />
      </div>
    );
  }
  
  if (children) {
    return (
      <Spin 
        indicator={antIcon} 
        size={size} 
        tip={tip}
      >
        {children}
      </Spin>
    );
  }
  
  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '40px 0',
      }}
    >
      <Spin 
        indicator={antIcon} 
        size={size} 
        tip={tip}
      />
    </div>
  );
};

export default LoadingSpinner; 
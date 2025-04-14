import { Space, Typography, Button, Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const PageHeader = ({
  title,
  subtitle,
  extra,
  backButton = false,
  onBack,
  actions,
  tags,
}) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  
  return (
    <div
      style={{
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: subtitle ? '8px' : '0',
        }}
      >
        <Space align="center">
          {backButton && (
            <Tooltip title="Back">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
                style={{ marginRight: '8px' }}
              />
            </Tooltip>
          )}
          <Title
            level={3}
            style={{ margin: 0 }}
          >
            {title}
          </Title>
          {tags && <Space>{tags}</Space>}
        </Space>
        
        {extra && (
          <div>{extra}</div>
        )}
      </div>
      
      {subtitle && (
        <Text
          type="secondary"
          style={{ marginBottom: '16px' }}
        >
          {subtitle}
        </Text>
      )}
      
      {actions && (
        <div style={{ marginTop: '16px' }}>
          <Space wrap>{actions}</Space>
        </div>
      )}
    </div>
  );
};

export default PageHeader; 
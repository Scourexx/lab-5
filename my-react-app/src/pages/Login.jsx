import { Form, Input, Button, Checkbox, Card, Typography, Space, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const success = await login(values.username, values.password);
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: isDarkMode ? '#141414' : '#f0f2f5',
      }}
    >
      <Card
        style={{
          width: 400,
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ margin: 0 }}>
            Project Management
          </Title>
          <Text type="secondary">Sign in to access your dashboard</Text>
        </div>
        
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label={t('username')}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
          </Form.Item>
          
          <Form.Item
            name="password"
            label={t('password')}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t('rememberMe')}</Checkbox>
            </Form.Item>
          </Form.Item>
          
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              {t('login')}
            </Button>
          </Form.Item>
        </Form>
        
        <Divider plain>Demo Access</Divider>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text>For demonstration, use any username and password.</Text>
          <Text type="secondary">Username "admin" gets admin privileges.</Text>
        </Space>
        
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Button
            type="link"
            onClick={toggleTheme}
          >
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login; 
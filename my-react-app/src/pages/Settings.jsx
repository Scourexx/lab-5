import { useState } from 'react';
import { Card, Typography, Switch, Radio, Divider, Form, Select, Button, message, Row, Col } from 'antd';
import { BulbOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/common/PageHeader';

const { Title, Text } = Typography;
const { Option } = Select;

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, changeLanguage, availableLanguages, t } = useLanguage();
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  
  // Handle form submission
  const handleSubmit = (values) => {
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      // Update theme if changed
      if (values.theme === 'dark' !== isDarkMode) {
        toggleTheme();
      }
      
      // Update language if changed
      if (values.language !== language) {
        changeLanguage(values.language);
      }
      
      message.success(t('saveSuccess'));
      setSaving(false);
    }, 500);
  };
  
  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <PageHeader
        title={t('settings')}
        subtitle="Configure your application preferences"
      />
      
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          theme: isDarkMode ? 'dark' : 'light',
          language: language,
        }}
        onFinish={handleSubmit}
        style={{ width: '100%' }}
      >
        <Row gutter={24}>
          <Col xs={24} md={24} lg={24}>
            <Card style={{ marginBottom: '24px', width: '100%' }}>
              <Title level={4}>
                <UserOutlined style={{ marginRight: '8px' }} />
                User Information
              </Title>
              <Divider />
              
              <div style={{ marginBottom: '24px' }}>
                <Text strong style={{ marginRight: '8px' }}>Username:</Text>
                <Text>{user?.username || 'Guest'}</Text>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <Text strong style={{ marginRight: '8px' }}>Role:</Text>
                <Text>{user?.role || 'Guest'}</Text>
              </div>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card style={{ marginBottom: '24px', height: '100%' }}>
              <Title level={4}>
                <BulbOutlined style={{ marginRight: '8px' }} />
                {t('theme')}
              </Title>
              <Divider />
              
              <Form.Item name="theme" label="Select Theme">
                <Radio.Group>
                  <Radio.Button value="light">
                    {t('lightMode')}
                  </Radio.Button>
                  <Radio.Button value="dark">
                    {t('darkMode')}
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
              
              <Text type="secondary">
                Choose between light and dark mode for the application interface.
              </Text>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card style={{ marginBottom: '24px', height: '100%' }}>
              <Title level={4}>
                <GlobalOutlined style={{ marginRight: '8px' }} />
                {t('language')}
              </Title>
              <Divider />
              
              <Form.Item name="language" label="Select Language">
                <Select style={{ width: '100%', maxWidth: '200px' }}>
                  {availableLanguages.map(lang => (
                    <Option key={lang.value} value={lang.value}>
                      {lang.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Text type="secondary">
                Choose your preferred language for the application interface.
              </Text>
            </Card>
          </Col>
        </Row>
        
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={saving}
            size="large"
          >
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings; 
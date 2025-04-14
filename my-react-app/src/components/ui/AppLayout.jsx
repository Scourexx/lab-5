import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown, Space, Avatar, Switch, Typography } from 'antd';
import {
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  GlobalOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { customStyles } from '../../utils/theme';
import { languageOptions } from '../../utils/i18n';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const languageMenuItems = languageOptions.map(lang => ({
    key: lang.value,
    label: lang.label,
    onClick: () => setLanguage(lang.value),
  }));
  
  const userMenuItems = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('common.settings'),
      onClick: () => navigate('/settings'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('common.logout'),
      onClick: handleLogout,
    },
  ];
  
  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: t('common.dashboard'),
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: t('common.settings'),
    },
  ];
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme={theme}
        style={{ 
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
        }}
      >
        <div style={customStyles.logo}>
          {!collapsed ? t('common.appName') : 'TM'}
        </div>
        <Menu
          theme={theme}
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{
          ...customStyles.header,
          backgroundColor: theme === 'dark' ? '#141414' : '#fff',
          boxShadow: theme === 'dark' 
            ? '0 1px 2px 0 rgba(0, 0, 0, 0.03)' 
            : '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ marginRight: 16 }}
          />
          <div style={{ flex: '1 1 0%' }}></div>
          <Space style={{ marginRight: 16 }}>
            <Switch 
              checked={theme === 'dark'}
              onChange={toggleTheme}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
            />
            <Dropdown menu={{ items: languageMenuItems }} placement="bottomRight">
              <Button icon={<GlobalOutlined />}>
                {language.toUpperCase()}
              </Button>
            </Dropdown>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <Text>{user?.username}</Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content style={customStyles.pageContainer}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;   
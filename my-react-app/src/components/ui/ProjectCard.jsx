import { Card, Tag, Button, Tooltip, Space, Typography, Progress } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/i18n';
import { useTheme } from '../../context/ThemeContext';

const { Title, Text } = Typography;

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { allTasks } = useSelector(state => state.tasks);
  const { isDarkMode } = useTheme();
  
  const projectTasks = allTasks.filter(task => task.projectId === project.id);
  const completedTasks = projectTasks.filter(task => task.status === 'done');
  const progressPercent = projectTasks.length > 0 
    ? Math.round((completedTasks.length / projectTasks.length) * 100) 
    : 0;
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'blue';
      case 'completed':
        return 'green';
      case 'planned':
        return 'orange';
      default:
        return 'default';
    }
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  };
  
  const handleViewProject = () => {
    navigate(`/project/${project.id}`);
  };
  
  return (
    <Card
      hoverable
      style={{ 
        marginBottom: 16,
        border: '1px solid var(--border-color)',
        boxShadow: 'none',
        borderRadius: '2px'
      }}
      bodyStyle={{ padding: '16px' }}
      actions={[
        <Tooltip title={t('editTask')} key="edit">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => onEdit(project)} 
          />
        </Tooltip>,
        <Tooltip title="View Details" key="view">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={handleViewProject} 
          />
        </Tooltip>,
        <Tooltip title={t('deleteTask')} key="delete">
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            onClick={() => onDelete(project.id)} 
            danger 
          />
        </Tooltip>,
      ]}
    >
      <Title level={4} style={{ 
        margin: '0 0 8px 0', 
        fontSize: '18px',
        color: isDarkMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.85)'
      }}>
        {project.name}
      </Title>
      <Text type="secondary" style={{ 
        fontSize: '14px',
        color: isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)'
      }}>
        {project.description}
      </Text>
      
      <div style={{ margin: '16px 0' }}>
        <Progress 
          percent={progressPercent} 
          size="small" 
          strokeColor="#2E4057"
          trailColor={isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#f0f0f0"}
          showInfo={false}
        />
        <Text style={{ 
          fontSize: '12px', 
          color: isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)'
        }}>
          {progressPercent}% complete
        </Text>
      </div>
      
      <Space direction="vertical" style={{ width: '100%' }} size={4}>
        <Space wrap size={4}>
          <Tag color={getStatusColor(project.status)} style={{ borderRadius: '2px', fontSize: '12px' }}>
            {project.status.toUpperCase()}
          </Tag>
          <Tag color={getPriorityColor(project.priority)} style={{ borderRadius: '2px', fontSize: '12px' }}>
            {t(project.priority)}
          </Tag>
        </Space>
        
        <Space style={{ width: '100%', justifyContent: 'space-between', fontSize: '12px' }}>
          <Text type="secondary" style={{ 
            fontSize: '12px',
            color: isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)'
          }}>
            {formatDate(project.startDate, language)} - {formatDate(project.endDate, language)}
          </Text>
          <Text style={{ 
            fontSize: '12px',
            color: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)'
          }}>
            {projectTasks.length} {t('tasks')}
          </Text>
        </Space>
      </Space>
    </Card>
  );
};

export default ProjectCard; 
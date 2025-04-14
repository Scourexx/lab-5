import { Card, Tag, Button, Tooltip, Space, Typography, Progress } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/i18n';

const { Title, Text } = Typography;

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { allTasks } = useSelector(state => state.tasks);
  
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
      style={{ marginBottom: 16 }}
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
      <Title level={4}>{project.name}</Title>
      <Text type="secondary">{project.description}</Text>
      
      <div style={{ marginTop: 16, marginBottom: 16 }}>
        <Progress percent={progressPercent} size="small" />
      </div>
      
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space wrap>
          <Tag color={getStatusColor(project.status)}>
            {project.status.toUpperCase()}
          </Tag>
          <Tag color={getPriorityColor(project.priority)}>
            {t(project.priority)}
          </Tag>
        </Space>
        
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Text type="secondary">
            {formatDate(project.startDate, language)} - {formatDate(project.endDate, language)}
          </Text>
          <Text>
            {projectTasks.length} {t('tasks')}
          </Text>
        </Space>
      </Space>
    </Card>
  );
};

export default ProjectCard; 
import { Card, Tag, Avatar, Typography, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { formatDate } from '../../utils/i18n';
import { customStyles } from '../../utils/theme';

const { Text, Paragraph } = Typography;

const TaskCard = ({ task, index, onEdit, onDelete }) => {
  const { language, t } = useLanguage();
  const { isDarkMode } = useTheme();
  
  const getPriorityColor = (priority) => {
    return customStyles.priorityColors[priority] || '#4D96FF';
  };
  
  const getStatusTagStyle = (status) => {
    if (isDarkMode) {
      return customStyles.statusTag[status] || {};
    } else {
      // Light mode specific styles
      switch(status) {
        case 'todo':
          return { backgroundColor: '#E6F7FF', color: '#1677FF', border: '1px solid #91CAFF' };
        case 'doing':
          return { backgroundColor: '#FFF7E6', color: '#FA8C16', border: '1px solid #FFD591' };
        case 'done':
          return { backgroundColor: '#F6FFED', color: '#52C41A', border: '1px solid #B7EB8F' };
        default:
          return {};
      }
    }
  };
  
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            marginBottom: '12px'
          }}
        >
          <Card
            size="small"
            style={{
              ...(isDarkMode ? customStyles.taskCard.darkMode : customStyles.taskCard.lightMode),
              ...(snapshot.isDragging ? { 
                boxShadow: isDarkMode 
                  ? '0 5px 15px rgba(0, 0, 0, 0.5)' 
                  : '0 5px 15px rgba(0, 0, 0, 0.1)'
              } : {}),
              borderLeft: `3px solid ${getPriorityColor(task.priority)}`,
              transition: 'all 0.2s ease',
            }}
            actions={[
              <Tooltip title={t('tasks.edit')} key="edit">
                <EditOutlined key="edit" onClick={() => onEdit(task)} />
              </Tooltip>,
              <Tooltip title={t('tasks.delete')} key="delete">
                <DeleteOutlined key="delete" onClick={() => onDelete(task.id)} style={{ color: isDarkMode ? '#FF6B6B' : '#f5222d' }} />
              </Tooltip>,
            ]}
          >
            <Paragraph 
              strong 
              ellipsis={{ rows: 2 }}
              style={{ 
                margin: 0, 
                fontSize: '14px', 
                color: isDarkMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.85)',
                fontWeight: 500
              }}
            >
              {task.title}
            </Paragraph>
            
            <Paragraph 
              type="secondary" 
              ellipsis={{ rows: 2 }}
              style={{ 
                fontSize: '12px', 
                marginTop: '4px', 
                marginBottom: '8px',
                color: isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)'
              }}
            >
              {task.description}
            </Paragraph>
            
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Space>
                <Tag 
                  style={getStatusTagStyle(task.status)}
                  color={!isDarkMode && !getStatusTagStyle(task.status).color ? task.status === 'todo' ? 'blue' : task.status === 'doing' ? 'orange' : 'green' : undefined}
                >
                  {t(`tasks.status.${task.status}`) || task.status.toUpperCase()}
                </Tag>
                <Tag color={getPriorityColor(task.priority)}>
                  {t(`projects.${task.priority}`) || task.priority}
                </Tag>
                {task.dueDate && (
                  <Text type="secondary" style={{ 
                    fontSize: '12px',
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)' 
                  }}>
                    <CalendarOutlined style={{ marginRight: '4px' }} />
                    {formatDate(task.dueDate, language)}
                  </Text>
                )}
              </Space>
              
              {task.assignee && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    size="small" 
                    style={{ 
                      marginRight: '8px', 
                      backgroundColor: isDarkMode ? '#4D96FF' : '#1890ff',
                      color: 'white' 
                    }}
                  >
                    {getInitials(task.assignee)}
                  </Avatar>
                  <Text style={{ 
                    fontSize: '12px',
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)' 
                  }}>
                    {task.assignee}
                  </Text>
                </div>
              )}
            </Space>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard; 
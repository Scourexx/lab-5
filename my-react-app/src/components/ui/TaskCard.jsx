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
    return customStyles.priorityColors[priority] || '#1890ff';
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
              ...customStyles.taskCard,
              ...(snapshot.isDragging ? customStyles.taskCardDragging : {}),
              borderLeft: `3px solid ${getPriorityColor(task.priority)}`,
              backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
            }}
            actions={[
              <Tooltip title={t('editTask')} key="edit">
                <EditOutlined key="edit" onClick={() => onEdit(task)} />
              </Tooltip>,
              <Tooltip title={t('deleteTask')} key="delete">
                <DeleteOutlined key="delete" onClick={() => onDelete(task.id)} style={{ color: '#f5222d' }} />
              </Tooltip>,
            ]}
          >
            <Paragraph 
              strong 
              ellipsis={{ rows: 2 }}
              style={{ margin: 0, fontSize: '14px', color: isDarkMode ? '#fff' : 'inherit' }}
            >
              {task.title}
            </Paragraph>
            
            <Paragraph 
              type="secondary" 
              ellipsis={{ rows: 2 }}
              style={{ fontSize: '12px', marginTop: '4px', marginBottom: '8px' }}
            >
              {task.description}
            </Paragraph>
            
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Space>
                <Tag color={getPriorityColor(task.priority)}>
                  {t(task.priority)}
                </Tag>
                {task.dueDate && (
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    <CalendarOutlined style={{ marginRight: '4px' }} />
                    {formatDate(task.dueDate, language)}
                  </Text>
                )}
              </Space>
              
              {task.assignee && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    size="small" 
                    style={{ marginRight: '8px', backgroundColor: '#1890ff' }}
                  >
                    {getInitials(task.assignee)}
                  </Avatar>
                  <Text style={{ fontSize: '12px' }}>{task.assignee}</Text>
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
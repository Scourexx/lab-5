import { Typography, Badge } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { customStyles } from '../../utils/theme';

const { Title } = Typography;

const StatusColumn = ({ status, tasks, onEditTask, onDeleteTask }) => {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  
  const getStatusColor = (status) => {
    return customStyles.statusColors[status] || '#4D96FF';
  };
  
  const getStatusLabel = (status) => {
    switch(status) {
      case 'todo':
        return t('tasks.status.todo') || 'To Do';
      case 'doing':
        return t('tasks.status.doing') || 'In Progress';
      case 'done':
        return t('tasks.status.done') || 'Done';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  
  return (
    <div 
      style={{
        ...customStyles.kanbanColumn,
        backgroundColor: isDarkMode ? '#222222' : '#f7f7f7',
        border: isDarkMode ? '1px solid #3A3A3A' : '1px solid #e8e8e8',
        boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div style={{ 
        marginBottom: '16px', 
        display: 'flex', 
        alignItems: 'center',
        padding: '0 4px' 
      }}>
        <Badge 
          color={getStatusColor(status)} 
          style={{ 
            marginRight: '8px',
            width: '10px',
            height: '10px' 
          }} 
        />
        <Title level={4} style={{ 
          margin: 0,
          color: isDarkMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.85)'
        }}>
          {getStatusLabel(status)}
          <span style={{ 
            marginLeft: '8px', 
            fontSize: '14px', 
            opacity: 0.7,
            backgroundColor: isDarkMode ? 'rgba(77, 150, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            padding: '1px 6px',
            borderRadius: '10px',
            color: isDarkMode ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.75)'
          }}>
            {tasks.length}
          </span>
        </Title>
      </div>
      
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: '500px',
              backgroundColor: snapshot.isDraggingOver
                ? (isDarkMode ? 'rgba(77, 150, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)')
                : 'transparent',
              transition: 'background-color 0.2s ease',
              padding: '8px 4px',
              borderRadius: '4px',
            }}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default StatusColumn; 
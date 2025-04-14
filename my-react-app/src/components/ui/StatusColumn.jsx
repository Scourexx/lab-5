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
    return customStyles.statusColors[status] || '#1890ff';
  };
  
  const getStatusLabel = (status) => {
    return t(status);
  };
  
  return (
    <div 
      style={{
        ...customStyles.kanbanColumn,
        backgroundColor: isDarkMode ? '#1f1f1f' : '#f7f7f7',
      }}
    >
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
        <Badge 
          color={getStatusColor(status)} 
          style={{ marginRight: '8px' }} 
        />
        <Title level={4} style={{ margin: 0 }}>
          {getStatusLabel(status)}
          <span style={{ marginLeft: '8px', fontSize: '14px', opacity: 0.7 }}>
            ({tasks.length})
          </span>
        </Title>
      </div>
      
      <Droppable droppableId={status} isDropDisabled={false} isCombineEnabled={false}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: '500px',
              backgroundColor: snapshot.isDraggingOver
                ? (isDarkMode ? '#252525' : '#f0f0f0')
                : 'transparent',
              transition: 'background-color 0.2s ease',
              padding: '8px 0',
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
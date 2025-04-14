import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { 
  Row, 
  Col, 
  Card, 
  Tag, 
  Button, 
  Modal, 
  Typography, 
  Descriptions, 
  Space, 
  Alert,
  Statistic, 
  Divider,
  App,
  Empty,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { 
  selectProject, 
  updateProject, 
  deleteProject 
} from '../redux/projectsSlice';
import { 
  fetchTasksByProject, 
  moveTask, 
  addTask, 
  updateTask, 
  deleteTask,
} from '../redux/tasksSlice';
import { useLanguage } from '../context/LanguageContext';
import { formatDate } from '../utils/i18n';
import PageHeader from '../components/common/PageHeader';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatusColumn from '../components/ui/StatusColumn';
import ProjectForm from '../components/ui/ProjectForm';
import TaskForm from '../components/ui/TaskForm';
import { customStyles } from '../utils/theme';

const { Text } = Typography;
const { confirm } = Modal;

const PROJECT_STATUSES = ['todo', 'doing', 'done'];

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { language, t } = useLanguage();
  const { message, modal } = App.useApp();
  
  const { projects, loading: projectsLoading, error: projectsError } = useSelector(state => state.projects);
  const { projectTasks, loading: tasksLoading, error: tasksError } = useSelector(state => state.tasks);
  
  const [project, setProject] = useState(null);
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  useEffect(() => {
    if (projects.length > 0) {
      const foundProject = projects.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
        dispatch(selectProject(foundProject));
      } else {
        navigate('/dashboard');
      }
    }
  }, [id, projects, dispatch, navigate]);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchTasksByProject(id));
    }
  }, [id, dispatch]);
  
  const showProjectModal = () => {
    setIsProjectModalVisible(true);
  };
  
  const handleProjectModalCancel = () => {
    setIsProjectModalVisible(false);
  };
  
  const handleProjectFormSubmit = (values) => {
    dispatch(updateProject(values));
    setIsProjectModalVisible(false);
    message.success(t('projects.updateSuccess'));
  };
  
  const showTaskModal = (task = null) => {
    setEditingTask(task);
    setIsTaskModalVisible(true);
  };
  
  const handleTaskModalCancel = () => {
    setIsTaskModalVisible(false);
    setEditingTask(null);
  };
  
  const handleTaskFormSubmit = (values) => {
    if (editingTask) {
      dispatch(updateTask(values));
    } else {
      dispatch(addTask({ ...values, projectId: id }));
    }
    setIsTaskModalVisible(false);
    setEditingTask(null);
    message.success(t('tasks.updateSuccess'));
  };
  
  const handleDeleteTask = (taskId) => {
    modal.confirm({
      title: t('deleteConfirm'),
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deleteTask(taskId));
        message.success(t('tasks.deleteSuccess'));
      },
    });
  };
  
  const handleDeleteProject = () => {
    modal.confirm({
      title: 'Are you sure you want to delete this project?',
      content: 'This will also delete all associated tasks.',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteProject(id))
          .unwrap()
          .then(() => {
            message.success(t('projects.deleteSuccess'));
            navigate('/dashboard');
          })
          .catch((error) => {
            message.error(error.message || t('projects.deleteError'));
          });
      },
    });
  };
  
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    if (destination.droppableId !== source.droppableId) {
      dispatch(moveTask({
        taskId: draggableId,
        newStatus: destination.droppableId,
      }));
    }
  };
  
  const getTasksByStatus = (status) => {
    return projectTasks.filter(task => task.status === status);
  };
  
  if (projectsLoading || tasksLoading) {
    return <LoadingSpinner />;
  }
  
  if (projectsError || tasksError) {
    return (
      <Alert
        message="Error"
        description={projectsError || tasksError}
        type="error"
        showIcon
      />
    );
  }
  
  if (!project) {
    return (
      <Empty 
        description={t('projects.notFound')}
        style={{ marginTop: '120px' }}
      >
        <Button type="primary" onClick={() => navigate('/dashboard')}>
          {t('common.backToDashboard')}
        </Button>
      </Empty>
    );
  }
  
  const totalTasks = projectTasks.length;
  const completedTasks = projectTasks.filter(task => task.status === 'done').length;
  const progressPercent = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
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
  
  return (
    <div>
      <PageHeader
        title={project.name}
        subtitle={project.description}
        backButton
        tags={
          <Tag color={getStatusColor(project.status)}>
            {project.status.toUpperCase()}
          </Tag>
        }
        extra={
          <Space>
            <Button 
              icon={<EditOutlined />} 
              onClick={showProjectModal}
            >
              Edit Project
            </Button>
            <Button 
              type="primary" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={handleDeleteProject}
            >
              Delete Project
            </Button>
          </Space>
        }
      />
      
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16}>
          <Col xs={24} md={16}>
            <Descriptions 
              bordered 
              size="small" 
              column={{ xs: 1, sm: 2 }}
            >
              <Descriptions.Item label="Status">
                <Tag color={getStatusColor(project.status)}>
                  {project.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Priority">
                <Tag color={project.priority === 'high' ? 'red' : project.priority === 'medium' ? 'orange' : 'green'}>
                  {t(project.priority)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Start Date">
                {formatDate(project.startDate, language)}
              </Descriptions.Item>
              <Descriptions.Item label="End Date">
                {formatDate(project.endDate, language)}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Statistic
                title="Completion"
                value={progressPercent}
                suffix="%"
                valueStyle={{ 
                  color: progressPercent > 80 ? '#52c41a' : progressPercent > 50 ? '#1890ff' : '#faad14'
                }}
              />
            </div>
          </Col>
        </Row>
      </Card>
      
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Title level={4}>Tasks</Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showTaskModal()}>
          {t('addTask')}
        </Button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', overflowX: 'auto', padding: '8px 0' }}>
          {PROJECT_STATUSES.map(status => (
            <StatusColumn
              key={status}
              status={status}
              tasks={getTasksByStatus(status)}
              onEditTask={showTaskModal}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </DragDropContext>
      
      <Modal
        title="Edit Project"
        open={isProjectModalVisible}
        onCancel={handleProjectModalCancel}
        footer={null}
        destroyOnClose
      >
        <ProjectForm
          initialValues={project}
          onFinish={handleProjectFormSubmit}
          onCancel={handleProjectModalCancel}
          loading={projectsLoading}
        />
      </Modal>
      
      <Modal
        title={editingTask ? t('editTask') : t('addTask')}
        open={isTaskModalVisible}
        onCancel={handleTaskModalCancel}
        footer={null}
        destroyOnClose
      >
        <TaskForm
          initialValues={editingTask}
          projectId={id}
          onFinish={handleTaskFormSubmit}
          onCancel={handleTaskModalCancel}
          loading={tasksLoading}
        />
      </Modal>
    </div>
  );
};

export default ProjectDetails; 
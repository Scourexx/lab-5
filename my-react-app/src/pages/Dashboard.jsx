import { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Button, Input, Select, Empty, Modal, Alert } from 'antd';
import {
  PlusOutlined,
  FilterOutlined,
  FundProjectionScreenOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, addProject, updateProject, deleteProject, setFilterCriteria, clearFilters } from '../redux/projectsSlice';
import { fetchTasks } from '../redux/tasksSlice';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import PageHeader from '../components/common/PageHeader';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectForm from '../components/ui/ProjectForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const { Search } = Input;
const { Option } = Select;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const { projects, filteredProjects, loading, error } = useSelector(state => state.projects);
  const { allTasks } = useSelector(state => state.tasks);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState(null);
  
  // Fetch projects and tasks when the component mounts
  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
    dispatch(clearFilters()); // Reset filters on mount
  }, [dispatch]);
  
  // Apply filters when they change
  useEffect(() => {
    dispatch(setFilterCriteria({
      status: statusFilter,
      priority: priorityFilter,
      searchQuery: searchQuery
    }));
  }, [dispatch, searchQuery, statusFilter, priorityFilter]);
  
  const showModal = (project = null) => {
    setEditingProject(project);
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProject(null);
  };
  
  const handleFormSubmit = (values) => {
    if (editingProject) {
      dispatch(updateProject({ ...values, id: editingProject.id }));
    } else {
      dispatch(addProject(values));
    }
    setIsModalVisible(false);
    setEditingProject(null);
  };
  
  const handleDeleteProject = (projectId) => {
    Modal.confirm({
      title: t('deleteConfirm'),
      onOk: () => {
        dispatch(deleteProject(projectId));
      },
    });
  };
  
  const handleSearch = (value) => {
    setSearchQuery(value);
  };
  
  const handleStatusChange = (value) => {
    setStatusFilter(value === 'all' ? null : value);
  };
  
  const handlePriorityChange = (value) => {
    setPriorityFilter(value === 'all' ? null : value);
  };
  
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.status === 'done').length;
  
  const displayedProjects = filteredProjects;
  
  // Custom statistic title style to ensure visibility in light mode
  const statisticTitleStyle = {
    color: isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)'
  };
  
  return (
    <div>
      <PageHeader
        title={t('dashboard.title')}
        subtitle={t('dashboard.projects')}
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
          >
            {t('projects.actions.add')}
          </Button>
        }
      />
      
      {error && (
        <Alert 
          message="Error" 
          description={error} 
          type="error" 
          showIcon 
          style={{ marginBottom: '24px' }} 
        />
      )}
      
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title={<span style={statisticTitleStyle}>Total Projects</span>}
              value={projects.length}
              prefix={<FundProjectionScreenOutlined />}
              valueStyle={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.95)' : undefined }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title={<span style={statisticTitleStyle}>Active Projects</span>}
              value={activeProjects}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title={<span style={statisticTitleStyle}>Completed Projects</span>}
              value={completedProjects}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title={<span style={statisticTitleStyle}>Task Completion</span>}
              value={totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}
              suffix="%"
              precision={0}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>
      
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={8} md={10} lg={12}>
            <Search
              placeholder="Search projects"
              allowClear
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={12} sm={8} md={7} lg={6}>
            <Select
              placeholder="Status"
              style={{ width: '100%' }}
              value={statusFilter}
              onChange={handleStatusChange}
              allowClear
            >
              <Option value="all">All Statuses</Option>
              <Option value="active">Active</Option>
              <Option value="completed">Completed</Option>
              <Option value="planned">Planned</Option>
            </Select>
          </Col>
          <Col xs={12} sm={8} md={7} lg={6}>
            <Select
              placeholder="Priority"
              style={{ width: '100%' }}
              value={priorityFilter}
              onChange={handlePriorityChange}
              allowClear
            >
              <Option value="all">All Priorities</Option>
              <Option value="low">{t('projects.low')}</Option>
              <Option value="medium">{t('projects.medium')}</Option>
              <Option value="high">{t('projects.high')}</Option>
            </Select>
          </Col>
        </Row>
      </Card>
      
      {loading ? (
        <LoadingSpinner />
      ) : displayedProjects && displayedProjects.length > 0 ? (
        <Row gutter={16}>
          {displayedProjects.map(project => (
            <Col xs={24} sm={12} lg={8} key={project.id}>
              <ProjectCard
                project={project}
                onEdit={showModal}
                onDelete={handleDeleteProject}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description={t('projects.empty')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
      
      <Modal
        title={editingProject ? t('projects.actions.edit') : t('projects.actions.add')}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <ProjectForm
          initialValues={editingProject}
          onFinish={handleFormSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Dashboard; 
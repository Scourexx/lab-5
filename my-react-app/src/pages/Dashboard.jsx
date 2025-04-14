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
import { fetchProjects, addProject, updateProject, deleteProject, setFilterCriteria } from '../redux/projectsSlice';
import { fetchTasks } from '../redux/tasksSlice';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/common/PageHeader';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectForm from '../components/ui/ProjectForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useFilteredProjects from '../hooks/useFilteredProjects';

const { Search } = Input;
const { Option } = Select;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const { projects, filterCriteria, loading, error } = useSelector(state => state.projects);
  const { allTasks } = useSelector(state => state.tasks);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  const displayedProjects = useFilteredProjects(projects, filterCriteria);
  
  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }, [dispatch]);
  
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
      dispatch(updateProject(values));
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
  
  const handleFilterChange = (key, value) => {
    dispatch(setFilterCriteria({ [key]: value }));
  };
  
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.status === 'done').length;
  
  return (
    <div>
      <PageHeader
        title={t('dashboard')}
        subtitle={t('projectOverview')}
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
          >
            Add Project
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
              title="Total Projects"
              value={projects.length}
              prefix={<FundProjectionScreenOutlined />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="Active Projects"
              value={activeProjects}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="Completed Projects"
              value={completedProjects}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="Task Completion"
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
              value={filterCriteria.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={12} sm={8} md={7} lg={6}>
            <Select
              placeholder="Status"
              style={{ width: '100%' }}
              value={filterCriteria.status}
              onChange={(value) => handleFilterChange('status', value)}
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
              value={filterCriteria.priority}
              onChange={(value) => handleFilterChange('priority', value)}
            >
              <Option value="all">All Priorities</Option>
              <Option value="low">{t('low')}</Option>
              <Option value="medium">{t('medium')}</Option>
              <Option value="high">{t('high')}</Option>
            </Select>
          </Col>
        </Row>
      </Card>
      
      {loading ? (
        <LoadingSpinner />
      ) : displayedProjects.length > 0 ? (
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
          description="No projects found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
      
      <Modal
        title={editingProject ? "Edit Project" : "Add Project"}
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
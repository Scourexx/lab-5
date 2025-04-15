import { Form, Input, Select, DatePicker, Button, Space } from 'antd';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { getStatusOptions, getPriorityOptions } from '../../utils/i18n';

const { TextArea } = Input;

const TaskForm = ({ initialValues, projectId, onFinish, onCancel, loading }) => {
  const { language, t } = useLanguage();
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (initialValues) {
      const formattedValues = {
        ...initialValues,
        dueDate: initialValues.dueDate ? dayjs(initialValues.dueDate) : undefined,
      };
      form.setFieldsValue(formattedValues);
    } else {
      form.resetFields();
      if (projectId) {
        form.setFieldsValue({ projectId });
      }
    }
  }, [initialValues, projectId, form]);
  
  const handleSubmit = (values) => {
    const taskData = {
      ...values,
      dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : null,
    };
    
    if (initialValues?.id) {
      taskData.id = initialValues.id;
    }
    
    if (!taskData.projectId && projectId) {
      taskData.projectId = projectId;
    }
    
    onFinish(taskData);
  };
  
  const statusOptions = getStatusOptions(t).map(option => (
    <Select.Option key={option.value} value={option.value}>
      {option.label}
    </Select.Option>
  ));
  
  const priorityOptions = getPriorityOptions(t).map(option => (
    <Select.Option key={option.value} value={option.value}>
      {option.label}
    </Select.Option>
  ));
  
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        assignee: '',
        dueDate: undefined,
        projectId: projectId || '',
      }}
    >
      <Form.Item name="projectId" hidden>
        <Input />
      </Form.Item>
      
      <Form.Item
        name="title"
        label={t('tasks.title')}
        rules={[{ required: true, message: 'Please enter task title' }]}
      >
        <Input placeholder="Task title" />
      </Form.Item>
      
      <Form.Item
        name="description"
        label={t('tasks.description')}
      >
        <TextArea rows={3} placeholder="Task description" />
      </Form.Item>
      
      <Form.Item
        name="status"
        label={t('tasks.status')}
        rules={[{ required: true, message: 'Please select task status' }]}
      >
        <Select>{statusOptions}</Select>
      </Form.Item>
      
      <Form.Item
        name="priority"
        label={t('tasks.priority')}
        rules={[{ required: true, message: 'Please select task priority' }]}
      >
        <Select>{priorityOptions}</Select>
      </Form.Item>
      
      <Form.Item
        name="assignee"
        label={t('tasks.assignedTo')}
      >
        <Input placeholder="Assignee name" />
      </Form.Item>
      
      <Form.Item
        name="dueDate"
        label={t('tasks.dueDate')}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues?.id ? t('tasks.edit') : t('tasks.add')}
          </Button>
          <Button onClick={onCancel}>{t('tasks.cancel')}</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default TaskForm; 
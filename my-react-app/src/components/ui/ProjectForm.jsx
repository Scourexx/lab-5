import { Form, Input, Select, DatePicker, Button, Space } from 'antd';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { getProjectStatusOptions, getPriorityOptions } from '../../utils/i18n';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const ProjectForm = ({ initialValues, onFinish, onCancel, loading }) => {
  const { t } = useLanguage();
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (initialValues) {
      const formattedValues = {
        ...initialValues,
        dateRange: initialValues.startDate && initialValues.endDate 
          ? [dayjs(initialValues.startDate), dayjs(initialValues.endDate)] 
          : undefined,
      };
      form.setFieldsValue(formattedValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);
  
  const handleSubmit = (values) => {
    const [startDate, endDate] = values.dateRange || [];
    
    const projectData = {
      ...values,
      startDate: startDate ? startDate.format('YYYY-MM-DD') : null,
      endDate: endDate ? endDate.format('YYYY-MM-DD') : null,
    };
    
    delete projectData.dateRange;
    
    if (initialValues?.id) {
      projectData.id = initialValues.id;
    }
    
    onFinish(projectData);
  };
  
  const statusOptions = getProjectStatusOptions(t).map(option => (
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
        name: '',
        description: '',
        status: 'active',
        priority: 'medium',
        dateRange: undefined,
      }}
    >
      <Form.Item
        name="name"
        label={t('projects.form.name')}
        rules={[{ required: true, message: 'Please enter project name' }]}
      >
        <Input placeholder="Project name" />
      </Form.Item>
      
      <Form.Item
        name="description"
        label={t('projects.form.description')}
        rules={[{ required: true, message: 'Please enter project description' }]}
      >
        <TextArea rows={4} placeholder="Project description" />
      </Form.Item>
      
      <Form.Item
        name="status"
        label={t('projects.form.status')}
        rules={[{ required: true, message: 'Please select project status' }]}
      >
        <Select>{statusOptions}</Select>
      </Form.Item>
      
      <Form.Item
        name="priority"
        label={t('projects.form.priority')}
        rules={[{ required: true, message: 'Please select project priority' }]}
      >
        <Select>{priorityOptions}</Select>
      </Form.Item>
      
      <Form.Item
        name="dateRange"
        label={t('projects.form.dates')}
        rules={[{ required: true, message: 'Please select project dates' }]}
      >
        <RangePicker style={{ width: '100%' }} />
      </Form.Item>
      
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues?.id ? t('projects.actions.edit') : t('projects.actions.add')}
          </Button>
          <Button onClick={onCancel}>{t('projects.form.cancel')}</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
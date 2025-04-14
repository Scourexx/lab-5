import { Form, Input, Select, DatePicker, Button, Space } from 'antd';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect } from 'react';
import dayjs from 'dayjs';

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
        label={t('title')}
        rules={[{ required: true, message: 'Please enter project name' }]}
      >
        <Input placeholder="Project name" />
      </Form.Item>
      
      <Form.Item
        name="description"
        label={t('description')}
        rules={[{ required: true, message: 'Please enter project description' }]}
      >
        <TextArea rows={4} placeholder="Project description" />
      </Form.Item>
      
      <Form.Item
        name="status"
        label={t('status')}
        rules={[{ required: true, message: 'Please select project status' }]}
      >
        <Select>
          <Select.Option value="planned">Planned</Select.Option>
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="completed">Completed</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        name="priority"
        label={t('priority')}
        rules={[{ required: true, message: 'Please select project priority' }]}
      >
        <Select>
          <Select.Option value="low">{t('low')}</Select.Option>
          <Select.Option value="medium">{t('medium')}</Select.Option>
          <Select.Option value="high">{t('high')}</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        name="dateRange"
        label="Project Timeframe"
        rules={[{ required: true, message: 'Please select project dates' }]}
      >
        <RangePicker style={{ width: '100%' }} />
      </Form.Item>
      
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues?.id ? 'Update Project' : 'Create Project'}
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
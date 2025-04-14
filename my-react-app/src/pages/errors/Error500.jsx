import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Error500 = () => {
  const navigate = useNavigate();
  
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong on the server."
      extra={
        <Button type="primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      }
    />
  );
};

export default Error500; 
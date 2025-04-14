import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Error403 = () => {
  const navigate = useNavigate();
  
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      }
    />
  );
};

export default Error403; 
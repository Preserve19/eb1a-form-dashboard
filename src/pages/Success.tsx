
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        
        <h1 className="mb-3 text-3xl font-bold text-navy-800">Application Submitted!</h1>
        
        <p className="mb-6 text-gray-600">
          Your EB1A application has been successfully submitted. You will receive a confirmation email shortly with further instructions.
        </p>
        
        <p className="mb-6 text-sm text-gray-500">
          Reference Number: {Math.random().toString(36).substring(2, 10).toUpperCase()}
        </p>
        
        <Button
          onClick={() => navigate('/')}
          className="flex w-full items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700"
        >
          <Home size={16} />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default Success;

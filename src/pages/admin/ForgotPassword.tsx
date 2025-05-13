
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <Card className="mx-auto w-full max-w-md shadow-lg">
        <CardHeader className="bg-navy-800 text-center text-white">
          <CardTitle className="text-2xl font-bold">
            Forgot Password
          </CardTitle>
          <p className="text-navy-100">
            Reset your admin account password
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          {isSubmitted ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Password reset request sent</h3>
                <p className="mt-2 text-sm text-gray-600">
                  If an account with that email exists, we've sent instructions to reset your password.
                </p>
              </div>
              
              <Link to="/admin/login">
                <Button
                  className="flex w-full items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <p>{error}</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your admin email"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-navy-800 hover:bg-navy-700"
              >
                Reset Password
              </Button>
              
              <div className="text-center">
                <Link
                  to="/admin/login"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;

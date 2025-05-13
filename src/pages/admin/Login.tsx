
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  
  // If already logged in, redirect to admin dashboard
  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      const success = await signIn(email, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <Card className="mx-auto w-full max-w-md shadow-lg">
        <CardHeader className="bg-navy-800 text-center text-white">
          <CardTitle className="text-2xl font-bold">
            Admin Login
          </CardTitle>
          <p className="text-navy-100">
            Access the EB1A Application management dashboard
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
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
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/admin/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-navy-800 hover:bg-navy-700"
            >
              Login
            </Button>
            
            <div className="text-center text-xs text-gray-500">
              <p>Admin accounts are pre-configured and cannot be self-registered.</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

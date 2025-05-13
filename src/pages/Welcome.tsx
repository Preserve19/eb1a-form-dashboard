
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@/contexts/FormContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Welcome = () => {
  const { formData, setFormData } = useForm();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState(formData.fullName || '');
  const [email, setEmail] = useState(formData.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!fullName.trim()) {
      toast({
        variant: 'destructive',
        title: 'Full name required',
        description: 'Please enter your full legal name to continue.',
      });
      return;
    }
    
    if (!email.trim() || !email.includes('@')) {
      toast({
        variant: 'destructive',
        title: 'Valid email required',
        description: 'Please enter a valid email address to continue.',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Update form context with user information
    setFormData(prev => ({
      ...prev,
      fullName,
      email
    }));
    
    // Navigate to the main form
    setTimeout(() => {
      navigate('/form');
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="mx-auto w-full max-w-md shadow-lg">
        <CardHeader className="bg-blue-50 text-center">
          <CardTitle className="text-2xl font-bold text-navy-800">
            Welcome to EB1A Application
          </CardTitle>
          <p className="text-gray-600">
            Please provide your information to start your application
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <User size={16} />
                </div>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full legal name"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <Mail size={16} />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="pl-10"
                />
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-navy-800 text-white hover:bg-navy-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Begin Application'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;

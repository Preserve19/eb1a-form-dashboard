
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { supabase } from '../lib/supabase';
import { toast } from '../components/ui/use-toast';

// Hard-coded admin users for this application
const ADMIN_USERS = [
  { email: 'hello@straightgreencard.com', password: 'StraightGreenCardAppand' },
  { email: 'oladipopreserve@gmail.com', password: 'dimimu2003' }
];

type AuthContextType = {
  user: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated in local storage
    const checkAuth = () => {
      const storedUser = localStorage.getItem('eb1a_admin_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Error parsing stored user:', e);
          localStorage.removeItem('eb1a_admin_user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Check against hard-coded admin users
      const adminUser = ADMIN_USERS.find(
        (admin) => admin.email === email && admin.password === password
      );

      if (adminUser) {
        // Store user in state and local storage (exclude password)
        const userToStore = { email: adminUser.email };
        setUser(userToStore);
        localStorage.setItem('eb1a_admin_user', JSON.stringify(userToStore));
        
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        
        return true;
      } else {
        toast({
          variant: 'destructive',
          title: 'Authentication failed',
          description: 'Invalid email or password.',
        });
        return false;
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      toast({
        variant: 'destructive',
        title: 'Sign in error',
        description: 'An error occurred during sign in.',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('eb1a_admin_user');
    setUser(null);
    
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully.',
    });
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      
      // Check if email exists in admin users
      const adminExists = ADMIN_USERS.some(admin => admin.email === email);
      
      if (!adminExists) {
        throw new Error('Email not found');
      }
      
      // In a real app, this would send a reset email.
      // For this demo, we'll just show a toast.
      
      toast({
        title: 'Password reset',
        description: 'If this email exists in our system, you will receive instructions to reset your password.',
      });
    } catch (error: any) {
      console.error('Error in resetPassword:', error);
      toast({
        variant: 'destructive',
        title: 'Password reset failed',
        description: error.message || 'An error occurred during password reset.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

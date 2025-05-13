
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  userEmail: string | undefined;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userEmail, onLogout }) => {
  return (
    <header className="bg-navy-800 text-white">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">EB1A Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-navy-100">Logged in as {userEmail}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLogout}
              className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;


import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardHeaderProps {
  userEmail: string | undefined;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userEmail, onLogout }) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-white text-navy-800">
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/88567fb0-7213-4614-b9e3-55a0693cc568.png" 
              alt="StraightGreenCard Logo" 
              className="h-8 mr-3" 
            />
            <br/>
            <h1 className="text-xl sm:text-2xl font-bold">StraightGreenCard EB1A Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-navy-100 hidden sm:inline">Logged in as {userEmail}</span>
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              onClick={onLogout}
              className="border-white/20 bg-navy-800 text-navy-100 hover:bg-white/10 hover:text-navy-800"
            >
              <LogOut size={16} className={isMobile ? "mr-0" : "mr-2"} />
              {!isMobile && "Logout"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

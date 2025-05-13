
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Search, RefreshCw, Download } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ApplicationsFilterProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
  onExport: () => void;
  isLoading: boolean;
  isExporting: boolean;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ApplicationsFilter: React.FC<ApplicationsFilterProps> = ({
  searchTerm,
  onSearchChange,
  onRefresh,
  onExport,
  isLoading,
  isExporting,
  activeTab,
  onTabChange
}) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <CardTitle className="text-xl font-semibold text-gray-900">Applications</CardTitle>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search applicants..."
              className="w-64 pl-9"
              value={searchTerm}
              onChange={onSearchChange}
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onExport}
            disabled={isExporting || isLoading}
          >
            <Download size={16} className="mr-2" />
            Export to Excel
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={onTabChange}>
        <TabsList className="bg-transparent">
          <TabsTrigger value="all" className="data-[state=active]:border-navy-800">
            All Applications
          </TabsTrigger>
          <TabsTrigger value="submitted" className="data-[state=active]:border-navy-800">
            Submitted
          </TabsTrigger>
          <TabsTrigger value="draft" className="data-[state=active]:border-navy-800">
            Draft
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default ApplicationsFilter;


import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FormSummary } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { downloadExcel } from '@/lib/supabase';

export const useApplications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormSummary[]>([]);
  const [filteredData, setFilteredData] = useState<FormSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  // Load form data from Supabase
  const loadFormData = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('eb1a_forms')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      // Transform raw data into FormSummary objects
      const formSummaries: FormSummary[] = data?.map(item => {
        return {
          id: item.id,
          fullName: item.data?.fullName || 'Unknown',
          email: item.data?.email || 'No email provided',
          status: item.status,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          submittedAt: item.submitted_at
        };
      }) || [];
      
      setFormData(formSummaries);
      setFilteredData(formSummaries);
      
      toast({
        title: "Data loaded",
        description: `${formSummaries.length} applications loaded successfully`,
      });
    } catch (error: any) {
      console.error('Error loading form data:', error);
      toast({
        variant: "destructive",
        title: "Error loading data",
        description: error.message || "Could not load application data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === 'all') {
      setFilteredData(formData);
    } else {
      const status = value === 'submitted' ? 'submitted' : 'draft';
      setFilteredData(formData.filter(item => item.status === status));
    }
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term.trim()) {
      handleTabChange(activeTab);
      return;
    }
    
    const filtered = formData.filter(item => {
      return (
        item.fullName.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.id.toLowerCase().includes(term)
      );
    });
    
    setFilteredData(filtered);
  };

  // Handle export to Excel
  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const dataToExport = activeTab === 'all' 
        ? formData 
        : formData.filter(item => item.status === (activeTab === 'submitted' ? 'submitted' : 'draft'));
      
      const excelBlob = await downloadExcel(dataToExport);
      
      // Create download link
      const url = URL.createObjectURL(excelBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `eb1a-applications-${activeTab}-${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: `${dataToExport.length} applications exported to Excel`,
      });
    } catch (error: any) {
      console.error('Error exporting data:', error);
      toast({
        variant: "destructive",
        title: "Export failed",
        description: error.message || "Could not export data to Excel",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Load data on hook initialization
  useEffect(() => {
    loadFormData();
  }, []);

  // Statistics
  const totalApplications = formData.length;
  const submittedApplications = formData.filter(item => item.status === 'submitted').length;
  const draftApplications = formData.filter(item => item.status === 'draft').length;

  return {
    formData,
    filteredData,
    isLoading,
    searchTerm,
    setSearchTerm,
    activeTab,
    isExporting,
    loadFormData,
    handleTabChange,
    handleSearch,
    handleExport,
    totalApplications,
    submittedApplications,
    draftApplications
  };
};

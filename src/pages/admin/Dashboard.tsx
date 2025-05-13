
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { supabase, downloadExcel } from '@/lib/supabase';
import { LogOut, Search, Download, RefreshCw, FileText, Users, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Spinner } from '@/components/ui/spinner';

interface FormSummary {
  id: string;
  fullName: string;
  email: string;
  status: 'draft' | 'submitted';
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
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
      const formSummaries: FormSummary[] = data.map(item => {
        const formData = item.data;
        return {
          id: item.id,
          fullName: formData.fullName || 'Unknown',
          email: formData.email || 'No email provided',
          status: item.status,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          submittedAt: item.submitted_at
        };
      });
      
      setFormData(formSummaries);
      setFilteredData(formSummaries);
    } catch (error) {
      console.error('Error loading form data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadFormData();
  }, []);

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
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    signOut();
    navigate('/admin/login');
  };

  // Statistics
  const totalApplications = formData.length;
  const submittedApplications = formData.filter(item => item.status === 'submitted').length;
  const draftApplications = formData.filter(item => item.status === 'draft').length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-navy-800 text-white">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">EB1A Admin Dashboard</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-navy-100">Logged in as {user?.email}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 py-8">
        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="bg-white shadow-sm">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Applications</p>
                <h3 className="text-3xl font-bold text-gray-900">{totalApplications}</h3>
              </div>
              <FileText className="h-10 w-10 text-navy-200" />
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Submitted Applications</p>
                <h3 className="text-3xl font-bold text-green-600">{submittedApplications}</h3>
              </div>
              <CheckCircle className="h-10 w-10 text-green-200" />
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Draft Applications</p>
                <h3 className="text-3xl font-bold text-amber-600">{draftApplications}</h3>
              </div>
              <Clock className="h-10 w-10 text-amber-200" />
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="border-b bg-slate-50 px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CardTitle className="text-xl font-semibold text-gray-900">Applications</CardTitle>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search applicants..."
                    className="w-64 pl-9"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={loadFormData}
                  disabled={isLoading}
                >
                  <RefreshCw size={16} className="mr-2" />
                  Refresh
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleExport}
                  disabled={isExporting || isLoading}
                >
                  <Download size={16} className="mr-2" />
                  Export to Excel
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <Tabs defaultValue="all" onValueChange={handleTabChange}>
            <div className="border-b px-6">
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
            </div>
            
            <TabsContent value="all" className="m-0">
              {renderApplicationsTable(filteredData, isLoading)}
            </TabsContent>
            
            <TabsContent value="submitted" className="m-0">
              {renderApplicationsTable(filteredData, isLoading)}
            </TabsContent>
            
            <TabsContent value="draft" className="m-0">
              {renderApplicationsTable(filteredData, isLoading)}
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-white py-4 text-center text-sm text-gray-500">
        <p>© 2025 EB1A Application Navigator Admin Panel</p>
      </footer>
    </div>
  );
};

// Helper function to render the applications table
const renderApplicationsTable = (data: FormSummary[], isLoading: boolean) => {
  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Spinner size="lg" />
          <p className="text-sm text-gray-500">Loading applications...</p>
        </div>
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <div className="text-center">
          <Users size={40} className="mx-auto mb-2 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900">No applications found</h3>
          <p className="text-gray-500">There are no applications matching your criteria</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Application ID</TableHead>
            <TableHead>Applicant</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-mono text-xs">{application.id}</TableCell>
              <TableCell className="font-medium">{application.fullName}</TableCell>
              <TableCell>{application.email}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {application.status === 'submitted' ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      <CheckCircle size={12} className="mr-1" />
                      Submitted
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                      <Clock size={12} className="mr-1" />
                      Draft
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>{format(new Date(application.createdAt), 'MMM d, yyyy')}</TableCell>
              <TableCell>{format(new Date(application.updatedAt), 'MMM d, yyyy')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;

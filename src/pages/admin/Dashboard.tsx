
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useApplications } from '@/hooks/useApplications';
import DashboardHeader from '@/components/admin/DashboardHeader';
import StatsCards from '@/components/admin/StatsCards';
import ApplicationsFilter from '@/components/admin/ApplicationsFilter';
import ApplicationsTable from '@/components/admin/ApplicationsTable';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const { 
    filteredData,
    isLoading,
    searchTerm,
    activeTab,
    isExporting,
    loadFormData,
    handleTabChange,
    handleSearch,
    handleExport,
    totalApplications,
    submittedApplications,
    draftApplications
  } = useApplications();

  // Handle logout
  const handleLogout = () => {
    signOut();
    navigate('/admin/login');
  };

  // Handle view application
  const handleViewApplication = (id: string) => {
    // Navigate to a detailed view of the application
    navigate(`/admin/application/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <DashboardHeader userEmail={user?.email} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="container mx-auto p-4 py-8">
        {/* Stats Cards */}
        <StatsCards 
          totalApplications={totalApplications}
          submittedApplications={submittedApplications}
          draftApplications={draftApplications}
        />

        {/* Applications Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="border-b bg-slate-50 px-6 py-4">
            <ApplicationsFilter
              searchTerm={searchTerm}
              onSearchChange={handleSearch}
              onRefresh={loadFormData}
              onExport={handleExport}
              isLoading={isLoading}
              isExporting={isExporting}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </CardHeader>
          
          <CardContent className="p-0">
            <ApplicationsTable 
              data={filteredData} 
              isLoading={isLoading} 
              onView={handleViewApplication}
            />
          </CardContent>
        </Card>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-white py-4 text-center text-sm text-gray-500">
        <p>© 2025 StraightGreenCard EB1A Application Navigator Admin Panel</p>
      </footer>
    </div>
  );
};

export default Dashboard;

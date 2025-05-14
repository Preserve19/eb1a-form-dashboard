
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { supabase, downloadApplicationDetail } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { EB1AFormData } from '@/types';
import ApplicantInfoCard from '@/components/admin/ApplicantInfoCard';
import ApplicationTabs from '@/components/admin/ApplicationTabs';
import ApplicationNotFound from '@/components/admin/ApplicationNotFound';
import { useIsMobile } from '@/hooks/use-mobile';

interface FormRecord {
  id: string;
  data: EB1AFormData;
  status: string;
  created_at: string;
  updated_at: string;
  submitted_at: string | null;
}

const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [application, setApplication] = useState<FormRecord | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [isDownloading, setIsDownloading] = useState(false);
  
  useEffect(() => {
    const fetchApplication = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('eb1a_forms')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setApplication(data as FormRecord);
      } catch (error: any) {
        console.error('Error fetching application:', error);
        toast({
          variant: "destructive",
          title: "Error fetching application",
          description: error.message || "Could not load application details",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchApplication();
    }
  }, [id]);
  
  const handleBack = () => {
    navigate('/admin');
  };
  
  const handleDownload = async () => {
    if (!id) return;
    
    setIsDownloading(true);
    try {
      const excelBlob = await downloadApplicationDetail(id);
      
      // Create a download link
      const url = URL.createObjectURL(excelBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `application-${id}-${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download successful",
        description: "Application details have been downloaded as Excel.",
      });
    } catch (error: any) {
      console.error('Error downloading application:', error);
      toast({
        variant: "destructive",
        title: "Download failed",
        description: error.message || "Could not download application details.",
      });
    } finally {
      setIsDownloading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!application) {
    return <ApplicationNotFound onBack={handleBack} />;
  }
  
  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-4 sm:mb-0 self-start"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Application Details</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className={isMobile ? "order-1" : ""}>
          <ApplicantInfoCard 
            fullName={application.data.fullName}
            email={application.data.email}
            createdAt={application.created_at}
            submittedAt={application.submitted_at}
            id={application.id}
            isDownloading={isDownloading}
            onDownload={handleDownload}
          />
        </div>
        
        <div className="lg:col-span-2">
          <ApplicationTabs 
            formData={application.data}
            status={application.status}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;

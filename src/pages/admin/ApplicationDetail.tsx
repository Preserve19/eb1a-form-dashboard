
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, User, Calendar, Mail, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Spinner } from '@/components/ui/spinner';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { EB1AFormData } from '@/types';

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
  const [isLoading, setIsLoading] = useState(true);
  const [application, setApplication] = useState<FormRecord | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  
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
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!application) {
    return (
      <div className="container mx-auto p-8">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="mr-2" size={16} />
            Back to Dashboard
          </Button>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <AlertCircle className="mb-4 h-16 w-16 text-gray-300" />
            <h2 className="mb-2 text-2xl font-bold">Application Not Found</h2>
            <p className="text-muted-foreground">
              The application you're looking for doesn't exist or has been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2" size={16} />
          Back to Dashboard
        </Button>
        <h1 className="ml-4 text-2xl font-bold">Application Details</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Applicant Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="mt-0.5 h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">{application.data.fullName}</p>
                <p className="text-sm text-muted-foreground">Applicant Name</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">{application.data.email}</p>
                <p className="text-sm text-muted-foreground">Email Address</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">
                  {format(new Date(application.created_at), 'PPP')}
                </p>
                <p className="text-sm text-muted-foreground">
                  Created {format(new Date(application.created_at), 'p')}
                </p>
              </div>
            </div>
            
            {application.submitted_at && (
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-green-600">
                    {format(new Date(application.submitted_at), 'PPP')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Submitted {format(new Date(application.submitted_at), 'p')}
                  </p>
                </div>
              </div>
            )}
            
            <div className="pt-4">
              <Button className="w-full" variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download Full Application
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="border-b">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="details">Overview</TabsTrigger>
                  <TabsTrigger value="awards">Prizes & Awards</TabsTrigger>
                  <TabsTrigger value="memberships">Memberships</TabsTrigger>
                  <TabsTrigger value="publications">Publications</TabsTrigger>
                  <TabsTrigger value="other">Other Criteria</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-6">
              {/* The key fix is here: We need to wrap TabsContent components within the Tabs component */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="details" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Application Status</h3>
                      <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                        application.status === 'submitted' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {application.status === 'submitted' ? 'Submitted' : 'Draft'}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Submission Summary</h3>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr>
                            <td className="py-2 pr-4 font-medium">Prizes & Awards</td>
                            <td>{application.data.awards?.length || 0} entries</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium">Memberships</td>
                            <td>{application.data.memberships?.length || 0} entries</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium">Published Materials</td>
                            <td>{application.data.publishedMaterials?.length || 0} entries</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium">Judging Experience</td>
                            <td>{application.data.judgingExperiences?.length || 0} entries</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium">Original Contributions</td>
                            <td>{application.data.originalContributions?.length || 0} entries</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium">Scholarly Articles</td>
                            <td>{application.data.scholarlyArticles?.length || 0} entries</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium">Exhibitions</td>
                            <td>{application.data.exhibitions?.length || 0} entries</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium">Leading Roles</td>
                            <td>{application.data.leadingRoles?.length || 0} entries</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium">High Salaries</td>
                            <td>{application.data.highSalaries?.length || 0} entries</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-medium">Commercial Successes</td>
                            <td>{application.data.commercialSuccesses?.length || 0} entries</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="awards" className="mt-0">
                  <h3 className="mb-4 text-lg font-medium">Prizes & Awards</h3>
                  {application.data.awards && application.data.awards.length > 0 ? (
                    <div className="space-y-4">
                      {application.data.awards.map((award, index) => (
                        <Card key={award.id || index}>
                          <CardContent className="p-4">
                            <h4 className="font-bold">{award.awardName}</h4>
                            <p className="text-sm text-gray-500">
                              {award.awardingOrganization} • {award.dateReceived}
                            </p>
                            <p className="mt-2">{award.awardDescription}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No awards or prizes submitted.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="memberships" className="mt-0">
                  <h3 className="mb-4 text-lg font-medium">Memberships</h3>
                  {application.data.memberships && application.data.memberships.length > 0 ? (
                    <div className="space-y-4">
                      {application.data.memberships.map((membership, index) => (
                        <Card key={membership.id || index}>
                          <CardContent className="p-4">
                            <h4 className="font-bold">{membership.associationName}</h4>
                            <p className="text-sm text-gray-500">Member since {membership.memberSince}</p>
                            <p className="mt-2">{membership.associationDescription}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No memberships submitted.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="publications" className="mt-0">
                  <h3 className="mb-4 text-lg font-medium">Published Materials</h3>
                  {application.data.publishedMaterials && application.data.publishedMaterials.length > 0 ? (
                    <div className="space-y-4">
                      {application.data.publishedMaterials.map((publication, index) => (
                        <Card key={publication.id || index}>
                          <CardContent className="p-4">
                            <h4 className="font-bold">{publication.publicationTitle}</h4>
                            <p className="text-sm text-gray-500">
                              {publication.publisherName} • {publication.publicationDate}
                            </p>
                            <p className="mt-2">{publication.contentSummary}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No published materials submitted.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="other" className="mt-0">
                  <h3 className="mb-4 text-lg font-medium">Other Criteria</h3>
                  <p className="text-muted-foreground mb-4">
                    View detailed information for each criterion by selecting the specific tab.
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('awards')}
                      className="justify-start"
                    >
                      Prizes & Awards
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('memberships')}
                      className="justify-start"
                    >
                      Memberships
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('publications')}
                      className="justify-start"
                    >
                      Published Materials
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;

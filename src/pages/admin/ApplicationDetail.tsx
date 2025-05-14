
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';
import { supabase, downloadApplicationDetail } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { EB1AFormData } from '@/types';
import ApplicantInfoCard from '@/components/admin/ApplicantInfoCard';
import ApplicationOverview from '@/components/admin/ApplicationOverview';
import ApplicationNotFound from '@/components/admin/ApplicationNotFound';
import EntryCardList, { EntryCard } from '@/components/admin/EntryCardList';

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
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2" size={16} />
          Back to Dashboard
        </Button>
        <h1 className="ml-4 text-2xl font-bold">Application Details</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ApplicantInfoCard 
          fullName={application.data.fullName}
          email={application.data.email}
          createdAt={application.created_at}
          submittedAt={application.submitted_at}
          id={application.id}
          isDownloading={isDownloading}
          onDownload={handleDownload}
        />
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="border-b">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="details">Overview</TabsTrigger>
                  <TabsTrigger value="awards">Prizes & Awards</TabsTrigger>
                  <TabsTrigger value="memberships">Memberships</TabsTrigger>
                  <TabsTrigger value="publications">Publications</TabsTrigger>
                  <TabsTrigger value="judging">Judging</TabsTrigger>
                  <TabsTrigger value="contributions">Contributions</TabsTrigger>
                  <TabsTrigger value="articles">Articles</TabsTrigger>
                  <TabsTrigger value="exhibitions">Exhibitions</TabsTrigger>
                  <TabsTrigger value="leadingRoles">Leading Roles</TabsTrigger>
                  <TabsTrigger value="salaries">Salaries</TabsTrigger>
                  <TabsTrigger value="commercial">Commercial</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="details" className="mt-0">
                  <ApplicationOverview status={application.status} formData={application.data} />
                </TabsContent>
                
                <TabsContent value="awards" className="mt-0">
                  <EntryCardList 
                    title="Prizes & Awards"
                    entries={application.data.awards}
                    renderEntry={(award) => (
                      <EntryCard 
                        key={award.id}
                        title={award.awardName}
                        subtitle={`${award.awardingOrganization} • ${award.dateReceived}`}
                        description={award.awardDescription}
                        links={[
                          ...(award.certificateUrl ? [{ url: award.certificateUrl, label: 'View Certificate' }] : []),
                          ...(award.supportingDocUrl ? [{ url: award.supportingDocUrl, label: 'View Supporting Document' }] : [])
                        ]}
                      />
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="memberships" className="mt-0">
                  <EntryCardList 
                    title="Memberships"
                    entries={application.data.memberships}
                    renderEntry={(membership) => (
                      <EntryCard 
                        key={membership.id}
                        title={membership.associationName}
                        subtitle={`Member since ${membership.memberSince}`}
                        description={membership.associationDescription}
                        links={[
                          ...(membership.certificateUrl ? [{ url: membership.certificateUrl, label: 'View Certificate' }] : []),
                          ...(membership.supportingDocUrl ? [{ url: membership.supportingDocUrl, label: 'View Supporting Document' }] : [])
                        ]}
                      />
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="publications" className="mt-0">
                  <EntryCardList 
                    title="Published Materials"
                    entries={application.data.publishedMaterials}
                    renderEntry={(publication) => (
                      <EntryCard 
                        key={publication.id}
                        title={publication.publicationTitle}
                        subtitle={`${publication.publisherName} • ${publication.publicationDate}`}
                        description={publication.contentSummary}
                        links={[
                          ...(publication.publicationUrl ? [{ url: publication.publicationUrl, label: 'View Publication' }] : []),
                          ...(publication.evidenceUrl ? [{ url: publication.evidenceUrl, label: 'View Evidence' }] : [])
                        ]}
                      />
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="judging" className="mt-0">
                  <EntryCardList 
                    title="Judging Experiences"
                    entries={application.data.judgingExperiences}
                    renderEntry={(exp) => (
                      <EntryCard 
                        key={exp.id}
                        title={exp.judgeRole}
                        subtitle={`${exp.organizationName} • ${exp.startDate} ${exp.endDate ? `to ${exp.endDate}` : 'to Present'}`}
                        description={exp.description}
                        links={[
                          ...(exp.appointmentLetterUrl ? [{ url: exp.appointmentLetterUrl, label: 'View Appointment Letter' }] : []),
                          ...(exp.evidenceUrl ? [{ url: exp.evidenceUrl, label: 'View Evidence' }] : [])
                        ]}
                      />
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="contributions" className="mt-0">
                  <EntryCardList 
                    title="Original Contributions"
                    entries={application.data.originalContributions}
                    renderEntry={(contrib) => (
                      <EntryCard 
                        key={contrib.id}
                        title={contrib.contributionTitle}
                        subtitle={`${contrib.field} • ${contrib.contributionDate}`}
                        description={contrib.description}
                        links={[
                          ...(contrib.evidenceUrl ? [{ url: contrib.evidenceUrl, label: 'View Evidence' }] : []),
                          ...(contrib.lettersUrl ? [{ url: contrib.lettersUrl, label: 'View Support Letters' }] : [])
                        ]}
                      />
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="articles" className="mt-0">
                  <EntryCardList 
                    title="Scholarly Articles"
                    entries={application.data.scholarlyArticles}
                    renderEntry={(article) => (
                      <EntryCard 
                        key={article.id}
                        title={article.articleTitle}
                        subtitle={`${article.journalName} • ${article.publicationDate}`}
                        description={article.abstract}
                        links={[
                          ...(article.articleUrl ? [{ url: article.articleUrl, label: 'View Article' }] : []),
                          ...(article.citationUrl ? [{ url: article.citationUrl, label: 'View Citations' }] : [])
                        ]}
                      />
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="exhibitions" className="mt-0">
                  <EntryCardList 
                    title="Exhibitions"
                    entries={application.data.exhibitions}
                    renderEntry={(exhibition) => (
                      <EntryCard 
                        key={exhibition.id}
                        title={exhibition.exhibitionName}
                        subtitle={`${exhibition.venueName}, ${exhibition.venueLocation} • ${exhibition.startDate} ${exhibition.endDate ? `to ${exhibition.endDate}` : ''}`}
                        description={exhibition.exhibitionDescription}
                        links={[
                          ...(exhibition.exhibitionDocUrl ? [{ url: exhibition.exhibitionDocUrl, label: 'View Exhibition Doc' }] : []),
                          ...(exhibition.visualEvidenceUrl ? [{ url: exhibition.visualEvidenceUrl, label: 'View Visual Evidence' }] : []),
                          ...(exhibition.reviewsUrl ? [{ url: exhibition.reviewsUrl, label: 'View Reviews' }] : [])
                        ]}
                      />
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="leadingRoles" className="mt-0">
                  <EntryCardList 
                    title="Leading Roles"
                    entries={application.data.leadingRoles}
                    renderEntry={(role) => (
                      <EntryCard 
                        key={role.id}
                        title={role.roleTitle}
                        subtitle={`${role.organizationName} • ${role.startDate} ${role.endDate ? `to ${role.endDate}` : 'to Present'}`}
                        description={role.responsibilities}
                        links={[
                          ...(role.verificationUrl ? [{ url: role.verificationUrl, label: 'View Verification' }] : []),
                          ...(role.organizationChartUrl ? [{ url: role.organizationChartUrl, label: 'View Org Chart' }] : [])
                        ]}
                      />
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="salaries" className="mt-0">
                  <EntryCardList 
                    title="High Salaries"
                    entries={application.data.highSalaries}
                    renderEntry={(salary) => (
                      <EntryCard 
                        key={salary.id}
                        title={salary.employerName}
                        subtitle={`${salary.baseSalary} ${salary.currency} ${salary.frequency} • ${salary.startDate} ${salary.endDate ? `to ${salary.endDate}` : 'to Present'}`}
                        description={salary.additionalCompensation}
                        links={[
                          ...(salary.salaryDocUrl ? [{ url: salary.salaryDocUrl, label: 'View Salary Documents' }] : []),
                          ...(salary.industryEvidenceUrl ? [{ url: salary.industryEvidenceUrl, label: 'View Industry Evidence' }] : []),
                          ...(salary.expertLettersUrl ? [{ url: salary.expertLettersUrl, label: 'View Expert Letters' }] : [])
                        ]}
                      />
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="commercial" className="mt-0">
                  <EntryCardList 
                    title="Commercial Successes"
                    entries={application.data.commercialSuccesses}
                    renderEntry={(success) => (
                      <EntryCard 
                        key={success.id}
                        title={success.projectTitle}
                        subtitle={`${success.projectType} • ${success.role} • Released ${success.releaseDate}`}
                        description={success.metrics}
                        links={[
                          ...(success.salesDocUrl ? [{ url: success.salesDocUrl, label: 'View Sales Documents' }] : []),
                          ...(success.mediaCoverageUrl ? [{ url: success.mediaCoverageUrl, label: 'View Media Coverage' }] : [])
                        ]}
                      />
                    )}
                  />
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

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { EB1AFormData } from '@/types';
import ApplicationOverview from '@/components/admin/ApplicationOverview';
import EntryCardList from '@/components/admin/EntryCardList';
import { useIsMobile } from '@/hooks/use-mobile';

interface ApplicationTabsProps {
  formData: EB1AFormData;
  status: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ApplicationTabs: React.FC<ApplicationTabsProps> = ({
  formData,
  status,
  activeTab,
  setActiveTab
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Card>
      <CardHeader className="border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`overflow-x-auto ${isMobile ? 'flex flex-wrap gap-1 justify-start' : ''}`}>
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
            <ApplicationOverview status={status} formData={formData} />
          </TabsContent>
          
          <TabsContent value="awards" className="mt-0">
            <EntryCardList 
              title="Prizes & Awards"
              entries={formData.awards}
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
              entries={formData.memberships}
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
              entries={formData.publishedMaterials}
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
              entries={formData.judgingExperiences}
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
              entries={formData.originalContributions}
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
              entries={formData.scholarlyArticles}
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
              entries={formData.exhibitions}
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
              entries={formData.leadingRoles}
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
              entries={formData.highSalaries}
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
              entries={formData.commercialSuccesses}
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
  );
};

// We need to keep EntryCard here to be used in ApplicationTabs
interface EntryCard {
  title: string;
  subtitle: string;
  description: string;
  links: Array<{ url: string; label: string }>;
}

export default ApplicationTabs;


import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { EB1AFormData } from '@/types';
import ApplicationOverview from '@/components/admin/ApplicationOverview';
import EntryCardList, { EntryCard } from '@/components/admin/EntryCardList';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

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
        <ScrollArea className="w-full">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className={`${isMobile ? 'flex flex-wrap gap-1 justify-start' : 'w-full flex'}`}>
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
        </ScrollArea>
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
                  fields={[
                    { label: "Award Name", value: award.awardName },
                    { label: "Awarding Organization", value: award.awardingOrganization },
                    { label: "Date Received", value: award.dateReceived },
                    { label: "Description", value: award.awardDescription }
                  ]}
                  links={[
                    ...(award.certificateUrl ? [{ url: award.certificateUrl, label: 'Award Certificate' }] : []),
                    ...(award.supportingDocUrl ? [{ url: award.supportingDocUrl, label: 'Supporting Document' }] : [])
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
                  fields={[
                    { label: "Association Name", value: membership.associationName },
                    { label: "Member Since", value: membership.memberSince },
                    { label: "Association Description", value: membership.associationDescription }
                  ]}
                  links={[
                    ...(membership.certificateUrl ? [{ url: membership.certificateUrl, label: 'Membership Certificate' }] : []),
                    ...(membership.supportingDocUrl ? [{ url: membership.supportingDocUrl, label: 'Supporting Document' }] : [])
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
                  fields={[
                    { label: "Publication Title", value: publication.publicationTitle },
                    { label: "Publisher", value: publication.publisherName },
                    { label: "Publication Date", value: publication.publicationDate },
                    { label: "Content Summary", value: publication.contentSummary }
                  ]}
                  links={[
                    ...(publication.publicationUrl ? [{ url: publication.publicationUrl, label: 'View Publication' }] : []),
                    ...(publication.evidenceUrl ? [{ url: publication.evidenceUrl, label: 'Publication Evidence' }] : [])
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
                  fields={[
                    { label: "Judge Role", value: exp.judgeRole },
                    { label: "Organization", value: exp.organizationName },
                    { label: "Time Period", value: `${exp.startDate} ${exp.endDate ? `to ${exp.endDate}` : 'to Present'}` },
                    { label: "Description", value: exp.description }
                  ]}
                  links={[
                    ...(exp.appointmentLetterUrl ? [{ url: exp.appointmentLetterUrl, label: 'Appointment Letter' }] : []),
                    ...(exp.evidenceUrl ? [{ url: exp.evidenceUrl, label: 'Supporting Evidence' }] : [])
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
                  fields={[
                    { label: "Contribution Title", value: contrib.contributionTitle },
                    { label: "Field", value: contrib.field },
                    { label: "Date", value: contrib.contributionDate },
                    { label: "Description", value: contrib.description }
                  ]}
                  links={[
                    ...(contrib.evidenceUrl ? [{ url: contrib.evidenceUrl, label: 'Evidence Document' }] : []),
                    ...(contrib.lettersUrl ? [{ url: contrib.lettersUrl, label: 'Support Letters' }] : [])
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
                  fields={[
                    { label: "Article Title", value: article.articleTitle },
                    { label: "Journal Name", value: article.journalName },
                    { label: "Publication Date", value: article.publicationDate },
                    { label: "Abstract", value: article.abstract }
                  ]}
                  links={[
                    ...(article.articleUrl ? [{ url: article.articleUrl, label: 'Full Article' }] : []),
                    ...(article.citationUrl ? [{ url: article.citationUrl, label: 'Citation Evidence' }] : [])
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
                  fields={[
                    { label: "Exhibition Name", value: exhibition.exhibitionName },
                    { label: "Venue", value: `${exhibition.venueName}, ${exhibition.venueLocation}` },
                    { label: "Dates", value: `${exhibition.startDate} ${exhibition.endDate ? `to ${exhibition.endDate}` : ''}` },
                    { label: "Exhibition Description", value: exhibition.exhibitionDescription }
                  ]}
                  links={[
                    ...(exhibition.exhibitionDocUrl ? [{ url: exhibition.exhibitionDocUrl, label: 'Exhibition Documentation' }] : []),
                    ...(exhibition.visualEvidenceUrl ? [{ url: exhibition.visualEvidenceUrl, label: 'Visual Evidence' }] : []),
                    ...(exhibition.reviewsUrl ? [{ url: exhibition.reviewsUrl, label: 'Reviews' }] : [])
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
                  fields={[
                    { label: "Role Title", value: role.roleTitle },
                    { label: "Organization", value: role.organizationName },
                    { label: "Period", value: `${role.startDate} ${role.endDate ? `to ${role.endDate}` : 'to Present'}` },
                    { label: "Responsibilities", value: role.responsibilities }
                  ]}
                  links={[
                    ...(role.verificationUrl ? [{ url: role.verificationUrl, label: 'Role Verification' }] : []),
                    ...(role.organizationChartUrl ? [{ url: role.organizationChartUrl, label: 'Organization Chart' }] : [])
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
                  fields={[
                    { label: "Employer", value: salary.employerName },
                    { label: "Base Salary", value: `${salary.baseSalary} ${salary.currency} ${salary.frequency}` },
                    { label: "Employment Period", value: `${salary.startDate} ${salary.endDate ? `to ${salary.endDate}` : 'to Present'}` },
                    { label: "Additional Compensation", value: salary.additionalCompensation || 'None' }
                  ]}
                  links={[
                    ...(salary.salaryDocUrl ? [{ url: salary.salaryDocUrl, label: 'Salary Documentation' }] : []),
                    ...(salary.industryEvidenceUrl ? [{ url: salary.industryEvidenceUrl, label: 'Industry Comparison' }] : []),
                    ...(salary.expertLettersUrl ? [{ url: salary.expertLettersUrl, label: 'Expert Letters' }] : [])
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
                  fields={[
                    { label: "Project Title", value: success.projectTitle },
                    { label: "Project Type", value: success.projectType },
                    { label: "Your Role", value: success.role },
                    { label: "Release Date", value: success.releaseDate },
                    { label: "Success Metrics", value: success.metrics }
                  ]}
                  links={[
                    ...(success.salesDocUrl ? [{ url: success.salesDocUrl, label: 'Sales Documentation' }] : []),
                    ...(success.mediaCoverageUrl ? [{ url: success.mediaCoverageUrl, label: 'Media Coverage' }] : [])
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

export default ApplicationTabs;

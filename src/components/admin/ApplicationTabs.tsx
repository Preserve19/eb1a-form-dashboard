
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { EB1AFormData } from '@/types';
import ApplicationOverview from '@/components/admin/ApplicationOverview';

// Import individual tab components
import TabsHeader from '@/components/admin/tabs/TabsHeader';
import AwardsTab from '@/components/admin/tabs/AwardsTab';
import MembershipsTab from '@/components/admin/tabs/MembershipsTab';
import PublicationsTab from '@/components/admin/tabs/PublicationsTab';
import JudgingTab from '@/components/admin/tabs/JudgingTab';
import ContributionsTab from '@/components/admin/tabs/ContributionsTab';
import ArticlesTab from '@/components/admin/tabs/ArticlesTab';
import ExhibitionsTab from '@/components/admin/tabs/ExhibitionsTab';
import LeadingRolesTab from '@/components/admin/tabs/LeadingRolesTab';
import SalariesTab from '@/components/admin/tabs/SalariesTab';
import CommercialTab from '@/components/admin/tabs/CommercialTab';

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
  
  return (
    <Card>
      <CardHeader className="border-b pb-2">
        <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="details" className="mt-0">
            <ApplicationOverview status={status} formData={formData} />
          </TabsContent>
          
          <TabsContent value="awards" className="mt-0">
            <AwardsTab awards={formData.awards} />
          </TabsContent>
          
          <TabsContent value="memberships" className="mt-0">
            <MembershipsTab memberships={formData.memberships} />
          </TabsContent>
          
          <TabsContent value="publications" className="mt-0">
            <PublicationsTab publications={formData.publishedMaterials} />
          </TabsContent>
          
          <TabsContent value="judging" className="mt-0">
            <JudgingTab judgingExperiences={formData.judgingExperiences} />
          </TabsContent>
          
          <TabsContent value="contributions" className="mt-0">
            <ContributionsTab contributions={formData.originalContributions} />
          </TabsContent>
          
          <TabsContent value="articles" className="mt-0">
            <ArticlesTab articles={formData.scholarlyArticles} />
          </TabsContent>
          
          <TabsContent value="exhibitions" className="mt-0">
            <ExhibitionsTab exhibitions={formData.exhibitions} />
          </TabsContent>
          
          <TabsContent value="leadingRoles" className="mt-0">
            <LeadingRolesTab leadingRoles={formData.leadingRoles} />
          </TabsContent>
          
          <TabsContent value="salaries" className="mt-0">
            <SalariesTab salaries={formData.highSalaries} />
          </TabsContent>
          
          <TabsContent value="commercial" className="mt-0">
            <CommercialTab commercial={formData.commercialSuccesses} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApplicationTabs;


import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

interface TabsHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsHeader: React.FC<TabsHeaderProps> = ({ activeTab, setActiveTab }) => {
  const isMobile = useIsMobile();

  return (
    <ScrollArea className="w-full" orientation="horizontal">
      <div className="min-w-max pb-3">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={isMobile ? "flex flex-wrap gap-1 justify-start" : "flex w-full"}>
            <TabsTrigger value="details" className="flex-shrink-0">Overview</TabsTrigger>
            <TabsTrigger value="awards" className="flex-shrink-0">Prizes & Awards</TabsTrigger>
            <TabsTrigger value="memberships" className="flex-shrink-0">Memberships</TabsTrigger>
            <TabsTrigger value="publications" className="flex-shrink-0">Publications</TabsTrigger>
            <TabsTrigger value="judging" className="flex-shrink-0">Judging</TabsTrigger>
            <TabsTrigger value="contributions" className="flex-shrink-0">Contributions</TabsTrigger>
            <TabsTrigger value="articles" className="flex-shrink-0">Articles</TabsTrigger>
            <TabsTrigger value="exhibitions" className="flex-shrink-0">Exhibitions</TabsTrigger>
            <TabsTrigger value="leadingRoles" className="flex-shrink-0">Leading Roles</TabsTrigger>
            <TabsTrigger value="salaries" className="flex-shrink-0">Salaries</TabsTrigger>
            <TabsTrigger value="commercial" className="flex-shrink-0">Commercial</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default TabsHeader;

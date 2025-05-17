
import React from 'react';
import EntryCardList, { EntryCard } from '@/components/admin/EntryCardList';

interface CommercialTabProps {
  commercial: any[];
}

const CommercialTab: React.FC<CommercialTabProps> = ({ commercial = [] }) => {
  return (
    <EntryCardList 
      title="Commercial Successes"
      entries={commercial}
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
  );
};

export default CommercialTab;

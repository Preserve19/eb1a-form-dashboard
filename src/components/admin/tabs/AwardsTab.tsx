
import React from 'react';
import EntryCardList, { EntryCard } from '@/components/admin/EntryCardList';

interface AwardsTabProps {
  awards: any[];
}

const AwardsTab: React.FC<AwardsTabProps> = ({ awards = [] }) => {
  return (
    <EntryCardList 
      title="Prizes & Awards"
      entries={awards}
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
  );
};

export default AwardsTab;

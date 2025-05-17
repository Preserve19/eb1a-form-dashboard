
import React from 'react';
import EntryCardList, { EntryCard } from '@/components/admin/EntryCardList';

interface ContributionsTabProps {
  contributions: any[];
}

const ContributionsTab: React.FC<ContributionsTabProps> = ({ contributions = [] }) => {
  return (
    <EntryCardList 
      title="Original Contributions"
      entries={contributions}
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
  );
};

export default ContributionsTab;

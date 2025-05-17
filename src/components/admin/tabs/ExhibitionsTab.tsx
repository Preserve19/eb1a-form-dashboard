
import React from 'react';
import EntryCardList, { EntryCard } from '@/components/admin/EntryCardList';

interface ExhibitionsTabProps {
  exhibitions: any[];
}

const ExhibitionsTab: React.FC<ExhibitionsTabProps> = ({ exhibitions = [] }) => {
  return (
    <EntryCardList 
      title="Exhibitions"
      entries={exhibitions}
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
  );
};

export default ExhibitionsTab;


import React from 'react';
import EntryCardList, { EntryCard } from '@/components/admin/EntryCardList';

interface PublicationsTabProps {
  publications: any[];
}

const PublicationsTab: React.FC<PublicationsTabProps> = ({ publications = [] }) => {
  return (
    <EntryCardList 
      title="Published Materials"
      entries={publications}
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
  );
};

export default PublicationsTab;

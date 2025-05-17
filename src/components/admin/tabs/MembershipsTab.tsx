
import React from 'react';
import EntryCardList, { EntryCard } from '@/components/admin/EntryCardList';

interface MembershipsTabProps {
  memberships: any[];
}

const MembershipsTab: React.FC<MembershipsTabProps> = ({ memberships = [] }) => {
  return (
    <EntryCardList 
      title="Memberships"
      entries={memberships}
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
  );
};

export default MembershipsTab;

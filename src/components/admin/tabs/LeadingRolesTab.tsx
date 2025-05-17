
import React from 'react';
import EntryCardList, { EntryCard } from '@/components/admin/EntryCardList';

interface LeadingRolesTabProps {
  leadingRoles: any[];
}

const LeadingRolesTab: React.FC<LeadingRolesTabProps> = ({ leadingRoles = [] }) => {
  return (
    <EntryCardList 
      title="Leading Roles"
      entries={leadingRoles}
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
  );
};

export default LeadingRolesTab;


import React from 'react';
import EntryCardList, { EntryCard } from '@/components/admin/EntryCardList';

interface JudgingTabProps {
  judgingExperiences: any[];
}

const JudgingTab: React.FC<JudgingTabProps> = ({ judgingExperiences = [] }) => {
  return (
    <EntryCardList 
      title="Judging Experiences"
      entries={judgingExperiences}
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
  );
};

export default JudgingTab;

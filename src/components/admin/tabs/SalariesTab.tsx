
import React from 'react';
import EntryCardList, { EntryCard } from '@/components/admin/EntryCardList';

interface SalariesTabProps {
  salaries: any[];
}

const SalariesTab: React.FC<SalariesTabProps> = ({ salaries = [] }) => {
  return (
    <EntryCardList 
      title="High Salaries"
      entries={salaries}
      renderEntry={(salary) => (
        <EntryCard 
          key={salary.id}
          title={salary.employerName}
          subtitle={`${salary.baseSalary} ${salary.currency} ${salary.frequency} • ${salary.startDate} ${salary.endDate ? `to ${salary.endDate}` : 'to Present'}`}
          fields={[
            { label: "Employer", value: salary.employerName },
            { label: "Base Salary", value: `${salary.baseSalary} ${salary.currency} ${salary.frequency}` },
            { label: "Employment Period", value: `${salary.startDate} ${salary.endDate ? `to ${salary.endDate}` : 'to Present'}` },
            { label: "Additional Compensation", value: salary.additionalCompensation || 'None' }
          ]}
          links={[
            ...(salary.salaryDocUrl ? [{ url: salary.salaryDocUrl, label: 'Salary Documentation' }] : []),
            ...(salary.industryEvidenceUrl ? [{ url: salary.industryEvidenceUrl, label: 'Industry Comparison' }] : []),
            ...(salary.expertLettersUrl ? [{ url: salary.expertLettersUrl, label: 'Expert Letters' }] : [])
          ]}
        />
      )}
    />
  );
};

export default SalariesTab;

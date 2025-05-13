
import { useForm } from '@/contexts/FormContext';
import { Card } from '@/components/ui/card';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const FinalReview = () => {
  const { formData } = useForm();

  // Calculate how many criteria have entries
  const criteriaWithEntries = [
    { name: 'Prizes & Awards', count: formData.awards.length },
    { name: 'Memberships', count: formData.memberships.length },
    { name: 'Published Materials', count: formData.publishedMaterials.length },
    { name: 'Judging Experience', count: formData.judgingExperiences.length },
    { name: 'Original Contributions', count: formData.originalContributions.length },
    { name: 'Scholarly Articles', count: formData.scholarlyArticles.length },
    { name: 'Exhibitions', count: formData.exhibitions.length },
    { name: 'Leading Roles', count: formData.leadingRoles.length },
    { name: 'High Salary Evidence', count: formData.highSalaries.length },
    { name: 'Commercial Success', count: formData.commercialSuccesses.length }
  ];

  const completedCriteria = criteriaWithEntries.filter(c => c.count > 0);
  const hasSufficientCriteria = completedCriteria.length >= 3;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Review and Submit</h2>
        <p className="mt-2 text-gray-600">
          Please review all the information you have entered. Once you are satisfied, click the "Submit Application"
          button below.
        </p>
      </div>

      {!hasSufficientCriteria && (
        <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
          <div className="flex">
            <div className="shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">Insufficient Criteria</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  You have only completed {completedCriteria.length} out of the minimum required 3 criteria.
                  Please go back and complete at least one more criterion before submitting.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {hasSufficientCriteria && (
        <div className="rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
          <div className="flex">
            <div className="shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">Ready to Submit</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  You have completed {completedCriteria.length} criteria, which meets the minimum requirement of 3.
                  You can now submit your application.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Summary of Information Provided</h3>
        
        <Card className="mb-6 bg-gray-50 p-4">
          <h4 className="mb-2 font-medium text-gray-900">Applicant Information</h4>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-600">Full Name:</p>
              <p className="font-medium">{formData.fullName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Email:</p>
              <p>{formData.email}</p>
            </div>
          </div>
        </Card>
        
        <h4 className="mb-3 font-medium text-gray-900">Completed Criteria:</h4>
        <div className="space-y-2">
          {criteriaWithEntries.map((criterion, index) => (
            <div key={index} className="flex items-center justify-between rounded-md border p-3">
              <span className="font-medium">{criterion.name}</span>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">
                  {criterion.count} {criterion.count === 1 ? 'entry' : 'entries'}
                </span>
                {criterion.count > 0 ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <span className="text-sm text-gray-400">Not provided</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <h3 className="text-lg font-medium text-blue-800">Final Check</h3>
        <p className="mt-2 text-sm text-blue-700">
          Ensure all required fields are completed and necessary documents are uploaded before submitting. 
          You cannot edit the form after submission through this interface. File uploads will occur upon final submission. 
          This action is final.
        </p>
      </div>
    </div>
  );
};

export default FinalReview;

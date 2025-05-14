
import { EB1AFormData } from '@/types';

interface ApplicationOverviewProps {
  status: string;
  formData: EB1AFormData;
}

const ApplicationOverview = ({ status, formData }: ApplicationOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="mb-3 text-lg font-medium">Application Status</h3>
        <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
          status === 'submitted' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-amber-100 text-amber-800'
        }`}>
          {status === 'submitted' ? 'Submitted' : 'Draft'}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="mb-3 text-lg font-medium">Submission Summary</h3>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Applicant Name</p>
              <p className="text-base">{formData.fullName || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email Address</p>
              <p className="text-base">{formData.email || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone Number</p>
              <p className="text-base">{formData.phone || 'Not provided'}</p>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1 pr-4 font-medium">Prizes & Awards</td>
                  <td className="text-right">{formData.awards?.length || 0} entries</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 font-medium">Memberships</td>
                  <td className="text-right">{formData.memberships?.length || 0} entries</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 font-medium">Published Materials</td>
                  <td className="text-right">{formData.publishedMaterials?.length || 0} entries</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 font-medium">Judging Experience</td>
                  <td className="text-right">{formData.judgingExperiences?.length || 0} entries</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 font-medium">Original Contributions</td>
                  <td className="text-right">{formData.originalContributions?.length || 0} entries</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 font-medium">Scholarly Articles</td>
                  <td className="text-right">{formData.scholarlyArticles?.length || 0} entries</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 font-medium">Exhibitions</td>
                  <td className="text-right">{formData.exhibitions?.length || 0} entries</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 font-medium">Leading Roles</td>
                  <td className="text-right">{formData.leadingRoles?.length || 0} entries</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 font-medium">High Salaries</td>
                  <td className="text-right">{formData.highSalaries?.length || 0} entries</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 font-medium">Commercial Successes</td>
                  <td className="text-right">{formData.commercialSuccesses?.length || 0} entries</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationOverview;

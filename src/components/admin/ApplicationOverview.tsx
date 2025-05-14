
import { EB1AFormData } from '@/types';

interface ApplicationOverviewProps {
  status: string;
  formData: EB1AFormData;
}

const ApplicationOverview = ({ status, formData }: ApplicationOverviewProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-medium">Application Status</h3>
        <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
          status === 'submitted' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-amber-100 text-amber-800'
        }`}>
          {status === 'submitted' ? 'Submitted' : 'Draft'}
        </div>
      </div>
      
      <div>
        <h3 className="mb-2 text-lg font-medium">Submission Summary</h3>
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="py-2 pr-4 font-medium">Prizes & Awards</td>
              <td>{formData.awards?.length || 0} entries</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">Memberships</td>
              <td>{formData.memberships?.length || 0} entries</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">Published Materials</td>
              <td>{formData.publishedMaterials?.length || 0} entries</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">Judging Experience</td>
              <td>{formData.judgingExperiences?.length || 0} entries</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">Original Contributions</td>
              <td>{formData.originalContributions?.length || 0} entries</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">Scholarly Articles</td>
              <td>{formData.scholarlyArticles?.length || 0} entries</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">Exhibitions</td>
              <td>{formData.exhibitions?.length || 0} entries</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">Leading Roles</td>
              <td>{formData.leadingRoles?.length || 0} entries</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">High Salaries</td>
              <td>{formData.highSalaries?.length || 0} entries</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">Commercial Successes</td>
              <td>{formData.commercialSuccesses?.length || 0} entries</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationOverview;

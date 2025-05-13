
import { AlertCircle } from 'lucide-react';

const Instructions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Instructions</h2>
        <p className="mt-2 text-gray-600">
          Welcome to the EB1A Navigator. Please fill out the following sections based on the evidence you have gathered
          for your EB-1A Extraordinary Ability petition. You must satisfy at least 3 of the 10 criteria listed below. Move
          through the steps using the buttons at the bottom.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
        <div className="flex">
          <div className="shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800">Important Note</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Provide detailed information and upload clear, relevant supporting documents for each criterion you
                claim. Ensure all uploaded files meet the specified format and size requirements (PDF, JPG, PNG, max
                10MB generally, 20MB for Scholarly Articles). Submission occurs on the final step after review. Check
                Firebase Storage rules if uploads fail.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">EB1A Criteria Overview</h3>
        
        <div className="space-y-2">
          <div className="rounded-md bg-white p-3 shadow-sm">
            <p className="font-medium text-gray-800">1. Prizes & Awards</p>
            <p className="text-sm text-gray-600">
              Document receipt of nationally or internationally recognized prizes or awards for excellence in your field.
            </p>
          </div>
          
          <div className="rounded-md bg-white p-3 shadow-sm">
            <p className="font-medium text-gray-800">2. Memberships</p>
            <p className="text-sm text-gray-600">
              Document membership in associations that require outstanding achievement for membership.
            </p>
          </div>
          
          <div className="rounded-md bg-white p-3 shadow-sm">
            <p className="font-medium text-gray-800">3. Published Material About You</p>
            <p className="text-sm text-gray-600">
              Document published material in professional or major trade publications or major media about you and your work.
            </p>
          </div>
          
          <div className="rounded-md bg-white p-3 shadow-sm">
            <p className="font-medium text-gray-800">4. Judge of the Work of Others</p>
            <p className="text-sm text-gray-600">
              Document your participation as a judge of the work of others in your field or a related field.
            </p>
          </div>
          
          <div className="rounded-md bg-white p-3 shadow-sm">
            <p className="font-medium text-gray-800">5. Original Scientific, Scholarly, or Business-Related Contributions</p>
            <p className="text-sm text-gray-600">
              Document your original contributions of major significance in your field.
            </p>
          </div>
          
          <div className="rounded-md bg-white p-3 shadow-sm">
            <p className="font-medium text-gray-800">6. Scholarly Articles</p>
            <p className="text-sm text-gray-600">
              Document your authorship of scholarly articles in professional journals or other major media.
            </p>
          </div>
          
          <div className="rounded-md bg-white p-3 shadow-sm">
            <p className="font-medium text-gray-800">7. Artistic Exhibitions</p>
            <p className="text-sm text-gray-600">
              Document the display of your work at artistic exhibitions or showcases.
            </p>
          </div>
          
          <div className="rounded-md bg-white p-3 shadow-sm">
            <p className="font-medium text-gray-800">8. Leading or Critical Role</p>
            <p className="text-sm text-gray-600">
              Document your performance in a leading or critical role for organizations with distinguished reputations.
            </p>
          </div>
          
          <div className="rounded-md bg-white p-3 shadow-sm">
            <p className="font-medium text-gray-800">9. High Salary</p>
            <p className="text-sm text-gray-600">
              Document that you have commanded a high salary or other significantly high remuneration for your services.
            </p>
          </div>
          
          <div className="rounded-md bg-white p-3 shadow-sm">
            <p className="font-medium text-gray-800">10. Commercial Success</p>
            <p className="text-sm text-gray-600">
              Document your commercial success in the performing arts, as shown by box office receipts or record, cassette, compact disk, or video sales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;

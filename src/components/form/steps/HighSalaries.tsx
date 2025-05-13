
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HighSalaries = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 9: High Salary Evidence
        </h2>
        <p className="mt-2 text-gray-600">
          Document that you have commanded a high salary or other significantly high remuneration for your services.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          You must demonstrate that your salary or remuneration is significantly higher than others in your field, reflecting your extraordinary ability.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <h3 className="mb-2 text-lg font-medium text-gray-900">No salary evidence added yet.</h3>
        <p className="mb-4 max-w-sm text-sm text-gray-500">
          Add evidence of high salary or remuneration that demonstrates your extraordinary ability in your field.
        </p>
        <Button className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700">
          <Plus size={16} />
          Add Salary/Remuneration Evidence
        </Button>
      </div>
    </div>
  );
};

export default HighSalaries;

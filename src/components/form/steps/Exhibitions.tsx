
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Exhibitions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 7: Display of Work at Artistic Exhibitions or Showcases
        </h2>
        <p className="mt-2 text-gray-600">
          Document the display of your work at artistic exhibitions or showcases.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          Your work must have been displayed at distinguished galleries, museums, or other venues. Evidence must show the significance of the venue and selection process.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <h3 className="mb-2 text-lg font-medium text-gray-900">No exhibitions added yet.</h3>
        <p className="mb-4 max-w-sm text-sm text-gray-500">
          Add exhibitions or showcases where your work has been displayed.
        </p>
        <Button className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700">
          <Plus size={16} />
          Add Exhibition/Showcase
        </Button>
      </div>
    </div>
  );
};

export default Exhibitions;

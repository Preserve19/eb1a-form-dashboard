
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PublishedMaterials = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 3: Published Material About You
        </h2>
        <p className="mt-2 text-gray-600">
          Document published material in professional or major trade publications or major media about you and your work.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          The material must be about you and your work, not authored by you. It should appear in professional publications or major media.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <h3 className="mb-2 text-lg font-medium text-gray-900">No published materials added yet.</h3>
        <p className="mb-4 max-w-sm text-sm text-gray-500">
          Add published materials from professional publications or major media about you and your work.
        </p>
        <Button className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700">
          <Plus size={16} />
          Add Published Material
        </Button>
      </div>
    </div>
  );
};

export default PublishedMaterials;

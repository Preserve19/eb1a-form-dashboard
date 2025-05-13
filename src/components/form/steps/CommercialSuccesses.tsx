
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommercialSuccesses = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 10: Commercial Success in the Performing Arts
        </h2>
        <p className="mt-2 text-gray-600">
          Document your commercial success in the performing arts, as shown by box office receipts or record, cassette, compact disk, or video sales.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          You must provide objective evidence of commercial success in the performing arts, such as sales figures, box office receipts, or other measurable indicators.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <h3 className="mb-2 text-lg font-medium text-gray-900">No commercial success evidence added yet.</h3>
        <p className="mb-4 max-w-sm text-sm text-gray-500">
          Add evidence of commercial success in the performing arts, such as box office receipts, sales figures, or streaming statistics.
        </p>
        <Button className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700">
          <Plus size={16} />
          Add Commercial Success Evidence
        </Button>
      </div>
    </div>
  );
};

export default CommercialSuccesses;

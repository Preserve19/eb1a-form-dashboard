
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface ApplicationNotFoundProps {
  onBack: () => void;
}

const ApplicationNotFound = ({ onBack }: ApplicationNotFoundProps) => {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2" size={16} />
          Back to Dashboard
        </Button>
      </div>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12">
          <AlertCircle className="mb-4 h-16 w-16 text-gray-300" />
          <h2 className="mb-2 text-2xl font-bold">Application Not Found</h2>
          <p className="text-muted-foreground">
            The application you're looking for doesn't exist or has been removed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationNotFound;


import { format } from 'date-fns';
import { User, Mail, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { EB1AFormData } from '@/types';

interface ApplicantInfoCardProps {
  fullName: string;
  email: string;
  createdAt: string;
  submittedAt: string | null;
  id: string;
  isDownloading: boolean;
  onDownload: () => void;
}

const ApplicantInfoCard = ({
  fullName,
  email,
  createdAt,
  submittedAt,
  id,
  isDownloading,
  onDownload
}: ApplicantInfoCardProps) => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Applicant Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="mt-0.5 h-5 w-5 text-gray-400" />
          <div>
            <p className="font-medium">{fullName}</p>
            <p className="text-sm text-muted-foreground">Applicant Name</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-5 w-5 text-gray-400" />
          <div>
            <p className="font-medium">{email}</p>
            <p className="text-sm text-muted-foreground">Email Address</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Calendar className="mt-0.5 h-5 w-5 text-gray-400" />
          <div>
            <p className="font-medium">
              {format(new Date(createdAt), 'PPP')}
            </p>
            <p className="text-sm text-muted-foreground">
              Created {format(new Date(createdAt), 'p')}
            </p>
          </div>
        </div>
        
        {submittedAt && (
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium text-green-600">
                {format(new Date(submittedAt), 'PPP')}
              </p>
              <p className="text-sm text-muted-foreground">
                Submitted {format(new Date(submittedAt), 'p')}
              </p>
            </div>
          </div>
        )}
        
        <div className="pt-4">
          <Button 
            className="w-full" 
            variant="outline"
            onClick={onDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Spinner size="sm" className="mr-2" /> Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" /> Download Full Application
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicantInfoCard;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, CheckCircle, Clock } from 'lucide-react';

interface StatsCardsProps {
  totalApplications: number;
  submittedApplications: number;
  draftApplications: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ 
  totalApplications, 
  submittedApplications, 
  draftApplications 
}) => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="bg-white shadow-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Applications</p>
            <h3 className="text-3xl font-bold text-gray-900">{totalApplications}</h3>
          </div>
          <FileText className="h-10 w-10 text-navy-200" />
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Submitted Applications</p>
            <h3 className="text-3xl font-bold text-green-600">{submittedApplications}</h3>
          </div>
          <CheckCircle className="h-10 w-10 text-green-200" />
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Draft Applications</p>
            <h3 className="text-3xl font-bold text-amber-600">{draftApplications}</h3>
          </div>
          <Clock className="h-10 w-10 text-amber-200" />
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;

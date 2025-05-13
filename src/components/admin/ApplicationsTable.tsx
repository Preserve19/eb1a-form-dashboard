
import React from 'react';
import { format } from 'date-fns';
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { CheckCircle, Clock, Users } from 'lucide-react';
import { FormSummary } from '@/types';

interface ApplicationsTableProps {
  data: FormSummary[];
  isLoading: boolean;
  onView: (id: string) => void;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ data, isLoading, onView }) => {
  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Spinner size="lg" />
          <p className="text-sm text-gray-500">Loading applications...</p>
        </div>
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <div className="text-center">
          <Users size={40} className="mx-auto mb-2 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900">No applications found</h3>
          <p className="text-gray-500">There are no applications matching your criteria</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Application ID</TableHead>
            <TableHead>Applicant</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-mono text-xs">{application.id}</TableCell>
              <TableCell className="font-medium">{application.fullName}</TableCell>
              <TableCell>{application.email}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {application.status === 'submitted' ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      <CheckCircle size={12} className="mr-1" />
                      Submitted
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                      <Clock size={12} className="mr-1" />
                      Draft
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>{application.createdAt ? format(new Date(application.createdAt), 'MMM d, yyyy') : '-'}</TableCell>
              <TableCell>{application.updatedAt ? format(new Date(application.updatedAt), 'MMM d, yyyy') : '-'}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onView(application.id)}
                  className="text-navy-800 hover:text-navy-600"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationsTable;

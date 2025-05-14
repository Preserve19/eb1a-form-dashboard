
import { Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LinkData {
  url: string;
  label: string;
}

export interface EntryCardProps {
  title: string;
  subtitle: string;
  description?: string;
  fields?: { label: string; value: string }[];
  links?: LinkData[];
  key?: string | number;
}

export const EntryCard = ({ title, subtitle, description, fields, links }: EntryCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-bold text-lg">{title}</h4>
        <p className="text-sm text-gray-500 mb-3">{subtitle}</p>
        
        {description && (
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-600">Description:</p>
            <p className="mt-1">{description}</p>
          </div>
        )}
        
        {fields && fields.length > 0 && (
          <div className="mt-2 space-y-3">
            {fields.map((field, idx) => (
              <div key={idx} className="mt-1">
                <p className="text-sm font-medium text-gray-600">{field.label}:</p>
                <p className="text-gray-900 mt-1">{field.value}</p>
              </div>
            ))}
          </div>
        )}
        
        {links && links.length > 0 && (
          <div className="mt-4 border-t pt-3">
            <p className="text-sm font-medium text-gray-600 mb-2">Supporting Documents:</p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {links.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                >
                  <Download className="mr-1 inline h-4 w-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface EntryCardListProps {
  title: string;
  entries: any[] | undefined;
  renderEntry: (entry: any, index: number) => React.ReactNode;
  emptyMessage?: string;
}

const EntryCardList = ({ 
  title, 
  entries = [], 
  renderEntry,
  emptyMessage = "No entries submitted." 
}: EntryCardListProps) => {
  return (
    <>
      <h3 className="mb-4 text-lg font-medium">{title}</h3>
      {entries && entries.length > 0 ? (
        <div className="space-y-4">
          {entries.map((entry, index) => renderEntry(entry, index))}
        </div>
      ) : (
        <p className="text-muted-foreground">{emptyMessage}</p>
      )}
    </>
  );
};

export default EntryCardList;

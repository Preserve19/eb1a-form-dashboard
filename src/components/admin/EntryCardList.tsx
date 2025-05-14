
import { Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LinkData {
  url: string;
  label: string;
}

interface EntryCardProps {
  title: string;
  subtitle: string;
  description?: string;
  fields?: { label: string; value: string }[];
  links?: LinkData[];
}

export const EntryCard = ({ title, subtitle, description, fields, links }: EntryCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm text-gray-500">{subtitle}</p>
        {description && <p className="mt-2">{description}</p>}
        
        {fields && fields.length > 0 && (
          <div className="mt-2">
            {fields.map((field, idx) => (
              <div key={idx} className="mt-1">
                <p className="text-sm font-medium text-gray-500">{field.label}</p>
                <p className="text-gray-900">{field.value}</p>
              </div>
            ))}
          </div>
        )}
        
        {links && links.length > 0 && (
          <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
            {links.map((link, idx) => (
              <a 
                key={idx}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <Download className="mr-1 inline h-4 w-4" />
                {link.label}
              </a>
            ))}
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

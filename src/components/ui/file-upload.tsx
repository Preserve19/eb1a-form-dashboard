
import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { X, Upload, Check } from 'lucide-react';
import { uploadFile } from '@/lib/supabase';
import { Spinner } from './spinner';
import { toast } from '@/components/ui/use-toast';

interface FileUploadProps {
  id: string;
  label: string;
  hint?: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  accept?: string;
  maxSize?: number; // in MB
  path: string; // Storage path
  className?: string;
}

export function FileUpload({
  id,
  label,
  hint,
  value,
  onChange,
  accept = 'application/pdf,image/png,image/jpeg',
  maxSize = 10, // Default max size is 10MB
  path,
  className = '',
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(
    value ? value.split('/').pop() : null
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds the limit of ${maxSize}MB`);
      toast({
        variant: "destructive",
        title: "File too large",
        description: `File size exceeds the limit of ${maxSize}MB`
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // We use 'uploads' as the bucket name and generate a unique file path
      const bucketName = 'uploads';
      const uniqueFilePath = `${path}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      console.log(`Uploading to bucket: ${bucketName}, path: ${uniqueFilePath}`);
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 10;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);
      
      const fileUrl = await uploadFile(
        bucketName,
        uniqueFilePath,
        file,
        (progress) => {
          console.log(`Upload progress: ${progress}%`);
          setUploadProgress(progress);
        }
      );
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (fileUrl) {
        onChange(fileUrl);
        setFileName(file.name);
        toast({
          title: "File uploaded successfully",
          description: "Your file has been uploaded and attached to the form."
        });
      } else {
        throw new Error('No file URL returned');
      }
    } catch (error: any) {
      console.error('Error in file-upload component:', error);
      setError(error.message || 'An error occurred during upload. Please try again.');
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "An error occurred during upload. Please try again."
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange(undefined);
    setFileName(null);
    setError(null);
    toast({
      title: "File removed",
      description: "The file has been removed from the form."
    });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      {!value && !isUploading ? (
        <>
          <div className="mt-1 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
              asChild
              disabled={isUploading}
            >
              <label htmlFor={id}>
                <Upload size={16} /> Choose File
                <Input
                  id={id}
                  type="file"
                  accept={accept}
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </Button>
            {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
          </div>
          {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
        </>
      ) : isUploading ? (
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2">
            <Spinner size="sm" />
            <span className="text-sm">Uploading... {Math.round(uploadProgress)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex items-center justify-between rounded-md border bg-secondary/50 p-2 text-sm">
          <div className="flex items-center gap-2 overflow-hidden">
            <Check size={16} className="shrink-0 text-green-600" />
            <span className="truncate">{fileName || 'File uploaded'}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="h-8 w-8 p-0"
          >
            <X size={16} />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      )}
    </div>
  );
}

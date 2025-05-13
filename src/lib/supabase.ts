import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';
import { FormSummary } from '@/types';

// Supabase configuration
const supabaseUrl = 'https://stvalkqotmltdiuavnaj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0dmFsa3FvdG1sdGRpdWF2bmFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMzc0ODQsImV4cCI6MjA2MjcxMzQ4NH0.kB3Fue-zhojgVed1F2pNEUbx2YKAeIw3ZKd35e_eAYc';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to download form data as Excel
export const downloadExcel = async (data: FormSummary[]): Promise<Blob> => {
  // Convert data to Excel-friendly format
  const excelData = data.map(item => ({
    'Application ID': item.id,
    'Full Name': item.fullName,
    'Email': item.email,
    'Status': item.status,
    'Created Date': item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-',
    'Last Updated': item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : '-',
    'Submitted Date': item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : '-'
  }));
  
  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications');
  
  // Generate Excel file as array buffer
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  // Convert to Blob
  return new Blob([excelBuffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
};

// Helper function to upload a file to Supabase Storage
export const uploadFile = async (
  bucketName: string,
  filePath: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  // Set up event listener for upload progress if callback is provided
  if (onProgress) {
    // @ts-ignore - The progress event is available but not in the types
    const subscription = supabase.storage.from(bucketName)
      .upload(filePath, file, { upsert: true })
      .on('uploadProgress', (progress: { loaded: number; total: number }) => {
        const progressPercent = (progress.loaded / progress.total) * 100;
        onProgress(progressPercent);
      });
      
    // Make the actual upload request
    const { data, error } = await subscription;
    
    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
    
    // Return the full URL to the file
    const { data: publicUrl } = supabase.storage.from(bucketName).getPublicUrl(data.path);
    return publicUrl.publicUrl;
  } else {
    // If no progress callback, use the simpler version
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, { upsert: true });
    
    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
    
    // Return the full URL to the file
    const { data: publicUrl } = supabase.storage.from(bucketName).getPublicUrl(data.path);
    return publicUrl.publicUrl;
  }
};

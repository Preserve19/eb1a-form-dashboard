
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
  try {
    console.log(`Starting upload to bucket: ${bucketName}, path: ${filePath}`);
    
    // Verify bucket exists
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
      console.error('Error checking buckets:', bucketError);
      throw new Error(`Error checking buckets: ${bucketError.message}`);
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    if (!bucketExists) {
      console.error(`Bucket '${bucketName}' does not exist`);
      throw new Error(`Bucket '${bucketName}' does not exist`);
    }
    
    console.log(`Uploading file: ${file.name}, size: ${file.size} bytes`);
    
    // Upload the file
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, { 
        upsert: true,
        cacheControl: '3600'
      });
      
    if (error) {
      console.error('Supabase storage upload error:', error);
      throw error;
    }
    
    console.log('Upload successful, data:', data);
    
    // If there's a progress callback, simulate progress
    if (onProgress) {
      // Call it with 100% when upload is complete
      onProgress(100);
    }
    
    // Return the full URL to the file
    const { data: publicUrl } = supabase.storage.from(bucketName).getPublicUrl(data.path);
    console.log('Public URL generated:', publicUrl.publicUrl);
    return publicUrl.publicUrl;
  } catch (error: any) {
    console.error('Error uploading file:', error);
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

// Function to download a complete application as PDF or Excel
export const downloadApplicationDetail = async (applicationId: string): Promise<Blob> => {
  try {
    // Fetch the application details
    const { data, error } = await supabase
      .from('eb1a_forms')
      .select('*')
      .eq('id', applicationId)
      .single();
      
    if (error) throw error;
    if (!data) throw new Error('Application not found');
    
    // Create an Excel workbook with multiple sheets
    const workbook = XLSX.utils.book_new();
    
    // Add main info sheet
    const mainInfo = [{
      'Application ID': data.id,
      'Full Name': data.data.fullName,
      'Email': data.data.email,
      'Status': data.status,
      'Created Date': data.created_at ? new Date(data.created_at).toLocaleDateString() : '-',
      'Updated Date': data.updated_at ? new Date(data.updated_at).toLocaleDateString() : '-',
      'Submitted Date': data.submitted_at ? new Date(data.submitted_at).toLocaleDateString() : '-'
    }];
    
    const mainSheet = XLSX.utils.json_to_sheet(mainInfo);
    XLSX.utils.book_append_sheet(workbook, mainSheet, 'General Info');
    
    // Create sheets for each criteria
    const criteriaTypes = [
      { key: 'awards', name: 'Awards' },
      { key: 'memberships', name: 'Memberships' },
      { key: 'publishedMaterials', name: 'Publications' },
      { key: 'judgingExperiences', name: 'Judging' },
      { key: 'originalContributions', name: 'Contributions' },
      { key: 'scholarlyArticles', name: 'Articles' },
      { key: 'exhibitions', name: 'Exhibitions' },
      { key: 'leadingRoles', name: 'Leading Roles' },
      { key: 'highSalaries', name: 'High Salaries' },
      { key: 'commercialSuccesses', name: 'Commercial' }
    ];
    
    // Add a sheet for each criteria if there's data
    criteriaTypes.forEach(({ key, name }) => {
      if (data.data[key] && data.data[key].length > 0) {
        const sheet = XLSX.utils.json_to_sheet(data.data[key]);
        XLSX.utils.book_append_sheet(workbook, sheet, name);
      }
    });
    
    // Generate Excel file as array buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    // Convert to Blob
    return new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
  } catch (error: any) {
    console.error('Error downloading application:', error);
    throw new Error(`Error downloading application: ${error.message}`);
  }
};

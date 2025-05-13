
import { createClient } from '@supabase/supabase-js';
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Use the client from the integration rather than environment variables
export const supabase = supabaseClient;

export async function uploadFile(file: File, path: string): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error } = await supabase.storage
      .from('eb1a-documents')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }

    // Get public URL for the file
    const { data } = supabase.storage
      .from('eb1a-documents')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    return null;
  }
}

export async function downloadExcel(data: any): Promise<Blob> {
  // This would typically be a server-side function, but we're mocking it here
  const mockExcel = new Blob(['Excel data for ' + JSON.stringify(data)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  return mockExcel;
}

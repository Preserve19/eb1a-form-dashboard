
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Using fallback values.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

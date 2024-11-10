// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xlbxgqibhwirtyzaymyr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYnhncWliaHdpcnR5emF5bXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyMTEwNzEsImV4cCI6MjA0Njc4NzA3MX0.Mwnlmk_DB7x2kZm1vj7DZJ0VM4rl4xTO42i-aTdmLac';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

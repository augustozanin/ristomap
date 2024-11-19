
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rmjvjkeviuvmbrphaptz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtanZqa2V2aXV2bWJycGhhcHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNjQzMjksImV4cCI6MjA0Njk0MDMyOX0.1VKFPbUAMGnFJlIX5drVIzUeMRK1ZeP18E9cU3E_2uU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

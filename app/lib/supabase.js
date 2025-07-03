import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';

// Your Supabase project URL and Anon Key
const supabaseUrl = 'https://acoymqfkuzaqlrxtwgqi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjb3ltcWZrdXphcWxyeHR3Z3FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MDY4MjQsImV4cCI6MjA1MzA4MjgyNH0.-lkp1hJc9kZRD7ZgLrW_6h_96BuDvpmOvXq_-hoQmxI';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,  // Store session in AsyncStorage
    autoRefreshToken: true,  // Automatically refresh session
    persistSession: true,  // Persist session across app reloads
    detectSessionInUrl: false,  // Disable session detection in the URL
  },
});

// Handling auto-refresh of the session
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default supabase;
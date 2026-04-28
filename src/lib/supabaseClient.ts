import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tbhlchtywbomxvhqrxal.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiaGxjaHR5d2JvbXh2aHFyeGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjQzNTQsImV4cCI6MjA5Mjk0MDM1NH0.TCKNHUck_GnW2E7XE7ypz_YIpBfy106dT8_p7mJeiTk'

export const supabase = createClient(supabaseUrl, supabaseKey)
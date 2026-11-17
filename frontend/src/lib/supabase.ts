import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabaseIsConfigured = Boolean(
  supabaseUrl && supabasePublishableKey
);

export const supabase = supabaseIsConfigured
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;

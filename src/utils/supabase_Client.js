import { createClient } from "@supabase/supabase-js";

// Use environment variables from .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fallback to hardcoded values if environment variables are not available
const url = supabaseUrl || "https://naxtiptpihpsbbxtarzv.supabase.co";
const key = supabaseKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5heHRpcHRwaWhwc2JieHRhcnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNzM4MzQsImV4cCI6MjA2NTg0OTgzNH0.DZUB04q3O8ZN-bE3Z2cGdrB4I8nx7UoOjiD_g0thJp8";

let supabase;

try {
  if (!url || !key) {
    throw new Error("Supabase URL or key is missing");
  }
  
  supabase = createClient(url, key);
  console.log("Supabase client created successfully");
} catch (error) {
  console.error("Error creating Supabase client:", error);
  // Create a mock client to prevent app crashes
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: new Error("Supabase connection failed") }),
      insert: () => Promise.resolve({ data: null, error: new Error("Supabase connection failed") })
    })
  };
}

export default supabase;

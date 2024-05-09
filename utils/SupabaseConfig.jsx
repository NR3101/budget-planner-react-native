import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://visqpdjjzawbpmesbdfl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpc3FwZGpqemF3YnBtZXNiZGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMjIzMjYsImV4cCI6MjAyOTc5ODMyNn0.zadrnG6hD6uXOqFpmbzTCIY3jL8gj0s7pfAcbJsKfBM"
);

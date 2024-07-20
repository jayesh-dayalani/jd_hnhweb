import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://kmwcrmfplblrdgzowdre.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttd2NybWZwbGJscmRnem93ZHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5NzM0MjYsImV4cCI6MjAzNjU0OTQyNn0.yjh4h3GmKS9vpSIhKhYZlnvfv4aA6AcbyhHrOvIQauQ')

export default supabase
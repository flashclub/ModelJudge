// import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

import config from "@/config";

export const createSupabaseClient = () => {
  return createClient(
    config.database.supabaseUrl!,
    config.database.supabaseServiceKey!
  );
};

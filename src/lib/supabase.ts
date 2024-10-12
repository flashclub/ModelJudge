import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import config from "@/config";

if (!config.database.supabaseUrl || !config.database.supabaseServiceKey) {
  throw new Error("Missing Supabase URL or service key in configuration");
}

export const createClient = () => {
  const cookieStore = cookies();
  return createServerClient(
    config.database.supabaseUrl!,
    config.database.supabaseServiceKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

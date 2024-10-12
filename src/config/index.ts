type Config = {
  nextAuth: {
    secret: string | undefined;
  };
  auth: {
    google: {
      clientId: string | undefined;
      clientSecret: string | undefined;
    };
    github: {
      clientId: string | undefined;
      clientSecret: string | undefined;
    };
  };
  fal: {
    apiKey: string | undefined;
  };
  database: {
    supabaseUrl: string | undefined;
    supabaseServiceKey: string | undefined;
  };
  freeUsageLimit: number;
  defaultLocale: string;
  supportedLocales: string[];
  imageGenerationSettings: {
    defaultInferenceSteps: number;
    defaultGuidanceScale: number;
    defaultNumImages: number;
    maxNumImages: number;
    defaultEnableSafetyChecker: boolean;
  };
};

const config: Config = {
  nextAuth: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  auth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    },
  },
  fal: {
    apiKey: process.env.FAL_KEY,
  },
  database: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
  },
  freeUsageLimit: process.env.FREE_USAGE_LIMIT
    ? parseInt(process.env.FREE_USAGE_LIMIT, 10)
    : 5,
  defaultLocale: "zh",
  supportedLocales: ["en", "zh"],
  imageGenerationSettings: {
    defaultInferenceSteps: 28,
    defaultGuidanceScale: 3.5,
    defaultNumImages: 1,
    maxNumImages: 4,
    defaultEnableSafetyChecker: true,
  },
};

export default config;

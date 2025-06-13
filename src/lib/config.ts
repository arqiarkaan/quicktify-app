// Configuration for app limits
export interface AppConfig {
  limitsEnabled: boolean;
  analysisLimit: number;
  estimationLimit: number;
  displayMode?: string; // For display purposes only
}

// Get configuration from environment variables
export const getAppConfig = (): AppConfig => {
  // Method 1: Custom limits (highest priority)
  const customAnalysisLimit = import.meta.env.VITE_ANALYSIS_LIMIT;
  const customEstimationLimit = import.meta.env.VITE_ESTIMATION_LIMIT;

  if (customAnalysisLimit || customEstimationLimit) {
    return {
      limitsEnabled: true,
      analysisLimit: customAnalysisLimit ? parseInt(customAnalysisLimit) : 30,
      estimationLimit: customEstimationLimit
        ? parseInt(customEstimationLimit)
        : 30,
      displayMode: 'CUSTOM',
    };
  }

  // Method 2: Preset modes (medium priority)
  const showMode = import.meta.env.VITE_SHOW_MODE;

  if (showMode === 'DEMO') {
    return {
      limitsEnabled: true,
      analysisLimit: 5,
      estimationLimit: 5,
      displayMode: 'DEMO',
    };
  }

  if (showMode === 'DEFAULT') {
    return {
      limitsEnabled: true,
      analysisLimit: 30,
      estimationLimit: 30,
      displayMode: 'DEFAULT',
    };
  }

  // Method 3: No limits (lowest priority - when nothing is set)
  return {
    limitsEnabled: false,
    analysisLimit: 0, // 0 means unlimited
    estimationLimit: 0, // 0 means unlimited
    displayMode: 'UNLIMITED',
  };
};

// Export the configuration
export const appConfig = getAppConfig();

// Helper functions
export const isLimitEnabled = (): boolean => appConfig.limitsEnabled;
export const getAnalysisLimit = (): number => appConfig.analysisLimit;
export const getEstimationLimit = (): number => appConfig.estimationLimit;
export const getDisplayMode = (): string =>
  appConfig.displayMode || 'UNLIMITED';

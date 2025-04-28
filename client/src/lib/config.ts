/**
 * Configuration for client in standalone mode
 */

export const config = {
  // Detect if running in standalone mode (on Vercel or localhost without server)
  isStandalone: true,
  
  // Mock API responses for standalone mode
  enableMocks: true,
  
  // Base URL for API requests when not in standalone mode
  apiBaseUrl: '/api',
  
  // Feature flags
  features: {
    properties: true,
    contact: true,
    admin: false, // Disable admin features in standalone mode
  }
};

/**
 * Log configuration for debugging
 */
if (typeof window !== 'undefined') {
  console.log('Client configuration:', config);
  console.log('Environment:', { 
    hostname: window.location.hostname,
    standalone: config.isStandalone
  });
}

export default config; 
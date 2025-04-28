import { Session } from 'express-session';

// Extend the express-session Session type
declare module 'express-session' {
  interface Session {
    userId?: number;
    isAuthenticated?: boolean;
  }
}
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  username: string;
}

// Check if we're running in development mode without a server
const isDevWithoutServer = process.env.NODE_ENV === 'development' && (localStorage.getItem('USE_FALLBACK_AUTH') === 'true' || window.location.search.includes('use_fallback=true'));

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isDevWithoutServer ? false : false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(!isDevWithoutServer);

  const { data, isError, refetch } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: isDevWithoutServer ? 0 : 1,
    refetchOnWindowFocus: false,
    enabled: !isDevWithoutServer, // Don't run the query if we're in fallback mode
  });

  useEffect(() => {
    // If we're in fallback mode, we don't need to wait for the query
    if (isDevWithoutServer) {
      setLoading(false);
      return;
    }

    if (data) {
      setUser(data as User);
      setIsAuthenticated(true);
      setLoading(false);
    }

    if (isError) {
      // If we get an error, check if it might be because the server is not running
      if (isDevWithoutServer === false) {
        console.log('Auth API not available, enabling fallback auth mode');
        localStorage.setItem('USE_FALLBACK_AUTH', 'true');
      }
      
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [data, isError]);

  const login = async (username: string, password: string) => {
    if (isDevWithoutServer) {
      // In dev mode, simulate successful login with mock admin
      if (username === 'admin' && password === 'admin') {
        const mockUser = { id: 1, username: 'admin' };
        setUser(mockUser);
        setIsAuthenticated(true);
        return { success: true, user: mockUser };
      }
      return { success: false, error: 'Invalid credentials' };
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setIsAuthenticated(true);
        refetch();
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: 'Server error, try again later' };
    }
  };

  const logout = async () => {
    if (isDevWithoutServer) {
      // In dev mode without server, just clear the auth state
      setUser(null);
      setIsAuthenticated(false);
      return;
    }

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      setIsAuthenticated(false);
      // Invalidate the cache
      refetch();
    } catch (error) {
      console.error('Error logging out:', error);
      // Even if the API call fails, we should still log out the user locally
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    refetch,
    isDevMode: isDevWithoutServer
  };
}
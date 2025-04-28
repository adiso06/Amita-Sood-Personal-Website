import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  username: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { data, isError, refetch } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: 0,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (data) {
      setUser(data as User);
      setIsAuthenticated(true);
      setLoading(false);
    }

    if (isError) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [data, isError]);

  const logout = async () => {
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
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    logout,
    refetch
  };
}
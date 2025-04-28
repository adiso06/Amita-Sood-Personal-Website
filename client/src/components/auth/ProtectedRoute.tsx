import { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data, isError } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: 0,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (isError) {
      setIsAuthenticated(false);
      setLoading(false);
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      setLocation('/login');
    }

    if (data) {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, [data, isError, toast, setLocation]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  // If authenticated, render children
  return <>{children}</>;
}
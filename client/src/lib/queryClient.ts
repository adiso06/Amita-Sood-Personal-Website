import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  console.log(`API Request to: ${url}`);
  
  try {
    const res = await fetch(url, {
      ...options,
      credentials: "include",
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      const text = await res.text();
      console.error(`Error details: ${text}`);
      throw new Error(`${res.status}: ${text || res.statusText}`);
    }
    
    return res;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    // In standalone mode, return a mock response for development/preview
    if (window.location.hostname === 'localhost' || 
        window.location.hostname.includes('vercel.app')) {
      console.warn(`Returning mock data for ${url} in standalone mode`);
      return new Response(JSON.stringify({ mock: true, message: "Mock response in standalone mode" }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      console.log(`Query fetch: ${queryKey[0]}`);
      const res = await fetch(queryKey[0] as string, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        console.log('Unauthorized but returning null as configured');
        return null;
      }

      if (!res.ok) {
        console.error(`Query Error: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.error(`Error details: ${text}`);
        
        // In standalone mode, return mock data
        if ((window.location.hostname === 'localhost' || 
             window.location.hostname.includes('vercel.app')) && 
            (queryKey[0] as string).startsWith('/api')) {
          console.warn(`Returning mock data for ${queryKey[0]} in standalone mode`);
          return { mock: true, message: "Mock response in standalone mode" };
        }
        
        throw new Error(`${res.status}: ${text || res.statusText}`);
      }
      
      return await res.json();
    } catch (error) {
      console.error(`Error fetching ${queryKey[0]}:`, error);
      
      // In standalone mode, return mock data
      if ((window.location.hostname === 'localhost' || 
           window.location.hostname.includes('vercel.app')) && 
          (queryKey[0] as string).startsWith('/api')) {
        console.warn(`Returning mock data for ${queryKey[0]} in standalone mode`);
        return { mock: true, message: "Mock response in standalone mode" };
      }
      
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: 1,
      retryDelay: 1000,
    },
    mutations: {
      retry: false,
    },
  },
});

"use client"


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import MetricsDisplay from './components/MetricsDisplay';
import UsernameForm from './components/UsernameForm';
import { useInstagramMetrics } from './hooks/useInstagramMetrics';

const queryClient = new QueryClient();

function InstagramAnalytics() {
  const [username, setUsername] = useState<string | null>(null);
  const { data, isLoading, error } = useInstagramMetrics(username);

  const handleSubmit = (newUsername: string) => {
    setUsername(newUsername);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <UsernameForm onSubmit={handleSubmit} isLoading={isLoading} />
        
        {isLoading && (
          <div className="text-center p-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading analytics...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            <p className="text-center">
              {error instanceof Error ? error.message : 'Error loading analytics. Please try again.'}
            </p>
          </div>
        )}

        {data && <MetricsDisplay data={data} />}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <InstagramAnalytics />
    </QueryClientProvider>
  );
}
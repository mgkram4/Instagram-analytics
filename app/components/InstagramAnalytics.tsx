import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { useInstagramMetrics } from '../hooks/useInstagramMetrics';
import MetricsDisplay from './MetricsDisplay';
import UsernameForm from './UsernameForm';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      retry: 2,
    },
  },
});

const InstagramAnalyticsInner = () => {
  const [username, setUsername] = useState<string | null>(null);
  const { data, isLoading, error, isError } = useInstagramMetrics(username);

  const handleSubmit = (newUsername: string) => {
    setUsername(newUsername);
  };

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ['instagram-metrics', username] });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Instagram Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Enter an Instagram username to analyze their profile metrics
          </p>
        </div>

        {/* Form Section */}
        <div className="mb-8">
          <UsernameForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Analyzing profile data...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex flex-col items-center">
              <p className="text-red-600 mb-3">
                {error instanceof Error ? error.message : 'Failed to load profile data'}
              </p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Success State */}
        {data && (
          <div className="transition-opacity duration-300 ease-in-out">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Profile Analysis for @{username}
                </h2>
                <button
                  onClick={() => setUsername(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Analyze Another Profile
                </button>
              </div>
              <MetricsDisplay data={data} />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Note: Data is refreshed every 5 minutes. Some metrics may be estimated or approximated.
          </p>
        </footer>
      </div>
    </div>
  );
};

const InstagramAnalytics = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <InstagramAnalyticsInner />
    </QueryClientProvider>
  );
};

export default InstagramAnalytics;
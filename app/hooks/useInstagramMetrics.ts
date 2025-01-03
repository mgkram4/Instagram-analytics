import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface InstagramMetrics {
  followers: number;
  following: number;
  posts: number;
  engagement_rate: number;
  posting_frequency: number;
  growth_rate: number[];
}

export const useInstagramMetrics = (username: string | null) => {
  return useQuery({
    queryKey: ['instagram-metrics', username],
    queryFn: async (): Promise<InstagramMetrics> => {
      if (!username) throw new Error('Username is required');
      
      const { data } = await axios.get(`/api/instagram/${username}`);
      return data;
    },
    enabled: !!username,
    retry: 1,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
};
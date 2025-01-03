// Base profile information
export interface InstagramProfile {
    username: string;
    fullName: string;
    biography: string;
    profilePictureUrl: string;
    isPrivate: boolean;
    isVerified: boolean;
    externalUrl?: string;
  }
  
  // Metrics and stats
  export interface InstagramMetrics {
    followers: number;
    following: number;
    posts: number;
    engagement_rate: number;
    posting_frequency: number;
    growth_rate: number[];
  }
  
  // Post statistics
  export interface PostMetrics {
    likes: number;
    comments: number;
    saves: number;
    shares: number;
    engagement_rate: number;
    reach: number;
    impressions: number;
  }
  
  // Individual post
  export interface InstagramPost {
    id: string;
    caption: string;
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    mediaUrl: string;
    thumbnail_url?: string;
    permalink: string;
    timestamp: string;
    metrics: PostMetrics;
  }
  
  // Audience demographics
  export interface AudienceDemographics {
    ageRanges: {
      range: string;
      percentage: number;
    }[];
    genderSplit: {
      male: number;
      female: number;
      other: number;
    };
    topLocations: {
      country: string;
      city: string;
      percentage: number;
    }[];
    activeHours: {
      hour: number;
      activity: number;
    }[];
  }
  
  // Historical data point
  export interface MetricDataPoint {
    timestamp: string;
    value: number;
  }
  
  // Historical metrics
  export interface HistoricalMetrics {
    followers: MetricDataPoint[];
    engagement: MetricDataPoint[];
    reach: MetricDataPoint[];
    impressions: MetricDataPoint[];
  }
  
  // API Response types
  export interface InstagramApiResponse {
    profile: InstagramProfile;
    metrics: InstagramMetrics;
    recentPosts: InstagramPost[];
    demographics: AudienceDemographics;
    historical: HistoricalMetrics;
  }
  
  // API Error response
  export interface InstagramApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  }
  
  // Request states
  export interface InstagramAnalyticsState {
    isLoading: boolean;
    isError: boolean;
    error: InstagramApiError | null;
    data: InstagramApiResponse | null;
  }
  
  // Component Props
  export interface UsernameFormProps {
    onSubmit: (username: string) => void;
    isLoading?: boolean;
  }
  
  export interface MetricsDisplayProps {
    data: InstagramMetrics;
    onRefresh?: () => void;
  }
  
  export interface PostsGridProps {
    posts: InstagramPost[];
    onPostClick?: (post: InstagramPost) => void;
  }
  
  // Chart data types
  export interface ChartDataPoint {
    date: string;
    value: number;
    label: string;
  }
  
  export interface TimeSeriesData {
    metric: string;
    data: ChartDataPoint[];
  }
  
  // Filter and date range types
  export type DateRangeType = '7d' | '30d' | '90d' | 'custom';
  
  export interface DateRange {
    start: Date;
    end: Date;
  }
  
  export interface AnalyticsFilters {
    dateRange: DateRange;
    rangeType: DateRangeType;
    metrics: string[];
    postTypes?: ('IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM')[];
  }
  
  // Cache types
  export interface CacheConfig {
    staleTime: number;
    cacheTime: number;
    retry: number;
  }
  
  // Settings and configuration
  export interface InstagramAnalyticsConfig {
    apiEndpoint: string;
    apiVersion: string;
    cache: CacheConfig;
    refreshInterval?: number;
    maxRequestsPerMinute: number;
  }
  
  // Analytics event tracking
  export interface AnalyticsEvent {
    eventType: 'PROFILE_VIEW' | 'METRICS_UPDATE' | 'ERROR' | 'REFRESH';
    timestamp: string;
    username: string;
    details: Record<string, unknown>;
  }
  
  // Webhook payload for real-time updates
  export interface WebhookPayload {
    object: 'instagram';
    entry: {
      id: string;
      time: number;
      changes: {
        field: string;
        value: unknown;
      }[];
    }[];
  }
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// Instagram API configuration
const INSTAGRAM_API_VERSION = 'v18.0';
const INSTAGRAM_API_BASE_URL = `https://graph.instagram.com/${INSTAGRAM_API_VERSION}`;

// Ensure these are set in your environment variables
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

interface InstagramUserResponse {
  id: string;
  username: string;
  account_type: string;
  media_count: number;
  followers_count: number;
  follows_count: number;
}

interface InstagramPost {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
}

interface InstagramMediaResponse {
  data: InstagramPost[];
}

interface ProfileData {
  username: string;
  account_type: string;
}

interface MetricsData {
  followers: number;
  following: number;
  posts: number;
  engagement_rate: number;
  posting_frequency: number;
  growth_rate: number[];
}

interface ProcessedPost {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  likes: number;
  comments: number;
}

interface InstagramApiResponse {
  profile: ProfileData;
  metrics: MetricsData;
  recent_posts: ProcessedPost[];
}

async function fetchInstagramUserProfile(): Promise<InstagramApiResponse> {
  try {
    // Get user profile data using the access token
    const userResponse = await axios.get<InstagramUserResponse>(`${INSTAGRAM_API_BASE_URL}/me`, {
      params: {
        fields: 'id,username,account_type,media_count,followers_count,follows_count',
        access_token: ACCESS_TOKEN,
      },
    });

    const userId = userResponse.data.id;

    // Get user's media
    const mediaResponse = await axios.get<InstagramMediaResponse>(`${INSTAGRAM_API_BASE_URL}/${userId}/media`, {
      params: {
        fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count',
        access_token: ACCESS_TOKEN,
        limit: 25,
      },
    });

    // Calculate engagement rate from recent posts
    const recentPosts = mediaResponse.data.data;
    const totalEngagement = recentPosts.reduce((sum: number, post: InstagramPost) => {
      return sum + (post.like_count || 0) + (post.comments_count || 0);
    }, 0);

    const averageEngagement = totalEngagement / recentPosts.length;
    const engagementRate = (averageEngagement / userResponse.data.followers_count) * 100;

    // Calculate posting frequency (posts per week)
    const postDates = recentPosts.map((post) => new Date(post.timestamp));
    const oldestPost = new Date(Math.min(...postDates.map(date => date.getTime())));
    const newestPost = new Date(Math.max(...postDates.map(date => date.getTime())));
    const weeksBetween = (newestPost.getTime() - oldestPost.getTime()) / (1000 * 60 * 60 * 24 * 7);
    const postingFrequency = recentPosts.length / weeksBetween;

    // Calculate growth rate (mock data as Instagram API doesn't provide historical data)
    const growthRate = Array.from({ length: 12 }, () => {
      return (Math.random() * 2 - 1) * 5;
    });

    // Construct the response
    const responseData: InstagramApiResponse = {
      profile: {
        username: userResponse.data.username,
        account_type: userResponse.data.account_type,
      },
      metrics: {
        followers: userResponse.data.followers_count,
        following: userResponse.data.follows_count,
        posts: userResponse.data.media_count,
        engagement_rate: engagementRate,
        posting_frequency: postingFrequency,
        growth_rate: growthRate,
      },
      recent_posts: recentPosts.map((post) => ({
        id: post.id,
        caption: post.caption,
        media_type: post.media_type,
        media_url: post.media_url,
        thumbnail_url: post.thumbnail_url,
        permalink: post.permalink,
        timestamp: post.timestamp,
        likes: post.like_count,
        comments: post.comments_count,
      })),
    };

    return responseData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Instagram API error');
    }
    throw error;
  }
}

export async function GET(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _params: { params: { username: string } }
) {
  try {
    if (!ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Instagram API access token not configured' },
        { status: 500 }
      );
    }

    const data = await fetchInstagramUserProfile();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch Instagram data' },
      { status: 500 }
    );
  }
}
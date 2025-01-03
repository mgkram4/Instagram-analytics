import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface MetricsDisplayProps {
  data: {
    followers: number;
    following: number;
    posts: number;
    engagement_rate: number;
    posting_frequency: number;
    growth_rate: number[];
  };
}

const MetricCard: React.FC<{
  title: string;
  value: string | number;
}> = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ data }) => {
  const growthData = data.growth_rate.map((rate, index) => ({
    month: `Month ${index + 1}`,
    rate: rate
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard 
          title="Followers" 
          value={data.followers.toLocaleString()} 
        />
        <MetricCard 
          title="Following" 
          value={data.following.toLocaleString()} 
        />
        <MetricCard 
          title="Posts" 
          value={data.posts.toLocaleString()} 
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">
          Growth Rate Over Time
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                dataKey="month" 
                stroke="#666"
                tick={{ fill: '#666' }}
              />
              <YAxis 
                stroke="#666"
                tick={{ fill: '#666' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard 
          title="Engagement Rate" 
          value={`${data.engagement_rate.toFixed(2)}%`} 
        />
        <MetricCard 
          title="Posting Frequency" 
          value={`${data.posting_frequency.toFixed(1)} posts/week`} 
        />
      </div>
    </div>
  );
};

export default MetricsDisplay;
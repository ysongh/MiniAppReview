import React, { useState } from 'react';
import { Card, Rate, Tag, Input, Select, Button, Badge, Space, Avatar } from 'antd';
import { Search as SearchIcon, Grid3x3, Star, User, ExternalLink, Filter } from 'lucide-react';

const { Search } = Input;
const { Option } = Select;

// Mock data
const mockApps = [
  {
    id: 1,
    name: "FarQuest",
    description: "Complete daily quests and earn rewards on Farcaster",
    category: "Gaming",
    appUrl: "https://farquest.app",
    developer: "0x1234...5678",
    averageRating: 4.5,
    reviewCount: 128,
    recommendPercent: 92,
    isActive: true,
    difficulty: 2,
    quality: 4.8
  },
  {
    id: 2,
    name: "CastVault",
    description: "Secure your casts with encrypted storage and backup",
    category: "Tools",
    appUrl: "https://castvault.app",
    developer: "0xabcd...efgh",
    averageRating: 4.8,
    reviewCount: 89,
    recommendPercent: 95,
    isActive: true,
    difficulty: 3,
    quality: 4.9
  },
  {
    id: 3,
    name: "NFT Showcase",
    description: "Display your NFT collection in your Farcaster profile",
    category: "NFT",
    appUrl: "https://nftshowcase.app",
    developer: "0x9876...4321",
    averageRating: 4.2,
    reviewCount: 234,
    recommendPercent: 88,
    isActive: true,
    difficulty: 1,
    quality: 4.3
  },
  {
    id: 4,
    name: "FarSwap",
    description: "Trade tokens directly in Farcaster frames",
    category: "DeFi",
    appUrl: "https://farswap.app",
    developer: "0xdef0...1234",
    averageRating: 4.6,
    reviewCount: 456,
    recommendPercent: 91,
    isActive: true,
    difficulty: 2,
    quality: 4.7
  },
  {
    id: 5,
    name: "SocialGraph",
    description: "Visualize your Farcaster social connections",
    category: "Social",
    appUrl: "https://socialgraph.app",
    developer: "0x5555...6666",
    averageRating: 4.0,
    reviewCount: 67,
    recommendPercent: 85,
    isActive: true,
    difficulty: 2,
    quality: 4.1
  },
  {
    id: 6,
    name: "CastAnalytics",
    description: "Deep analytics for your casts and engagement",
    category: "Tools",
    appUrl: "https://castanalytics.app",
    developer: "0x7777...8888",
    averageRating: 4.7,
    reviewCount: 193,
    recommendPercent: 94,
    isActive: true,
    difficulty: 2,
    quality: 4.8
  }
];

const categories = ["All", "Social", "DeFi", "NFT", "Gaming", "Tools", "Media"];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  // Filter and sort apps
  const filteredApps = mockApps
    .filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.averageRating - a.averageRating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const getDifficultyText = (difficulty: number) => {
    if (difficulty <= 2) return 'Easy';
    if (difficulty <= 3) return 'Medium';
    return 'Advanced';
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'green';
    if (difficulty <= 3) return 'orange';
    return 'red';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Grid3x3 className="text-3xl text-purple-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 m-0">Farcaster Mini Apps</h1>
              <p className="text-sm text-gray-500 m-0">Discover and rate the best apps</p>
            </div>
          </div>

          {/* Search */}
          <Search
            placeholder="Search apps..."
            prefix={<SearchIcon size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
            size="large"
          />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="w-full sm:w-48"
              size="large"
              suffixIcon={<Filter size={16} />}
            >
              {categories.map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>

            <Select
              value={sortBy}
              onChange={setSortBy}
              className="w-full sm:w-48"
              size="large"
            >
              <Option value="rating">Top Rated</Option>
              <Option value="reviews">Most Reviews</Option>
              <Option value="name">Name (A-Z)</Option>
            </Select>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{mockApps.length}</div>
            <div className="text-xs text-gray-600">Total Apps</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {mockApps.reduce((sum, app) => sum + app.reviewCount, 0)}
            </div>
            <div className="text-xs text-gray-600">Reviews</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {(mockApps.reduce((sum, app) => sum + app.averageRating, 0) / mockApps.length).toFixed(1)}
            </div>
            <div className="text-xs text-gray-600">Avg Rating</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{categories.length - 1}</div>
            <div className="text-xs text-gray-600">Categories</div>
          </div>
        </div>
      </div>

      {/* App List */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredApps.length} {filteredApps.length === 1 ? 'app' : 'apps'}
        </div>

        <div className="space-y-4">
          {filteredApps.map((app) => (
            <Card
              key={app.id}
              className="hover:shadow-lg transition-shadow"
              bodyStyle={{ padding: '16px' }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <Avatar
                    size={64}
                    icon={<Grid3x3 />}
                    className="bg-gradient-to-br from-purple-400 to-blue-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 m-0 truncate">
                        {app.name}
                      </h3>
                      <p className="text-sm text-gray-600 m-0 line-clamp-2">
                        {app.description}
                      </p>
                    </div>

                    {/* Rating Badge */}
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500" size={18} fill="currentColor" />
                        <span className="text-xl font-bold">{app.averageRating}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {app.reviewCount} reviews
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Tag color="purple">{app.category}</Tag>
                    <Tag color={getDifficultyColor(app.difficulty)}>
                      {getDifficultyText(app.difficulty)}
                    </Tag>
                    <Tag color="blue">
                      {app.recommendPercent}% recommend
                    </Tag>
                  </div>

                  {/* Ratings breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Overall:</span>
                      <Rate disabled defaultValue={app.averageRating} allowHalf className="text-xs" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Quality:</span>
                      <Rate disabled defaultValue={app.quality} allowHalf className="text-xs" />
                    </div>
                  </div>

                  {/* Developer and Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User size={14} />
                      <span>{app.developer}</span>
                    </div>

                    <Space size="small" wrap>
                      <Button
                        type="primary"
                        icon={<ExternalLink size={14} />}
                        size="small"
                        href={app.appUrl}
                        target="_blank"
                      >
                        Open App
                      </Button>
                      <Button
                        size="small"
                        icon={<Star size={14} />}
                      >
                        Review
                      </Button>
                    </Space>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-12">
            <Grid3x3 className="text-gray-300 mb-4 mx-auto" size={64} />
            <h3 className="text-lg font-semibold text-gray-600">No apps found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<Grid3x3 size={24} />}
          className="w-14 h-14 shadow-lg"
        />
      </div>
    </div>
  );
};

export default Home;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Select, Button } from 'antd';
import { Search as SearchIcon, Grid3x3, Filter } from 'lucide-react';
import { useReadContract } from 'wagmi';

import MiniAppCard from '../components/MiniAppCard';
import MiniAppReview from '../artifacts/contracts/MiniAppReview.sol/MiniAppReview.json';

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
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  const { data: miniappids = [] } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: MiniAppReview.abi,
    functionName: 'getAllApps'
   }) as { data: BigInt[] | undefined };

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

      {/* App List */}
      <div className="max-w-7xl mx-auto px-4 pb-8 mt-2">
        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredApps.length} {filteredApps.length === 1 ? 'app' : 'apps'}
           <Button
              onClick={() => navigate("/register")}
              type="primary"
              className="ml-4"
            >
              Register Mini App
            </Button>
        </div>

        <div className="space-y-4">
          {miniappids.map((id) => (
            <MiniAppCard key={Number(id)} id={id} />
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

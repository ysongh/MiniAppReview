import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, Button } from 'antd';
import { Grid3x3, Filter } from 'lucide-react';
import { useReadContract } from 'wagmi';

import MiniAppCard from '../components/MiniAppCard';
import MiniAppReview from '../artifacts/contracts/MiniAppReview.sol/MiniAppReview.json';

const { Option } = Select;

const categories = ["All", "Social", "DeFi", "NFT", "Gaming", "Tools", "Media"];

const Home = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: miniappids = [] } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: MiniAppReview.abi,
    functionName: 'getAllApps'
   }) as { data: BigInt[] | undefined };

  const { data: filterminiappids = [] } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: MiniAppReview.abi,
    functionName: 'getAppsByCategory',
    args: [selectedCategory]
  }) as { data: bigint[] | undefined };

  const sortIds = miniappids.slice().reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 m-0">Discover and rate the best apps</h1>
            </div>
          </div>

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
          </div>

           <Button
              onClick={() => navigate("/register")}
              type="primary"
              className="mt-3"
            >
              Register Mini App
            </Button>
        </div>
      </div>

      {/* App List */}
      <div className="max-w-7xl mx-auto px-4 pb-8 mt-2">
        <div className="text-sm text-gray-600 mb-4">
          Showing {miniappids.length} {miniappids.length === 1 ? 'app' : 'apps'}
          
        </div>

        <div className="space-y-4">
          {selectedCategory === "All" ? sortIds.map((id) => (
            <MiniAppCard key={Number(id)} id={id} />
          )) : filterminiappids.map((id) => (
            <MiniAppCard key={Number(id)} id={id} />
          ))}
        </div>

        {miniappids.length === 0 && (
          <div className="text-center py-12">
            <Grid3x3 className="text-gray-300 mb-4 mx-auto" size={64} />
            <h3 className="text-lg font-semibold text-gray-600">No apps found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

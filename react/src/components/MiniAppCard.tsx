import { useNavigate } from 'react-router-dom';
import { Card, Rate, Tag, Button, Space, Avatar } from 'antd';
import { Grid3x3, Star, User, ExternalLink } from 'lucide-react';
import { useReadContract } from 'wagmi';

import MiniAppReview from '../artifacts/contracts/MiniAppReview.sol/MiniAppReview.json';
import { formatAddress } from '../utils/format';

interface MiniApp {
  name: string;
  category: string;
  description: string;
  from: string;
  appUrl: string;
  difficulty: number;
  averageRating: bigint;
  reviewCount: bigint;
  isActive: boolean;
  recommendPercent: bigint;
}

function MiniAppCard({ id }: {id : BigInt }) {
  const navigate = useNavigate();

  const { data: miniapp } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: MiniAppReview.abi,
    functionName: 'getAppDetail',
    args: [id]
  }) as { data: MiniApp | undefined };

  console.log(miniapp);

  return (
    <Card
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
                {miniapp?.name}
              </h3>
              <p className="text-sm text-gray-600 m-0 line-clamp-2">
                {miniapp?.description}
              </p>
            </div>

            {/* Rating Badge */}
            <div className="flex items-center gap-2 sm:flex-col sm:items-end flex-shrink-0">
              <div className="flex items-center gap-1">
                <Star className="text-yellow-500" size={18} fill="currentColor" />
                <span className="text-xl font-bold">{Number(miniapp?.reviewCount)}</span>
              </div>
              <span className="text-xs text-gray-500">
                {Number(miniapp?.reviewCount)} reviews
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Tag color="purple">{miniapp?.category}</Tag>
          </div>

          {/* Ratings breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Overall:</span>
              <Rate disabled defaultValue={Number(miniapp?.reviewCount)} allowHalf className="text-xs" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Quality:</span>
              <Rate disabled defaultValue={Number(miniapp?.reviewCount)} allowHalf className="text-xs" />
            </div>
          </div>

          {/* Developer and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <User size={14} />
              <span>{formatAddress(miniapp?.from)}</span>
            </div>

            <Space size="small" wrap>
              <Button
                type="primary"
                icon={<ExternalLink size={14} />}
                size="small"
                href={miniapp?.appUrl}
                target="_blank"
              >
                Open App
              </Button>
              <Button
                onClick={() => navigate("/app/" + id)}
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
  )
}

export default MiniAppCard;

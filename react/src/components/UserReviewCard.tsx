import { Card, Rate, Tag, Button } from 'antd';
import { Calendar, ExternalLink, Edit, MessageCircle, ThumbsUp } from 'lucide-react';
import { useReadContract } from 'wagmi';

import MiniAppReview from '../artifacts/contracts/MiniAppReview.sol/MiniAppReview.json';
import { formatDate } from '../utils/format';

interface MiniApp {
  name: string;
  category: string;
  description: string;
  from: string;
  appUrl: string;
  difficulty: number;
  totalRating: bigint;
  averageRating: bigint;
  reviewCount: bigint;
  registeredAt: bigint;
  isActive: boolean;
  recommendPercent: bigint;
}

interface Review {
  name: string;
  comment: string;
  reviewer: string;
  appUrl: string;
  timestamp: bigint;
  rating: bigint;
  registeredAt: bigint;
  wouldRecommend: boolean;
  recommendPercent: bigint;
  helpfulCount: bigint
}

function UserReviewCard({ id, address }: { id: BigInt, address?: string }) {
  const { data: reviewData } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: MiniAppReview.abi,
    functionName: 'getUserReviewForApp',
    args: [address, id]
  }) as { data: Review | undefined };

  const { data: miniapp } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: MiniAppReview.abi,
    functionName: 'getAppDetail',
    args: [id]
  }) as { data: MiniApp | undefined };

  const handleEditReview = (appId: BigInt) => {
    console.log('Edit review for app', appId);
    // Navigate to edit modal or page
  };

  const handleViewApp = (appId: BigInt) => {
    console.log('View app', appId);
    // Navigate to app detail page
  };

  console.log(reviewData);
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Review Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {miniapp?.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-2">
                <Tag color="purple">{miniapp?.category}</Tag>
                {reviewData?.wouldRecommend && (
                  <Tag color="green">
                    <ThumbsUp size={10} className="inline mr-1" />
                    Recommended
                  </Tag>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Rate disabled defaultValue={Number(reviewData?.rating)} className="text-sm" />
              <span className="text-sm font-semibold text-gray-700">
                {Number(reviewData?.rating)}/5
              </span>
            </div>
          </div>

          {/* Review Text */}
          <p className="text-gray-700 mb-3">
            {reviewData?.comment}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(reviewData?.timestamp)}
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp size={12} />
              {Number(reviewData?.helpfulCount)} helpful
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={12} />
              {Number(reviewData?.commentCount)} comments
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="small"
              icon={<ExternalLink size={14} />}
              onClick={() => handleViewApp(id)}
            >
              View App
            </Button>
            <Button
              size="small"
              icon={<Edit size={14} />}
              onClick={() => handleEditReview(id)}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default UserReviewCard
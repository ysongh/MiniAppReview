import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Rate, Tag, Button, Avatar, Progress, message, Empty } from 'antd';
import { ArrowLeft, ExternalLink, Star, User, Calendar, Share2 } from 'lucide-react';
import { useReadContract } from 'wagmi';

import { formatAddress, formatDate } from '../utils/format';
import MiniAppReview from '../artifacts/contracts/MiniAppReview.sol/MiniAppReview.json';
import ReviewCard from '../components/ReviewCard';
import ReviewModal from '../components/ReviewModal';

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
  difficulty: number;
  timestamp: bigint;
  quality: bigint;
  rating: bigint;
  registeredAt: bigint;
  wouldRecommend: boolean;
  recommendPercent: bigint;
}

const MiniAppDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const { data: miniapp } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: MiniAppReview.abi,
    functionName: 'getAppDetail',
    args: [id]
  }) as { data: MiniApp | undefined };

  const { data: reviews = []} = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: MiniAppReview.abi,
    functionName: 'getAppReviews',
    args: [id]
 }) as { data: Review[] | undefined };

  console.log(reviews);

  const handleShare = () => {
    message.success('Link copied to clipboard!');
  };

  const getRatingDistribution = () => {
    return [
      { stars: 5, count: 89, percent: 69 },
      { stars: 4, count: 28, percent: 22 },
      { stars: 3, count: 8, percent: 6 },
      { stars: 2, count: 2, percent: 2 },
      { stars: 1, count: 1, percent: 1 }
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Button
            onClick={() => navigate("/")}
            icon={<ArrowLeft size={16} />}
            type="text"
          >
            Back to Gallery
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* App Header Card */}
        <Card className="shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* App Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {miniapp?.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Tag color="purple" className="text-sm">{miniapp?.category}</Tag>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {miniapp?.description}
                  </p>
                </div>

                {/* Rating Overview */}
                <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4 min-w-[140px]">
                  <div className="text-4xl font-bold text-purple-600 mb-1">
                    {Number(miniapp?.totalRating)}
                  </div>
                  <Rate disabled defaultValue={Number(miniapp?.totalRating)} allowHalf className="text-sm mb-2" />
                  <div className="text-sm text-gray-600 mb-1">
                    {Number(miniapp?.reviewCount)} reviews
                  </div>
                </div>
              </div>

              {/* Developer Info */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <User size={16} />
                <span>By {formatAddress(miniapp?.from)}</span>
                <span className="text-gray-400">•</span>
                <Calendar size={16} />
                <span>Registered {formatDate(miniapp?.registeredAt)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  type="primary"
                  size="large"
                  icon={<ExternalLink size={18} />}
                  href={miniapp?.appUrl}
                  target="_blank"
                >
                  Open App
                </Button>
                <Button
                  size="large"
                  icon={<Star size={18} />}
                  onClick={() => setReviewModalVisible(true)}
                >
                  Write Review
                </Button>
                <Button
                  size="large"
                  icon={<Share2 size={18} />}
                  onClick={handleShare}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-2">
          <Card className="shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Reviews ({reviews?.length})
              </h2>
            </div>

            <div className="space-y-4">
              {reviews.map((review, index) => (
                <ReviewCard key={index} id={index} appid={id} review={review} />
              ))}
            </div>

            {reviews?.length === 0 && (
              <Empty
                description="No reviews yet. Be the first to review!"
                className="my-8"
              />
            )}
          </Card>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        id={id}
        reviewModalVisible={reviewModalVisible}
        setReviewModalVisible={setReviewModalVisible} />
    </div>
  );
};

export default MiniAppDetail;

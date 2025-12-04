import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Rate, Tag, Button, Avatar, Progress, message, Empty } from 'antd';
import { ArrowLeft, ExternalLink, Star, User, Calendar, ThumbsUp, Share2 } from 'lucide-react';
import { useReadContract } from 'wagmi';

import { formatAddress } from '../utils/format';
import MiniAppReview from '../artifacts/contracts/MiniAppReview.sol/MiniAppReview.json';
import ReviewModal from '../components/ReviewModal';

// Mock reviews
const mockReviews = [
  {
    reviewer: "0xabcd...ef12",
    reviewerName: "@alice",
    rating: 5,
    comment: "Amazing app! The quest system is really engaging and the rewards are worth it. Love how it integrates seamlessly with Farcaster.",
    difficulty: 2,
    quality: 5,
    wouldRecommend: true,
    timestamp: "2024-11-25",
    helpfulCount: 23
  },
  {
    reviewer: "0x1234...5678",
    reviewerName: "@bob",
    rating: 4,
    comment: "Great concept and execution. Would love to see more quest variety in future updates.",
    difficulty: 2,
    quality: 5,
    wouldRecommend: true,
    timestamp: "2024-11-20",
    helpfulCount: 15
  },
  {
    reviewer: "0x9876...4321",
    reviewerName: "@charlie",
    rating: 5,
    comment: "Best gaming app on Farcaster! The daily quests keep me coming back every day.",
    difficulty: 1,
    quality: 5,
    wouldRecommend: true,
    timestamp: "2024-11-18",
    helpfulCount: 31
  },
  {
    reviewer: "0xdef0...1234",
    reviewerName: "@dana",
    rating: 4,
    comment: "Really fun but could use better onboarding for new users. Once you get the hang of it, it's excellent.",
    difficulty: 3,
    quality: 4,
    wouldRecommend: true,
    timestamp: "2024-11-15",
    helpfulCount: 8
  }
];

const MiniAppDetail = () => {
  const { id } = useParams();

  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState('helpful');

  const { data: miniapp = []} = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: MiniAppReview.abi,
    functionName: 'apps',
    args: [id]
  });

  console.log(miniapp);

  const handleMarkHelpful = (index: number) => {
    message.success('Marked as helpful!');
  };

  const handleShare = () => {
    message.success('Link copied to clipboard!');
  };

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

  const getRatingDistribution = () => {
    return [
      { stars: 5, count: 89, percent: 69 },
      { stars: 4, count: 28, percent: 22 },
      { stars: 3, count: 8, percent: 6 },
      { stars: 2, count: 2, percent: 2 },
      { stars: 1, count: 1, percent: 1 }
    ];
  };

  const sortedReviews = [...mockReviews].sort((a, b) => {
    if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
    if (sortBy === 'recent') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Button
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
            {/* App Icon */}
            <div className="flex-shrink-0">
              <Avatar
                size={120}
                shape="square"
                className="bg-gradient-to-br from-purple-400 to-blue-500"
              >
                <Star size={60} />
              </Avatar>
            </div>

            {/* App Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {miniapp[1]}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Tag color="purple" className="text-sm">{miniapp[3]}</Tag>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {miniapp[2]}
                  </p>
                </div>

                {/* Rating Overview */}
                <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4 min-w-[140px]">
                  <div className="text-4xl font-bold text-purple-600 mb-1">
                    {miniapp[8]?.toString()}
                  </div>
                  <Rate disabled defaultValue={miniapp[8]?.toString()} allowHalf className="text-sm mb-2" />
                  <div className="text-sm text-gray-600 mb-1">
                    {miniapp[8]?.toString()} reviews
                  </div>
                </div>
              </div>

              {/* Developer Info */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <User size={16} />
                <span>By {formatAddress(miniapp[5])}</span>
                <span className="text-gray-400">•</span>
                <Calendar size={16} />
                <span>Registered {miniapp[6]}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  type="primary"
                  size="large"
                  icon={<ExternalLink size={18} />}
                  href={miniapp[4]}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Rating Breakdown */}
            <Card title="Rating Distribution" className="shadow-lg">
              <div className="space-y-3">
                {getRatingDistribution().map((dist) => (
                  <div key={dist.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium">{dist.stars}</span>
                      <Star size={14} className="text-yellow-500" fill="currentColor" />
                    </div>
                    <Progress 
                      percent={dist.percent} 
                      showInfo={false}
                      strokeColor="#9333ea"
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600 w-8 text-right">
                      {dist.count}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Developer Card */}
            <Card title="Developer" className="shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Avatar size={48} icon={<User />} className="bg-purple-500" />
                <div>
                  <div className="font-semibold text-gray-900">
                    ?
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {formatAddress(miniapp[5])}
                  </div>
                </div>
              </div>
              <Button block size="small">View Profile</Button>
            </Card>
          </div>

          {/* Right Column - Reviews */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Reviews ({miniapp[8]?.toString()})
                </h2>
                <div className="flex gap-2">
                  <Button
                    type={sortBy === 'helpful' ? 'primary' : 'default'}
                    size="small"
                    onClick={() => setSortBy('helpful')}
                  >
                    Most Helpful
                  </Button>
                  <Button
                    type={sortBy === 'recent' ? 'primary' : 'default'}
                    size="small"
                    onClick={() => setSortBy('recent')}
                  >
                    Most Recent
                  </Button>
                  <Button
                    type={sortBy === 'rating' ? 'primary' : 'default'}
                    size="small"
                    onClick={() => setSortBy('rating')}
                  >
                    Highest Rated
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {sortedReviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start gap-3">
                      <Avatar size={40} icon={<User />} className="bg-blue-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {review.reviewerName}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar size={12} />
                              {review.timestamp}
                            </div>
                          </div>
                          <Rate disabled defaultValue={review.rating} className="text-sm" />
                        </div>

                        <div className="flex gap-2 mb-2">
                          <Tag color="blue" className="text-xs">
                            Quality: {review.quality}/5
                          </Tag>
                          <Tag color={getDifficultyColor(review.difficulty)} className="text-xs">
                            {getDifficultyText(review.difficulty)}
                          </Tag>
                          {review.wouldRecommend && (
                            <Tag color="green" className="text-xs">
                              <ThumbsUp size={10} className="inline mr-1" />
                              Recommends
                            </Tag>
                          )}
                        </div>

                        <p className="text-gray-700 mb-3">
                          {review.comment}
                        </p>

                        <Button
                          size="small"
                          icon={<ThumbsUp size={14} />}
                          onClick={() => handleMarkHelpful(index)}
                        >
                          Helpful ({review.helpfulCount})
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {sortedReviews.length === 0 && (
                <Empty
                  description="No reviews yet. Be the first to review!"
                  className="my-8"
                />
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        reviewModalVisible={reviewModalVisible}
        setReviewModalVisible={setReviewModalVisible} />
    </div>
  );
};

export default MiniAppDetail;

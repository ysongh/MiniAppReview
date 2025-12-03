import React, { useState } from 'react';
import { Card, Rate, Tag, Button, Avatar, Progress, Modal, Input, message, Divider, Empty } from 'antd';
import { ArrowLeft, ExternalLink, Star, User, Calendar, ThumbsUp, Share2, TrendingUp, Award } from 'lucide-react';

const { TextArea } = Input;

// Mock app data
const mockApp = {
  id: 1,
  name: "FarQuest",
  description: "Complete daily quests and earn rewards on Farcaster. Engage with the community, complete challenges, and climb the leaderboard to earn exclusive NFT rewards and badges.",
  category: "Gaming",
  appUrl: "https://farquest.app",
  developer: "0x1234567890abcdef1234567890abcdef12345678",
  developerName: "@farquest",
  averageRating: 4.5,
  reviewCount: 128,
  recommendPercent: 92,
  isActive: true,
  registeredAt: "2024-01-15",
  totalRating: 576,
  difficulty: 2,
  quality: 4.8
};

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
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    difficulty: 0,
    quality: 0,
    comment: '',
    wouldRecommend: true
  });
  const [sortBy, setSortBy] = useState('helpful');

  const handleSubmitReview = () => {
    if (reviewForm.rating === 0) {
      message.error('Please provide a rating');
      return;
    }
    
    message.success('Review submitted successfully!');
    setReviewModalVisible(false);
    setReviewForm({
      rating: 0,
      difficulty: 0,
      quality: 0,
      comment: '',
      wouldRecommend: true
    });
  };

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
                    {mockApp.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Tag color="purple" className="text-sm">{mockApp.category}</Tag>
                    <Tag color={getDifficultyColor(mockApp.difficulty)} className="text-sm">
                      {getDifficultyText(mockApp.difficulty)}
                    </Tag>
                    {mockApp.isActive ? (
                      <Tag color="green" className="text-sm">Active</Tag>
                    ) : (
                      <Tag color="red" className="text-sm">Inactive</Tag>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">
                    {mockApp.description}
                  </p>
                </div>

                {/* Rating Overview */}
                <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4 min-w-[140px]">
                  <div className="text-4xl font-bold text-purple-600 mb-1">
                    {mockApp.averageRating}
                  </div>
                  <Rate disabled defaultValue={mockApp.averageRating} allowHalf className="text-sm mb-2" />
                  <div className="text-sm text-gray-600 mb-1">
                    {mockApp.reviewCount} reviews
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <ThumbsUp size={12} />
                    {mockApp.recommendPercent}% recommend
                  </div>
                </div>
              </div>

              {/* Developer Info */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <User size={16} />
                <span>By {mockApp.developerName}</span>
                <span className="text-gray-400">•</span>
                <Calendar size={16} />
                <span>Registered {mockApp.registeredAt}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  type="primary"
                  size="large"
                  icon={<ExternalLink size={18} />}
                  href={mockApp.appUrl}
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

            {/* Quality Metrics */}
            <Card title="Quality Metrics" className="shadow-lg">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Overall Quality</span>
                    <span className="text-sm font-semibold">{mockApp.quality}/5</span>
                  </div>
                  <Progress 
                    percent={(mockApp.quality / 5) * 100} 
                    strokeColor="#9333ea"
                    showInfo={false}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Ease of Use</span>
                    <span className="text-sm font-semibold">{5 - mockApp.difficulty + 1}/5</span>
                  </div>
                  <Progress 
                    percent={((5 - mockApp.difficulty + 1) / 5) * 100} 
                    strokeColor="#10b981"
                    showInfo={false}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Would Recommend</span>
                    <span className="text-sm font-semibold">{mockApp.recommendPercent}%</span>
                  </div>
                  <Progress 
                    percent={mockApp.recommendPercent} 
                    strokeColor="#3b82f6"
                    showInfo={false}
                  />
                </div>
              </div>
            </Card>

            {/* Developer Card */}
            <Card title="Developer" className="shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Avatar size={48} icon={<User />} className="bg-purple-500" />
                <div>
                  <div className="font-semibold text-gray-900">
                    {mockApp.developerName}
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {mockApp.developer.slice(0, 10)}...
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
                  Reviews ({mockApp.reviewCount})
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
      <Modal
        title="Write a Review"
        open={reviewModalVisible}
        onCancel={() => setReviewModalVisible(false)}
        footer={null}
        width={600}
      >
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Overall Rating <span className="text-red-500">*</span>
            </label>
            <Rate
              value={reviewForm.rating}
              onChange={(value) => setReviewForm({...reviewForm, rating: value})}
              className="text-2xl"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Quality
            </label>
            <Rate
              value={reviewForm.quality}
              onChange={(value) => setReviewForm({...reviewForm, quality: value})}
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Difficulty
            </label>
            <Rate
              value={reviewForm.difficulty}
              onChange={(value) => setReviewForm({...reviewForm, difficulty: value})}
            />
            <div className="text-xs text-gray-500 mt-1">
              1 = Very Easy, 5 = Very Difficult
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Your Review
            </label>
            <TextArea
              rows={4}
              placeholder="Share your experience with this app..."
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
              maxLength={500}
              showCount
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="recommend"
              checked={reviewForm.wouldRecommend}
              onChange={(e) => setReviewForm({...reviewForm, wouldRecommend: e.target.checked})}
              className="w-4 h-4"
            />
            <label htmlFor="recommend" className="text-sm text-gray-700">
              I would recommend this app
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="primary"
              size="large"
              block
              onClick={handleSubmitReview}
            >
              Submit Review
            </Button>
            <Button
              size="large"
              onClick={() => setReviewModalVisible(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MiniAppDetail;

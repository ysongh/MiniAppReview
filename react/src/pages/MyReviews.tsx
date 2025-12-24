import { Card, Rate, Tag, Button, Avatar, Empty } from 'antd';
import { User, Calendar, Star, ExternalLink, Edit, Trash2, MessageCircle, ThumbsUp } from 'lucide-react';
import { useAccount } from 'wagmi';

// Mock user reviews data
const mockUserReviews = [
  {
    appId: 1,
    appName: "FarQuest",
    appCategory: "Gaming",
    appUrl: "https://farquest.app",
    rating: 5,
    comment: "Amazing app! The quest system is really engaging and the rewards are worth it. Love how it integrates seamlessly with Farcaster.",
    difficulty: 2,
    quality: 5,
    wouldRecommend: true,
    timestamp: "2024-11-25",
    helpfulCount: 23,
    commentCount: 3,
    isActive: true
  },
  {
    appId: 3,
    appName: "NFT Showcase",
    appCategory: "NFT",
    appUrl: "https://nftshowcase.app",
    rating: 4,
    comment: "Great way to display my NFT collection. Could use some more customization options though.",
    difficulty: 1,
    quality: 4,
    wouldRecommend: true,
    timestamp: "2024-11-18",
    helpfulCount: 8,
    commentCount: 1,
    isActive: true
  },
  {
    appId: 6,
    appName: "CastAnalytics",
    appCategory: "Tools",
    appUrl: "https://castanalytics.app",
    rating: 5,
    comment: "Incredible analytics tool! The insights are super helpful for understanding my audience.",
    difficulty: 2,
    quality: 5,
    wouldRecommend: true,
    timestamp: "2024-11-10",
    helpfulCount: 15,
    commentCount: 2,
    isActive: true
  },
  {
    appId: 5,
    appName: "SocialGraph",
    appCategory: "Social",
    appUrl: "https://socialgraph.app",
    rating: 3,
    comment: "Interesting concept but needs better performance optimization. Can be slow with large networks.",
    difficulty: 3,
    quality: 3,
    wouldRecommend: false,
    timestamp: "2024-11-05",
    helpfulCount: 5,
    commentCount: 0,
    isActive: true
  }
];

// Mock apps user registered
const mockUserApps = [
  {
    appId: 7,
    appName: "My Awesome App",
    appCategory: "Social",
    appUrl: "https://myapp.com",
    registeredAt: "2024-10-15",
    reviewCount: 12,
    averageRating: 4.3,
    isActive: true
  },
  {
    appId: 8,
    appName: "Farcaster Helper",
    appCategory: "Tools",
    appUrl: "https://fchelper.app",
    registeredAt: "2024-09-20",
    reviewCount: 28,
    averageRating: 4.7,
    isActive: true
  }
];

const MyReviews = () => {
  const { address } = useAccount();
  const userName = "@you";

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

  const handleEditReview = (appId: number) => {
    console.log('Edit review for app', appId);
    // Navigate to edit modal or page
  };

  const handleDeleteReview = (appId: number) => {
    console.log('Delete review for app', appId);
    // Show confirmation and delete
  };

  const handleViewApp = (appId: number) => {
    console.log('View app', appId);
    // Navigate to app detail page
  };

  const ReviewsTab = () => (
    <div>
      {/* Reviews List */}
      <div className="space-y-4">
        {mockUserReviews.map((review) => (
          <Card key={review.appId} className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* App Icon */}
              <div className="flex-shrink-0">
                <Avatar
                  size={64}
                  shape="square"
                  className="bg-gradient-to-br from-purple-400 to-blue-500"
                >
                  <Star size={32} />
                </Avatar>
              </div>

              {/* Review Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {review.appName}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Tag color="purple">{review.appCategory}</Tag>
                      <Tag color={getDifficultyColor(review.difficulty)}>
                        {getDifficultyText(review.difficulty)}
                      </Tag>
                      {review.wouldRecommend && (
                        <Tag color="green">
                          <ThumbsUp size={10} className="inline mr-1" />
                          Recommended
                        </Tag>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <Rate disabled defaultValue={review.rating} className="text-sm" />
                    <span className="text-sm font-semibold text-gray-700">
                      {review.rating}/5
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-3">
                  {review.comment}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {review.timestamp}
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={12} />
                    {review.helpfulCount} helpful
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={12} />
                    {review.commentCount} comments
                  </div>
                  <div className="flex items-center gap-1">
                    Quality: {review.quality}/5
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="small"
                    icon={<ExternalLink size={14} />}
                    onClick={() => handleViewApp(review.appId)}
                  >
                    View App
                  </Button>
                  <Button
                    size="small"
                    icon={<Edit size={14} />}
                    onClick={() => handleEditReview(review.appId)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    danger
                    icon={<Trash2 size={14} />}
                    onClick={() => handleDeleteReview(review.appId)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {mockUserReviews.length === 0 && (
          <Empty
            description="No reviews found. Try adjusting your filters or write your first review!"
            className="my-8"
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar size={64} icon={<User />} className="bg-purple-500" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 m-0">My Activity</h1>
              <p className="text-sm text-gray-600 m-0">{userName}</p>
              <p className="text-xs text-gray-500 font-mono m-0">
                {address?.slice(0, 10)}...{address?.slice(-8)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <ReviewsTab />
      </div>
    </div>
  );
};

export default MyReviews;

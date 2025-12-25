import { Card, Rate, Tag, Button, Avatar, Empty } from 'antd';
import { User, Calendar, Star, ExternalLink, Edit, Trash2, MessageCircle, ThumbsUp } from 'lucide-react';
import { useAccount, useReadContract } from 'wagmi';

import MiniAppReview from '../artifacts/contracts/MiniAppReview.sol/MiniAppReview.json';
import UserReviewCard from '../components/UserReviewCard';

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

const MyReviews = () => {
  const { address } = useAccount();
  const userName = "@you";

  const { data: reviewIds } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: MiniAppReview.abi,
    functionName: 'getPosterPost',
    args: [address]
  }) as { data: bigint[] | undefined };

  console.log(reviewIds)

  const ReviewsTab = () => (
    <div>
      {/* Reviews List */}
      <div className="space-y-4">
        {mockUserReviews.map((review) => (
          <UserReviewCard key={review?.id} review={review} />
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

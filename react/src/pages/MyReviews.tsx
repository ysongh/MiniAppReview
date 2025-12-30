import { Avatar, Empty } from 'antd';
import { User } from 'lucide-react';
import { useAccount, useReadContract } from 'wagmi';

import MiniAppReview from '../artifacts/contracts/MiniAppReview.sol/MiniAppReview.json';
import UserReviewCard from '../components/UserReviewCard';

const MyReviews = () => {
  const { address } = useAccount();
  const userName = "@you";

  const { data: reviewIds = [] } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: MiniAppReview.abi,
    functionName: 'getUserReviewedApps',
    args: [address]
  }) as { data: bigint[] | undefined };

  console.log(reviewIds)

  const ReviewsTab = () => (
    <div>
      {/* Reviews List */}
      <div className="space-y-4">
        {reviewIds.map((review) => (
          <UserReviewCard
            key={review}
            id={review}
            address={address} />
        ))}

        {reviewIds.length === 0 && (
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

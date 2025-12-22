import { Rate, Tag, Button, Avatar, message } from 'antd';
import { User, Calendar, MessageCircle, ThumbsUp } from 'lucide-react';
import { useReadContract, useWriteContract } from "wagmi";

import MiniAppReview from '../artifacts/contracts/MiniAppReview.sol/MiniAppReview.json';
import { formatAddress, formatDate } from '../utils/format';

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

interface Comment {
  comment: string;
  commenter: string;
  timestamp: bigint;
}

function ReviewCard({ id, appid, review, handleOpenCommentModal } : { id: number, appid?: string, review: Review, handleOpenCommentModal: Function }) {
  const { data: comments = [] } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: MiniAppReview.abi,
    functionName: 'getReviewComments',
    args: [appid, id]
  }) as { data: Comment[] | undefined };
  
  const {
    writeContract,
    data: txHash,
  } = useWriteContract();

  const handleMarkHelpful = (id: number) => {
    writeContract({
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      abi: MiniAppReview.abi,
      functionName: "markReviewHelpful",
      args: [appid, id]
    })
    message.success('Marked as helpful!');
  };

  console.log(txHash, comments);

  return (
    <div className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
      <div className="flex items-start gap-3">
        <Avatar size={40} icon={<User />} className="bg-blue-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <div>
              <div className="font-semibold text-gray-900">
                {formatAddress(review?.reviewer)}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar size={12} />
                {formatDate(review?.timestamp)}
              </div>
            </div>
            <Rate disabled defaultValue={Number(review?.rating)} className="text-sm" />
          </div>

          <div className="flex gap-2 mb-2">
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

          <div className="flex gap-2 mb-3">
            <Button
              size="small"
              icon={<ThumbsUp size={14} />}
              onClick={() => handleMarkHelpful(id)}
            >
              {Number(review.helpfulCount)} Helpful
            </Button>
            <Button
              size="small"
              icon={<MessageCircle size={14} />}
              onClick={() => handleOpenCommentModal(id)}
            >
              Comment
            </Button>
          </div>

          {comments?.length > 0 && (
            <div className="ml-8 mt-3 space-y-3 border-l-2 border-gray-200 pl-4">
              {comments?.map((comment, commentIndex) => (
                <div key={commentIndex} className="flex gap-2">
                  <Avatar size={32} icon={<User />} className="bg-gray-400 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-gray-900">
                        {formatAddress(comment?.commenter)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(comment?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {comment?.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewCard;

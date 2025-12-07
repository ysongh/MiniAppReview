import { Rate, Tag, Button, Avatar, message } from 'antd';
import { User, Calendar, ThumbsUp } from 'lucide-react';

import { formatAddress, formatDate } from '../utils/format';

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

function ReviewCard({ id, review } : { id: number, review: Review }) {
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

  const handleMarkHelpful = (index: number) => {
    message.success('Marked as helpful!');
  };

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
            <Tag color="blue" className="text-xs">
              Quality: {Number(review?.quality)}/5
            </Tag>
            <Tag color={getDifficultyColor(review.difficulty)} className="text-xs">
              {getDifficultyText(Number(review?.difficulty))}
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
            onClick={() => handleMarkHelpful(id)}
          >
            Helpful
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard;

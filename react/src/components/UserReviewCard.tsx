import { Card, Rate, Tag, Button, Avatar, Empty } from 'antd';
import { User, Calendar, Star, ExternalLink, Edit, Trash2, MessageCircle, ThumbsUp } from 'lucide-react';

function UserReviewCard({ review }) {
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
  
  return (
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
  )
}

export default UserReviewCard
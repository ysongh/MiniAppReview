import { useState } from 'react';
import { Rate, Button, Modal, Input, message } from 'antd';
import { useWriteContract } from "wagmi";

import MiniAppReview from '../artifacts/contracts/MiniAppReview.sol/MiniAppReview.json';

const { TextArea } = Input;

function ReviewModal({ id, reviewModalVisible, setReviewModalVisible } : { id?: string, reviewModalVisible: boolean, setReviewModalVisible: Function }) {
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    difficulty: 0,
    quality: 0,
    comment: '',
    wouldRecommend: true
  });

  const {
    writeContract,
    data: txHash,
    isPending
  } = useWriteContract();

  const handleSubmitReview = () => {
    if (reviewForm.rating === 0) {
      message.error('Please provide a rating');
      return;
    }

    writeContract({
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      abi: MiniAppReview.abi,
      functionName: "submitReview",
      args: [
        id,
        reviewForm.rating,
        reviewForm.comment,
        reviewForm.difficulty,
        reviewForm.quality,
        reviewForm.wouldRecommend
      ]
    })
    
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

  return (
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
  )
}

export default ReviewModal
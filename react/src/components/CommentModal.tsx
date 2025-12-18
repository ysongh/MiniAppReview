import { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { Send } from 'lucide-react';

import MiniAppReview from '../artifacts/contracts/MiniAppReview.sol/MiniAppReview.json';

const { TextArea } = Input;

function CommentModal({ id, writeContract, commentModalVisible, setCommentModalVisible, selectedReviewIndex, setSelectedReviewIndex } : { id?: string, writeContract: Function, commentModalVisible: boolean, setCommentModalVisible: Function, selectedReviewIndex: number | null, setSelectedReviewIndex: Function }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = () => {
    if (commentText === '') {
      message.error('Please provide a rating');
      return;
    }

    writeContract({
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      abi: MiniAppReview.abi,
      functionName: "addReviewComment",
      args: [
        id,
        selectedReviewIndex,
        commentText
      ]
    });

    setCommentModalVisible(false);
  };

  return (
    <Modal
      title="Add a Comment"
      open={commentModalVisible}
      onCancel={() => {
        setCommentModalVisible(false);
        setCommentText('');
        setSelectedReviewIndex(null);
      }}
      footer={null}
      width={500}
    >
      <div className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Your Comment
          </label>
          <TextArea
            rows={4}
            placeholder="Share your thoughts on this review..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            maxLength={500}
            showCount
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="primary"
            size="large"
            icon={<Send size={16} />}
            block
            onClick={handleSubmitComment}
          >
            Post Comment
          </Button>
          <Button
            size="large"
            onClick={() => {
              setCommentModalVisible(false);
              setCommentText('');
              setSelectedReviewIndex(null);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CommentModal;

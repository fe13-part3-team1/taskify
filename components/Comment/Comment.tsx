import { getItem } from '@/utils/localstorage';
import { CommentsType } from '../compound/modal/types';
import UserBadge from '../UserBadge/UserBadge';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { useState } from 'react';
import { api } from '@/lib/api';
import EXTERNAL_API from '@/constants/api/external';

interface Comment {
  comment: CommentsType;
}

interface UserInfo {
  createdAt: string;
  email: string;
  id: number;
  nickname: string;
  profileImageUrl: string;
  updatedAt: string;
}

export default function Comment({ comment }: Comment) {
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState(comment.content);
  const user = getItem<UserInfo>('userInfo');
  const userId = user?.id;

  const handleCommentUpdate = async () => {
    await api.put(`${EXTERNAL_API.COMMENTS.ROOT}/${comment.id}`, {
      content: editComment,
    });
    setIsEdit(false);
  };

  const handleCommentDelete = async () => {
    await api.delete(`${EXTERNAL_API.COMMENTS.ROOT}/${comment.id}`);
  };

  return (
    <div key={comment.id} className="flex w-full gap-4">
      <div className="flex w-full items-start gap-3">
        <UserBadge size={34} profile={comment.author.profileImageUrl} />
        <div className="w-full">
          <div className="flex items-center gap-2">
            <p className="text-semi14 text-black200">{comment.author.nickname}</p>
            <p className="text-regular12 text-gray400">{comment.createdAt}</p>
          </div>
          {!isEdit ? (
            <p className="text-regular14 text-black200">{comment.content}</p>
          ) : (
            <div className="relative">
              <Textarea
                id="comment"
                placeholder="댓글 작성하기"
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              />
              <Button
                variant="ghost"
                size="comment"
                className="absolute right-4 bottom-4 rounded-sm"
                onClick={handleCommentUpdate}
                disabled={!editComment}
              >
                입력
              </Button>
            </div>
          )}
          {userId === comment.author.id && !isEdit && (
            <div className="text-regular12 text-gray400 flex gap-3">
              <p className="cursor-pointer underline" onClick={() => setIsEdit(true)}>
                수정
              </p>
              <p className="cursor-pointer underline" onClick={handleCommentDelete}>
                삭제
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

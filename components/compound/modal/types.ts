export interface CommentsType {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

export interface CommentPromise {
  cursorId: number;
  comments: CommentsType[];
}

export interface CardData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  columnId: number;
}

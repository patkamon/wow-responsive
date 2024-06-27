export default interface IComment {
    id: number;
    username: string;
    comment: string;
    postId: number
    created_at: Date;
  }
  
  export interface IPost {
    id: number;
    title: string;
    community: string;
    username: string;
    description: string;
    countComment: number;
    created_at: Date;
  }
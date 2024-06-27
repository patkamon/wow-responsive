export interface GetPosts {
  community: string;
  range: number;
  username: string;
  keyword: string;
}

export interface GetComments {
  postId: number;
}

export interface GetPost {
  postId: number;
}

export interface UpdatePost {
  community: string;
  title: string;
  username: string;
  description: string;
}

export interface DeletePost {
  postId: number;
}

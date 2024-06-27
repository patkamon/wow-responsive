export class CreatePostDto {
  community: string;
  username: string;
  title: string;
  description: string;
}

export class CreateCommentDto {
  postId: number;
  username: string;
  comment: string;
}

export class UpdatePostDto {
  community: string;
  username: string;
  title: string;
  description: string;
}

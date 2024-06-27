import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, Post } from './entity.entities';
import { Repository } from 'typeorm';
import { CreateCommentDto, CreatePostDto } from './dtos.dto';
import {
  GetComments,
  GetPost,
  GetPosts,
  UpdatePost,
} from './interfaces.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    const newPost = this.postRepository.create({ ...createPostDto });
    return await this.postRepository.save(newPost);
  }

  async createComment(createCommentDto: CreateCommentDto) {
    // validate if post with postid are exist
    const post = await this.postRepository.findOneBy({
      id: createCommentDto.postId,
    });
    if (!post) {
      throw new NotFoundException(
        `Post with ID ${createCommentDto.postId} not found`,
      );
    }
    this.postRepository.save({
      ...post, // existing fields
      countComment: post.countComment + 1,
    });
    const newComment = this.commentRepository.create({ ...createCommentDto });
    return await this.commentRepository.save(newComment);
  }

  async findComments(postId: GetComments) {
    const comments = this.commentRepository.find({
      order: { created_at: 'DESC' },
      where: { postId: postId.postId },
    });
    return comments;
  }

  async findPosts(getPost: GetPosts) {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .select('*')
      .where(getPost.username !== '' ? 'post.username = :username' : 'TRUE', {
        username: getPost.username,
      })
      .andWhere(
        getPost.community !== '' ? 'post.community = :community' : 'TRUE',
        { community: getPost.community },
      )
      .andWhere(getPost.keyword !== '' ? 'post.title LIKE :keyword' : 'TRUE', {
        keyword: `%${getPost.keyword}%`,
      })
      .orderBy('post.created_at', 'DESC')
      .limit(10)
      .offset(getPost.range * 10);

    const posts = await queryBuilder.getRawMany();
    return posts;
  }

  async findSinglePost(postId: GetPost) {
    const post = this.postRepository.findOneBy({ id: postId.postId });
    return post;
  }

  async updatePost(id: number, updatePost: UpdatePost) {
    const post = await this.postRepository.findOne({
      where: { id },
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return this.postRepository.save({
      ...post, // existing fields
      ...updatePost, // updated fields
    });
  }

  async deletePost(id: number) {
    const post = await this.postRepository.findOneBy({ id: id });
    // post notfound
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return await this.postRepository.remove(post);
  }
}

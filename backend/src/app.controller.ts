import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCommentDto, CreatePostDto, UpdatePostDto } from './dtos.dto';
import { GetPosts } from './interfaces.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return `Hello`;
  }

  // get post
  @Get('/posts')
  async findAllPost(@Query() query: GetPosts) {
    const parseQuery = {
      ...query,
      range: parseInt(query.range as unknown as string),
    };
    const response = await this.appService.findPosts(parseQuery);
    return response;
  }

  @Get('/posts/:id')
  async findPost(@Param('id') id: number) {
    const response = await this.appService.findSinglePost({ postId: id });
    return response;
  }

  // get comment
  @Get('comments/:id')
  async findAllComment(@Param('id') id: number) {
    const response = await this.appService.findComments({ postId: id });
    return response;
  }

  // post post
  @Post('posts')
  async createPost(@Body() createPostDto: CreatePostDto) {
    const response = await this.appService.createPost(createPostDto);
    return response;
  }
  // post comment
  @Post('comments')
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    const response = await this.appService.createComment(createCommentDto);
    return response;
  }

  // put post
  @Put('posts/:id')
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const response = await this.appService.updatePost(id, updatePostDto);
    return response;
  }

  // delete post
  @Delete('posts/:id')
  async removePost(@Param('id') id: number) {
    const response = await this.appService.deletePost(id);
    return response;
  }
}

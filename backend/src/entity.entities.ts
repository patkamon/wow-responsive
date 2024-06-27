import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  community: string;

  @Column()
  username: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  countComment: number;

  @CreateDateColumn()
  created_at: Date; // Creation date
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  comment: string;

  @Column()
  postId: number;

  @CreateDateColumn()
  created_at: Date; // Creation date
}

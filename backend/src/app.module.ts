import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment, Post } from './entity.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password', // YOURPASSWORD
      database: 'test',
      entities: [Post, Comment],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Post, Comment]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

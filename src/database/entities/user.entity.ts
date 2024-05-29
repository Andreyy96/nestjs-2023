import { Column, Entity, OneToMany } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { FollowEntity } from './follow.entity';
import { LikeEntity } from './like.entity';
import { BaseModel } from './models/base.model';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity({ name: TableNameEnum.USERS })
export class UserEntity extends BaseModel {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  bio?: string;

  @Column('text', { nullable: true })
  image?: string;

  @OneToMany(() => FollowEntity, (entity) => entity.user)
  followers?: FollowEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.user)
  following?: FollowEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles?: ArticleEntity[];

  @OneToMany(() => LikeEntity, (entity) => entity.user)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.user)
  comments: CommentEntity[];
}

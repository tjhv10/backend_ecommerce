import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@shareable')
export class Category {
  @PrimaryColumn()
  @IsInt()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;
}

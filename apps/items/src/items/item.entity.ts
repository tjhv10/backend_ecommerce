import { Entity, Column, PrimaryColumn } from "typeorm";
import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import { ItemStatus } from "../../../../packages/enum/items-status.enum";
import { IsInt } from "class-validator";
import { Category } from "../category/categories.entity";

@ObjectType()
@Entity({ name: "items" })
@Directive("@shareable")
export class Item {
  @IsInt()
  @PrimaryColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Date)
  @Column({ nullable: true })
  upload_date: Date;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => String)
  @Column()
  seller_name: string;

  @Field(() => String)
  @Column()
  image_url: string;

  @Field()
  @Column()
  status: ItemStatus;

  @Field(() => [Category])
  categories: Category[];
}

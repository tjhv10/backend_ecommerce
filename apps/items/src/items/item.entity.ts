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
  @Column({ nullable: true, name: "upload_date" })
  uploadDate: Date;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => String)
  @Column({ name: "seller_name" })
  sellerName: string;

  @Field()
  @Column()
  status: ItemStatus;

  @Field(() => String)
  @Column({ name: "image_url" })
  imageUrl: string;

  @Field(() => [Category])
  categories: Category[];
}

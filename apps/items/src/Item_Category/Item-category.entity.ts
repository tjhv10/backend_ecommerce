import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import { Item } from "../items/item.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { IsInt } from "class-validator";
import { Category } from "../category/categories.entity";

@ObjectType("itemsCategories")
@Entity("items_categories")
@Directive("@shareable")
export class ItemsCategories {
  @ManyToOne(() => Category, (category: Category) => category.id, {
    onDelete: "CASCADE",
  })
  @Field(() => Category)
  category: Category;

  @PrimaryColumn({ name: "itemId" })
  @Field(() => Int)
  itemId: number;

  @PrimaryColumn({ name: "categoryId" })
  @Field(() => Int)
  categoryId: number;

  @ManyToOne(() => Item, (item: Item) => item.id, { onDelete: "CASCADE" })
  @Field(() => Item)
  item: Item;
}

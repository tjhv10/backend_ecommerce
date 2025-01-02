import { Module } from "@nestjs/common";
import { ItemsOrderResolver } from "./itemsOrder.resolver";
import { ItemsOrderService } from "./itemsOrder.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsOrder } from "./ItemOrder.entity";
import { ItemService } from "apps/items/src/item/items.service";
import { Items } from "apps/items/src/item/items.entity";
import { ItemModule } from "apps/items/src/item/items.module";

@Module({
  imports: [TypeOrmModule.forFeature([ItemsOrder, Items]), ItemModule],
  providers: [ItemsOrderResolver, ItemsOrderService, ItemService],
})
export class ItemsOrderModule {}

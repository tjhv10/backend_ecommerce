import { Module } from "@nestjs/common";
import { ItemsOrderResolver } from "./itemsOrder.resolver";
import { ItemsOrderService } from "./itemsOrder.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsOrder } from "./ItemOrder.entity";
import { ItemService } from "apps/items/src/item/items.service";
import { Items } from "apps/items/src/item/items.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ItemsOrder, Items])],
  providers: [ItemsOrderResolver, ItemsOrderService, ItemService],
})
export class ItemsOrderModule {}

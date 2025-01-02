import { Module } from "@nestjs/common";
import { ItemsOrderResolver } from "./itemsOrder.resolver";
import { ItemsOrderService } from "./itemsOrder.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsOrder } from "./ItemOrder.entity";
import { Items } from "apps/items/src/item/items.entity";
import { ItemService } from "apps/items/src/item/items.service";
import { HttpModule } from "@nestjs/axios";
import { Orders } from "../orders/order.entity";
import { OrderService } from "../orders/order.service";

@Module({
  imports: [TypeOrmModule.forFeature([ItemsOrder, Items, Orders]), HttpModule],
  providers: [ItemsOrderResolver, ItemsOrderService, ItemService, OrderService],
})
export class ItemsOrderModule {}

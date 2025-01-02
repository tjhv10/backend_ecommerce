import { Module } from "@nestjs/common";
import { ItemsOrderService } from "./itemsOrder.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsOrder } from "./ItemOrder.entity";
import { Items } from "apps/items/src/item/items.entity";
import { HttpModule } from "@nestjs/axios";
import { Orders } from "../orders/order.entity";
import { OrderModule } from "../orders/order.module";
import { ItemModule } from "apps/items/src/item/items.module";
import { ItemsOrderResolver } from "./itemsOrder.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemsOrder, Items, Orders]),
    HttpModule,
    OrderModule,
  ],
  providers: [ItemsOrderService, ItemsOrderResolver],
  exports: [ItemsOrderService],
})
export class ItemsOrderModule {}

import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./order.entity";
import { HttpModule } from "@nestjs/axios";
import { ItemsOrderService } from "../items_order/itemsOrder.service";
import { ItemsOrder } from "../items_order/ItemOrder.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Orders, ItemsOrder]), HttpModule],
  providers: [OrderService, OrderResolver, ItemsOrderService],
  exports: [OrderService],
})
export class OrderModule {}

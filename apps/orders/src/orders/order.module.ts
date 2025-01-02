import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./order.entity";
import { OrderResolver } from "./order.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { OrderModule } from "./orders/order.module";
import { ItemsOrderModule } from "./items_order/itemsOrder.module";
import { ItemsOrder } from "./items_order/ItemOrder.entity";
import { Orders } from "./orders/order.entity";
import { Items } from "apps/items/src/item/items.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "02082003",
      database: "Items",
      autoLoadEntities: true,
      synchronize: false,
      entities: [Orders, ItemsOrder, Items],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    OrderModule,
    ItemsOrderModule,
  ],
})
export class AppModule {}

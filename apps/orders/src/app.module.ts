import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { OrderModule } from "./order/order.module";
import { ItemsOrderModule } from "./items_order/Item-order.module";
import { ItemsOrder } from "./items_order/Item-order.entity";
import { Order } from "./order/order.entity";
import { DataloaderModule } from "../dataloader/dataloader.module";
import { DataloaderService } from "../dataloader/dataloader.service";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as "postgres",
      host: process.env.DB_HOST,
      port: +process.env.PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNCHRONIZE === "true",
      entities: [ItemsOrder, Order],
    }),
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      imports: [DataloaderModule],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: {
            federation: 2,
          },
          context: () => ({
            loaders: dataloaderService.getLoaders(),
          }),
        };
      },
      inject: [DataloaderService],
    }),
    DataloaderModule,
    OrderModule,
    ItemsOrderModule,
  ],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { ItemModule } from "./item/items.module";
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { CatergoyModule } from "./category/categories.module";
import { ItemCategoriesModule } from "./Item_Category/ItemCategory.module";
import { ConfigModule } from "@nestjs/config";
import { Items } from "./item/items.entity";
import { Category } from "./category/categories.entity";
import { ItemsCategories } from "./Item_Category/ItemCategory.entity";
import { DataloaderModule } from "./dataloader/dataloader.module";
import { DataloaderService } from "./dataloader/dataloader.service";

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
      synchronize: true,
      entities: [Items, Category, ItemsCategories],
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
    ItemModule,
    CatergoyModule,
    ItemCategoriesModule,
    DataloaderModule,
  ],
})
export class AppModule {}

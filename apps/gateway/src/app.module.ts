import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { IntrospectAndCompose } from "@apollo/gateway";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: "items",
              url: process.env.ITEMSURL,
            },
            {
              name: "orders",
              url: process.env.ORDERSURL,
            },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}

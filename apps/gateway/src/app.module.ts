import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: "items",
              url: "http://localhost:3000/graphql",
            },
            {
              name: "orders",
              url: "http://localhost:3001/graphql",
            },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}

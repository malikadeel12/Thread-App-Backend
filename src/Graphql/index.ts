import { ApolloServer } from "@apollo/server";
import { user } from "../users";

async function CreateApolloGraphqlServer() {
  const server = new ApolloServer({
    typeDefs: `
      type Query { 
        hello:String
      }
      type Mutation {
        ${user.Mutations}
      }
    `,
    resolvers: {
      Query: {
        ...user.resolvers.Queries
      },
      Mutation: {
        ...user.resolvers.Mutations
      }
    },
  });

  await server.start();

  return server;
}

export default CreateApolloGraphqlServer;

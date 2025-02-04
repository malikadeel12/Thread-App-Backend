import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import prisma from "./libs/db";

async function Backend() {
  const app = express();
  app.use(express.json());

  const PORT = Number(process.env.PORT) || 3001;

  const server = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String!
        }
       type Mutation {
  createUser(firstName: String!, email: String!, password: String!): Boolean
}
      `,
    resolvers: {
      Query: {
        hello: () => {
          return "Hey I'm a GraphQL Server";
        },
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            email,
            password,
          }: { firstName: string; email: string; password: string }
        ) => {
          await prisma.user.create({
            data: {
              email,
              firstName,
              password: password.toString(),
              salt: "random salt",
            },
          });
          return true;
        },
      },
    },
  });

  await server.start();

  app.get("/", (req, res) => {
    res.send("Hello! Server is running UP!");
  });

  app.use("/graphql", expressMiddleware(server) as any);

  app.listen(PORT, () => {
    console.log(`HYYY! Server is running on port ${PORT}`);
  });
}

Backend();

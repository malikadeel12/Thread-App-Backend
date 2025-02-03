import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function Backend() {
    const app = express();
    app.use(express.json());

    const PORT = Number(process.env.PORT) || 3001;

    const server = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String!
        }
        `,
        resolvers: {
            Query: {
                hello: () => {
                    return "Hey I'm a GraphQL Server";
                }
            }
        },
    });

    await server.start();

    app.get("/", (req, res) => {
        res.send("Hello! Server is running UP!");
    });

    app.use('/graphql', expressMiddleware(server) as any);

    app.listen(PORT, () => {
        console.log(`HYYY! Server is running on port ${PORT}`);
    });
}

Backend();

import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import CreateApploGraphqlServer from "./Graphql/index";

async function Backend() {
  const app = express();
  app.use(express.json());
  const PORT = Number(process.env.PORT) || 3001;
  app.get("/", (req, res) => {
    res.send("Hello! Server is running UP!");
  });

  app.use("/graphql", expressMiddleware(await CreateApploGraphqlServer()) as any);

  app.listen(PORT, () => {
    console.log(`HYYY! Server is running on port ${PORT}`);
  });
}

Backend();

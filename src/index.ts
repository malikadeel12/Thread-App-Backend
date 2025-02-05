import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import CreateApolloGraphqlServer  from "./graphql/index";
import userService from "./service/user"

async function Backend() {
  const app = express();
  app.use(express.json());
  const PORT = Number(process.env.PORT) || 3001;
  app.get("/", (req, res) => {
    res.send("Hello! Server is running UP!");
  });
 
  app.use("/graphql", expressMiddleware(await CreateApolloGraphqlServer(),{
    context: async({req})=>{
      //@ts-ignore
      const token= req.headers["token"];
      try {
        const user=userService.decodeJWTToken(token as string);
        return{user};   
      } catch (error) {
        return{}
      }

    }
  }) as any)

  app.listen(PORT, () => {
    console.log(`HYYY! Server is running on port ${PORT}`);
  });
}

Backend();

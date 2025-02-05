import userService,{craeteUserinterface} from "../service/user"
const Queries = {
  getUserToken: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const token = await userService.getUserToken({
      email: payload.email,
      password: payload.password,
    });
    return token;
  },
  getCurrentLoggedInUser: async (_: any, _parameter: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await userService.getUserById(id);
      return user;
    }
    throw new Error("I dont know who are you");
  },
};

const Mutations = {
  createuser:async(_:any,paylaod:craeteUserinterface)=>{
    const res=await userService.createUser(paylaod)
    return res.id;
  }
}

export const resolvers = { Queries, Mutations };

import prisma from "../libs/db";
import JWT from 'jsonwebtoken';
const { createHmac ,randomBytes } = require('node:crypto')
const JWT_SECRET = "$uperM@n@123";

export interface craeteUserinterface{
    firstName: string
    email:string
    password: string
}
export interface getusertocken{
    email:string
    password: string
}

class userService{
    private static gernatesaltocken(salt:string,password:string){
        const hashpassword = createHmac('sha256', salt)
        .update(password)
        .digest('hex');
        return hashpassword;
    }
    public static getUserById(id: string) {
        return prisma.user.findUnique({ where: { id } });
      }
public static createUser(paylaod:craeteUserinterface){
    const {
        firstName,
        email,
        password,
    }=paylaod
    const salt =randomBytes(128).toString('hex');
    const hashedPassword = userService.gernatesaltocken(salt, password);
    console.log("salt",salt);
return prisma.user.create({
    data:{
        firstName,
        email,
        password:hashedPassword,
        salt,

    }
})

}
private static getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
  public static async getUserToken(payload: getusertocken) {
    const { email, password } = payload;
    const user = await userService.getUserByEmail(email);
    if (!user) throw new Error("user not found");

    const userSalt = user.salt;
    const usersHashPassword = userService.gernatesaltocken(userSalt, password);

    if (usersHashPassword !== user.password)
      throw new Error("Incorrect Password");

    // Gen Token
    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return token;
  }
  public static decodeJWTToken(token: string) {
    return JWT.verify(token, JWT_SECRET);
  }
}
export default userService;
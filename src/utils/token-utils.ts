import { sign,verify } from "jsonwebtoken";

const tokenSecret = process.env.TOKEN_SECRET as string


const generateToken =(user_id:string):string=>{
    return sign(user_id as string ,tokenSecret as string)
}
const checkToken = (token:string):string=>{
    return verify(token,tokenSecret as string) as string
}

export {generateToken,checkToken}
import {compareSync,hashSync} from 'bcrypt'

const saltRounds = process.env.SALT_ROUND
const pepper = process.env.BCRYPT_PASSWORD

const passwordHashing = (password:string):string=>{
    const password_plus_pepper = password.concat(pepper as string)
    return hashSync(password_plus_pepper,parseInt(saltRounds as string))
}
const isValidPassword = (password:string,hashedPassword:string): boolean=>{
    const password_plus_pepper = password.concat(pepper as string)
    return compareSync(password_plus_pepper,hashedPassword)
}

export {passwordHashing,isValidPassword}
import { Router } from "express";
import {getAllUsers,getUserById,createUser,UpdateUser,deleteUser,loginUser} from '../../handlers/user.handler'
import { validateTokenMiddleware } from "../../middlewares/authenrication.middleware";

const userRouter:Router =  Router()

userRouter.get('/',getAllUsers)
userRouter.get('/:user_id',validateTokenMiddleware,getUserById)
userRouter.post('/',createUser)
userRouter.put('/:user_id',validateTokenMiddleware,UpdateUser)
userRouter.delete('/:user_id',validateTokenMiddleware,deleteUser)
userRouter.post('/login',loginUser)

export{userRouter}
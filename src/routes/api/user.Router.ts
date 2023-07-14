import { Router } from "express";
import {getAllUsers,getUserById,createUser,UpdateUser,deleteUser,loginUser} from '../../handlers/user.handler'

const userRouter:Router =  Router()

userRouter.get('/',getAllUsers)
userRouter.get('/:user_id',getUserById)
userRouter.post('/',createUser)
userRouter.put('/:user_id',UpdateUser)
userRouter.delete('/:user_id',deleteUser)
userRouter.post('/login',loginUser)

export{userRouter}
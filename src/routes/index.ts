import express, { Router } from 'express'
import { welcomeMessage, notFound } from '../controllers/'
import { join } from 'path'
import { userRouter } from './api/user.Router'
import { postRouter } from './api/postRouter'

//Declareing Static Directory for Serving Static Files

const staticDir: string = join(__dirname, '..', '..', 'public')

//Creatring Router instance

const router: Router = express.Router()

// Useing Static Directory for Serving Static Files

router.use('/static', express.static(staticDir))

// Welcome Message With / EndPoint

router.get('/', welcomeMessage)

//using userRouter
router.use('/users',userRouter)

//using postRouter
router.use('/posts',postRouter)

// Response With Not Found for any invalid path

router.all('/*', notFound)

export default router

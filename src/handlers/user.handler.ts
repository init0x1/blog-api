import { Request, Response } from 'express'
import { UserModel } from '../models/user.model'
import { User } from '../types/UserTypes'
import { generateToken } from '../utils/token-utils'

const userModel = new UserModel()

//getAll Users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await userModel.getAllUsers()
    if (!users.length) {
      res.status(404).json({ message: 'No users Found' })
      return
    }
    res.status(200).json({ users })
  } catch (error) {
    res.status(400).json({ error: 'error while getting Users!' })
  }
}
//get User by Id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.params.user_id as string
    if (!user_id) {
      res.status(400).json({ message: 'User ID is required' })
      return
    }
    const user: User = await userModel.getUserById(user_id)
    if (!user) {
      res.status(404).json({ message: 'user Not Found' })
      return
    }
    res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({ error: 'error while getting User!' })
  }
}

//create User

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, first_name, last_name } = req.body
    if (!username || !email || !password || !first_name || !last_name) {
      res.status(400).json({
        error:
          'Missing/Invalid parameters, the following parameters are required: username,email, password, first_name, last_name'
      })
      return
    }
    const user: User = {
      username,
      email,
      password,
      first_name,
      last_name
    }
    const newUser: User = await userModel.createUser(user)
    const userToken = generateToken(newUser.user_id as string)
    res.status(200).json({ newUser, userToken })
  } catch (error) {
    res.status(400).json({ error: 'error while creating User' })
  }
}

//update user
export const UpdateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = {
      user_id: req.params.user_id as string,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }
    if (!user.username || !user.email || !user.password || !user.first_name || !user.last_name) {
      res.status(400).json({
        error:
          'Missing/Invalid parameters, the following parameters are required: username,email, password, first_name, last_name'
      })
      return
    }
    const isUser = await userModel.getUserById(user.user_id as string)
    if (!isUser) {
      res.status(400).json({ error: 'User Not Found To Be Updated ' })
      return
    }
    const updatedUser = await userModel.updateUser(user)
    res.status(200).json({ updatedUser })
  } catch (error) {
    res.status(400).json({ error: 'error while Updateing  User  ' })
  }
}
//delete User
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.params.user_id as string
    if (!user_id) {
      res.status(400).json({ message: 'User ID is required' })
      return
    }
    if (!(await userModel.getUserById(user_id))) {
      res.status(404).json({ error: 'user not found' })
      return
    }
    await userModel.delete(user_id)

    res.status(200).json('user deleted')
  } catch (error) {
    res.status(400).json({ error: 'error while Deleting User' })
  }
}

// Userlogin
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = await userModel.authenticate(
      req.body.username as string,
      req.body.password as string
    )
    if (user_id) {
      const user_Token = generateToken(user_id as string)
      res.status(200).json({ Login: 'Success', token: user_Token })
    } else {
      res.status(401).json({ Login: 'Failed' })
    }
  } catch (error) {
    res.status(401).json({ Login: 'Failed, Error While Login' })
  }
}

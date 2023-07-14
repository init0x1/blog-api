import { Request, Response, NextFunction } from 'express'
import { checkToken } from '../utils/token-utils'

const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization']

    if (!authorizationHeader) {
      res.status(401).json({ error: 'Token not provided' })
      return
    }

    const token = authorizationHeader.split(' ')[1]
    if (checkToken(token)) {
      next()
    }
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized Access' })
  }
}

export { validateTokenMiddleware }
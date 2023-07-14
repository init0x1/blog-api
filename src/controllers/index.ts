import { Request, Response } from 'express'

const welcomeMessage = (_req: Request, res: Response): void => {
  res.status(200).json({ Server: 'Server is Working !', PowerdBy: 'cryptopress' })
}

const notFound = (req: Request, res: Response): void => {
  res.status(404).json({ Error: '[-] Error 404 Not Found ' })
}

export { notFound, welcomeMessage }

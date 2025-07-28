import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import jwtSecret from './jwtConfig'
import { IUser } from '../models/user';
import { UserPayload, UserResponse } from '../types';
import { expTimeStr } from '../consts';

// Extiende la interfaz Request para incluir 'user'
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload | jwt.JwtPayload;
    }
  }
}

export function refresh(req: Request, res: Response) {
  const user = req.user
  
  if (!user) {
    return res.status(403).json({ error: 'Token inválido o expirado' })
  }

  const token = jwt.sign(user, jwtSecret, {
    expiresIn: '15m',
  })

  return token
}

export function assignToken(res: Response, user: UserResponse) { 
  const payload: UserPayload = {
    id: user.id,
    name: user.nombre,
    email: user.correo
  }

  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: '15m',
  })

  return token
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({ error: 'Token faltante' })

  try {
    const payload = jwt.verify(token, jwtSecret)
    req.user = payload as UserPayload // se agrega la propiedad user al request
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' })
  }
}
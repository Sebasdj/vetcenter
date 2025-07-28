import { Request, Response } from 'express';
import { pool } from '../db';
import { type IUser } from '../models/user';

import { assignToken, refresh } from '../middleware/jwt'
import { dateOfExpTime } from '../consts';

// EMITE UN JWT
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const result = await pool.query(`
      SELECT 
        * 
      FROM 
        usuarios 
      where 
        correo = $1 AND 
        clave = $2
      `, [email, password])  

    if (result.rows.length === 0) {
      console.error(' [LOGIN ERROR] Login failed: Invalid email or password');
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const user = result.rows[0]
    const token = assignToken(res, user)
    res.json({
      message: 'login exitoso',
      user,
      token,
      dateOfExpTime: dateOfExpTime()
    });
  } catch (error) {
    console.error(' [LOGIN ERROR] Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  const user = req.user

  if (!user) return res.status(403).json({ error: 'Token inválido o expirado' })

  const token = refresh(req, res)

  res.json({
    message: 'Token refrescado con exitoso',
    user,
    token,
    dateOfExpTime: dateOfExpTime()
  });
}


export const createUser = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, passwordConfirmation } = req.body

    if (password !== passwordConfirmation) {
      return res.status(401)
        .json({ 
          error: 'Error al intentar establecer contraseña para el usuario.' 
        })
    }

    const result = await pool.query(`
      INSERT INTO usuarios 
        (nombre, correo, clave)
      VALUES
        ($1, $2, $3)
      `, [nombre, email, password])  

    if (result.rows.length === 0) {
      console.error(' [LOGIN ERROR] Error al intentar registrar usuario.', nombre, email, password);
      return res.status(401).json({ error: 'No se pudo registrar el usuario. Intente más tarde.' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
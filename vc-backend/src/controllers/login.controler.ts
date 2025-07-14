import { Request, Response } from 'express';
import { pool } from '../db';
import { type IUser } from '../models/user';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const result = await pool.query(`SELECT * FROM usuarios where correo = $1 AND clave = $2`, [email, password])  

    if (result.rows.length === 0) {
      console.error('Login failed: Invalid email or password');
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
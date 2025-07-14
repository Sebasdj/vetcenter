import { Request, Response } from 'express';
import { pool } from '../db';

export const getPets = async (_: Request, res: Response) => {
  try {

    const result = await pool.query(
      `
      SELECT
        m.id,
        m.nombre, 
        m.edad, 
        m.sexo, 
        u.nombre "usuario", 
        u.correo, 
        r.nombre "raza", 
        e.nombre "especie" 
      FROM mascotas m 
      join usuarios u 
        on m.usuario_id = u.id 
      join razas r 
        on m.raza_id = r.id 
      join especies e 
        on r.especie_id = e.id;
      `
    );
  
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createPet = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const { nombre, edad, sexo, usuario_id, raza_id } = req.body;
    const result = await pool.query(
      `
      INSERT INTO mascotas 
        (nombre, edad, sexo, usuario_id, raza_id) 
      VALUES 
        ($1, $2, $3, $4, $5) RETURNING *
      `,
      [nombre, edad, sexo, usuario_id, raza_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating pet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
};

export const updatePet = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const { nombre, edad, sexo, usuario_id, raza_id } = req.body;
    const result = await pool.query(
      `
      UPDATE mascotas
      SET
        nombre = COALESCE($1, nombre),
        edad   = COALESCE($2, edad),
        sexo   = COALESCE($3, sexo),
        usuario_id = COALESCE($4, usuario_id),
        raza_id    = COALESCE($5, raza_id)
      WHERE id = $6
      RETURNING *;
      `,
      [nombre, edad, sexo, usuario_id, raza_id, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePet = async (req: Request, res: Response) => {
  console.log(req.params)
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM mascotas WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBreeds = async (_: Request, res: Response) => {
  try {

    const result = await pool.query(
      `
      SELECT
        *
      from razas
      `
    );
  
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

import { Router } from 'express';
import {
  getPets,
  createPet,
  updatePet,
  adoptPet,
  deletePet,
  getBreeds,
  getPetSexes
} from '../controllers/pet.controllers';

import { authenticateToken } from '../middleware/jwt';

const router = Router();

router.get('/mascotas', authenticateToken, getPets);
router.get('/razas', authenticateToken, getBreeds);
router.get('/mascotas_sexos', authenticateToken, getPetSexes);

router.post('/mascotas', authenticateToken, createPet);
router.post('/adptar_mascota/:id', authenticateToken, adoptPet);

router.put('/mascotas/:id', authenticateToken, updatePet);

router.delete('/mascotas/:id', authenticateToken, deletePet);


export default router;

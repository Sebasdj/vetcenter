import { Router } from 'express';
import {
  getPets,
  createPet,
  updatePet,
  deletePet,
  getBreeds,
} from '../controllers/pet.controllers';

const router = Router();

router.get('/mascotas', getPets);
router.post('/mascotas', createPet);
router.put('/mascotas/:id', updatePet);
router.delete('/mascotas/:id', deletePet);

router.get('/razas', getBreeds);

export default router;

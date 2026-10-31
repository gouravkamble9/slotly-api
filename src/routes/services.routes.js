import { Router } from 'express';

import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/services.controller.js';

const router = Router();

// The URL table. Note: no logic here on purpose.
// Mounted at /api/services, so router.get('/') means GET /api/services
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', createService);
router.patch('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
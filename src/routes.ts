import express from 'express';
import { controller } from './controller';

const router = express.Router();

router.post('/submit', controller.submit);

router.get('/mappings/:ehr', controller.getMapping);

router.put('/mappings/:ehr', controller.updateMapping);

export default router;

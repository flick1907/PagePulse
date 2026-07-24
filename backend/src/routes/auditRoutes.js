import { Router } from 'express';
import { auditUrl } from '../controllers/auditController.js';

const router = Router();

// Route for performing the website audit
router.post('/audit', auditUrl);

export default router;

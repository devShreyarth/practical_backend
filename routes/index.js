import { Router } from 'express';
import authRouter from './auth.js';  // Import using ES module syntax
import uploadRouter from './fileUploadRoutes.js';

const router = Router();

router.use(authRouter);  // Use the authRouter
router.use(uploadRouter);  // Use the authRouter

export default router;  
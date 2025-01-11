import express from 'express';
import upload from '../utils/multerConfig.js';
import { uploadFile, getFileById } from '../controllers/fileUploadController.js';

const router = express.Router();

// File upload route
router.put('/upload', upload.single('file'), uploadFile);

// Fetch file by ID route
router.get('/:id', getFileById);

export default router;
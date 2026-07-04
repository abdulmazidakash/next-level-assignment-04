import express from 'express';
import { ragController } from "./rag.controller";

const router = express.Router();

router.get(
    '/stats',
    ragController.getStats
);


export const ragRoutes = router;
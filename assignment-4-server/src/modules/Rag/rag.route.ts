import express from 'express';
import { ragController } from "./rag.controller";

const router = express.Router();

router.get(
    '/stats',
    ragController.getStats
);

router.post("/ingest-meals", ragController.ingestDoctors);

export const ragRoutes = router;
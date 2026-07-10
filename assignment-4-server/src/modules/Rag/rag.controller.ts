import { Request, Response } from "express";
import { RAGService } from "./rag.service";
import {sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync";

const ragService = new RAGService();

const getStats = async (req: Request, res: Response) => {
    console.log("Rag Connected", req.query);

    res.status(200).json({ message: "connected rag apis" });
};

const ingestDoctors = catchAsync(async (req: Request, res: Response) => {

    const result = await ragService.ingestMealsData();


        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: "Meals data ingestion completed",
            data: result
        })
})

export const ragController = {
    getStats,
    ingestDoctors
}
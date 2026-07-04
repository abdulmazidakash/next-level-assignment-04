import { Request, Response } from "express";

const getStats = async(req: Request, res: Response) =>{
    console.log("Rag Connected", req.query, res);
}

export const ragController = {
    getStats,
}
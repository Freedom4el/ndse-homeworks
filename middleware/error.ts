import { Request, Response } from "express";

export const errorMiddleware = (req:Request, res:Response) => {
    res.render("error/404", {
        title: "404 | страница не найдена",
    });
};
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {User} from "../models/User";

const tokenKey = process.env.TOKEN_KEY || "";
export interface CustomRequest extends Request {
	token: string | JwtPayload;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];
	try {
		if (!token) {
			return res.status(401).json({ error: "Unauthorized - Token not found!" });
		}
		const decoded = jwt.verify(token, tokenKey);
		(req as CustomRequest).token = decoded;
		next();
	} catch (error) {
		return res.status(403).json({ error: "Unauthorized - Invalid Token!" });
	}
};

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
	const rollNo = req.body.rollNo;
	try {
		let user = await User.findOne({ rollNo: rollNo });
		if (!user) {
			res.status(404).json({ error: "Uh oh, we couldn't find that user! Try again." }).end();
		} else {
			next();
		}
	} catch (error) {
		return res.status(403).json({ error: "" });
	}
};



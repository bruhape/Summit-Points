import express, { type Request, Response } from "express";
import { sendOTP, login } from "../controllers/authController";
import { sellerDetails, userDetails } from "../controllers/scanController";
import { getBalance, getHistory, payUser } from "../controllers/Transactions/userController";
import { createOrder, validatePayment } from "../controllers/Transactions/transactionController";
import { verifyToken, checkUser } from "../utils/middleware";
import { updater } from "../utils/pointsUpdater";

const appRouter = express.Router();

appRouter.get("/", (_: Request, res: Response) => {
	res.json({ message: "Hello World!" });
});

appRouter.get("/get-otp", (_: Request, res: Response) => {
	console.log("Reaching");
	res.json({ message: "Hello OTP!" });
});

appRouter.post("/get-otp", sendOTP);
appRouter.post("/verify-otp", login);

appRouter.post("/create-order", verifyToken, createOrder);
appRouter.post("/validate-payment", verifyToken, validatePayment);

appRouter.post("/get-balance", verifyToken, getBalance);
appRouter.post("/get-history", verifyToken, getHistory);
appRouter.post("/pay-person", verifyToken, payUser);

appRouter.post("/get-seller", verifyToken, sellerDetails);
appRouter.post("/get-person", verifyToken, checkUser, userDetails);

appRouter.post("/updatePoints", updater);

export default appRouter;

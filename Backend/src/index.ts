import express, { Request, Response } from "express";
import appRouter from "./routers";
import connectToMongo from "./config/_mongo";
import cors from "cors";
import "dotenv/config";

const main = () => {
	connectToMongo();

	const app = express();
	const PORT = process.env.PORT || 5000;

	app.use(
		cors({
			credentials: true,
			origin: [
				"https://portal.esummitiitm.org",
				/https?:\/\/localhost:\d{4}/,
				/https?:\/\/127.0.0.1:\d{4}/,
			],
			methods: ["GET", "POST", "PATCH", "PUT"],
		}),
		express.json(),
		express.urlencoded({ extended: true })
	);

	app.get("/", (_: Request, res: Response) => {
		res.json({ message: "Look at my works, ye mighty and despair" });
	});

	app.use("/api", appRouter);

	app.listen(PORT, () => {
		console.log(`🐒 Server running at ${PORT}`);
	});
};
main();

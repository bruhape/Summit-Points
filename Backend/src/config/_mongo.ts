import mongoose, { connect } from "mongoose";
import logger from "../utils/logger";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/SummitPoints";

const connectToMongo = async () => {
	try {
		mongoose.set("strictQuery", false);
		await connect(MONGO_URI, { autoCreate: true });
		logger.info("Connected to db");
	} catch (e: any) {
		logger.error(e);
	}
};

export default connectToMongo;

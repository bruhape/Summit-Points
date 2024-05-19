import { IS_PRODUCTION } from "../utils/constants";
import Razorpay from "razorpay";
//const IS_PRODUCTION = true;
console.log(IS_PRODUCTION);

export const rzpConfig = IS_PRODUCTION
	? {
			key_id: process.env.RAZORPAY_LIVE_KEY_ID || "",
			key_secret: process.env.RAZORPAY_LIVE_KEY_SECRET || "",
	  }
	: {
			key_id: process.env.RAZORPAY_TEST_KEY_ID || "",
			key_secret: process.env.RAZORPAY_TEST_KEY_SECRET || "",
	  };

export const rzpInstance = new Razorpay(rzpConfig);

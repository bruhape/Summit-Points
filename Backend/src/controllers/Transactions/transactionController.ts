import { Request, Response } from "express";
import { User } from "../../models/User";
import crypto from "crypto";
import { rzpInstance } from "../../config/_razorpay";
import { rzpConfig } from "../../config/_razorpay";

interface transaction {
	amount: number;
	time: Date;
	otherParty: string;
}

const discountCalculator = (balance: number, cost: number) => {
	let discountPercentage = 0.2;
	let conversionRate = 2;
	//2 Summit points is worth 1 rupee

	let finalAmount: number;
	let decrement: number;

	if (balance / conversionRate >= cost * discountPercentage) {
		finalAmount = cost * (1 - discountPercentage);
		decrement = cost * discountPercentage * conversionRate;
	} else {
		finalAmount = cost - balance / conversionRate;
		decrement = balance;
	}
	return { finalAmount, decrement };
};

export const createOrder = async (req: Request, res: Response) => {
	const { rollNo, recipient, cost }: { rollNo: string; recipient: string; cost: number } =
		req.body;
	try {
		let user = await User.findOne({ rollNo: rollNo });
		if (!user) return res.status(404).send("user not found");
		const balance = user.balance;

		let { finalAmount, decrement }: { finalAmount: number; decrement: number } =
			discountCalculator(balance, cost);

		const options = {
			amount: finalAmount * 100, // amount in the smallest currency unit i.e., paise
			currency: "INR",
			receipt: "for summit points", //placeholder for now?
		};
		const order = await rzpInstance.orders.create(options);
		console.log(order);

		if (order) {
			const orderOptions = {
				key: rzpConfig.key_id,
				order_id: order.id,
				amount: order.amount,
				currency: order.currency,
				name: "E-Summit Coupons",
				description: "Food/merch coupons for E-Summit",
				theme: { color: "rgba(0,0,38)" },
			};
			res.status(200).send({ orderOptions, finalAmount, decrement });
		}
	} catch (error) {
		console.log(error, "RP err");
		res.send({
			error: "There seems to have been some error in generating the Razorpay order. Kindly retry.",
		});
	}
};

export const validatePayment = async (req: Request, res: Response) => {
	const {
		razorpay_order_id,
		razorpay_payment_id,
		razorpay_signature,
		decrement,
		rollNo,
		recipient,
	}: {
		razorpay_order_id: string;
		razorpay_payment_id: string;
		razorpay_signature: string;
		decrement: number;
		rollNo: string;
		recipient: string;
	} = req.body;
	const sha = crypto.createHmac("sha256", rzpConfig.key_secret);
	sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
	const digest = sha.digest("hex");
	if (digest !== razorpay_signature) {
		return res.status(400).send({ error: "Transaction is not legit!" });
	} else {
		let user = await User.findOne({ rollNo: rollNo });
		if (!user) return res.status(404).send("user not found");
		const balance: number = user.balance;
		let newBal = balance - decrement;
		let senderTransaction: transaction = {
			amount: -decrement,
			time: new Date(),
			otherParty: recipient,
		};
		await User.findOneAndUpdate(
			{ rollNo: rollNo },
			{ $set: { balance: newBal }, $push: { history: senderTransaction } }
		);
		res.status(200).send({
			msg: "transaction successful!",
			orderId: razorpay_order_id,
			paymentId: razorpay_payment_id,
		});
	}
};

import { Request, Response } from "express";
import { User } from "../../models/User";
import { transaction } from "../../utils/interfaces";

export const getBalance = async (req: Request, res: Response) => {
	const { rollNo }: { rollNo: string } = req.body;
	try {
		let user = await User.findOne({ rollNo: rollNo });
		if (!user) return res.status(404).send("user not found");
		const balance: number = user.balance;
		res.status(200).send({ balance });
	} catch (error) {
		console.error(error);
		res.send({ error });
	}
};

export const payUser = async (req: Request, res: Response) => {
	try {
		const { rollNo, recipient, cost }: { rollNo: string; recipient: string; cost: number } =
			req.body;
		let sender = await User.findOne({ rollNo: rollNo });
		let receiver = await User.findOne({ rollNo: recipient });
		if (!sender || !receiver) return res.status(404).send("user not found");
		let sBalance = sender.balance;
		let rBalance = receiver.balance;
		if (sBalance > cost) {
			let newSBal = sBalance - cost;
			let newRBal = rBalance + cost;

			let senderTransaction: transaction = {
				amount: -cost,
				time: new Date(),
				otherParty: recipient,
			};
			let receiverTransaction: transaction = {
				amount: cost,
				time: new Date(),
				otherParty: rollNo,
			};

			await User.findOneAndUpdate(
				{ rollNo: rollNo },
				{ $set: { balance: newSBal }, $push: { history: senderTransaction } }
			);
			await User.findOneAndUpdate(
				{ rollNo: recipient },
				{ $set: { balance: newRBal }, $push: { history: receiverTransaction } }
			);
			res.status(200).end();
		} else {
			res.status(401).end();
		}
	} catch (error) {
		console.error(error);
		res.send({ error });
	}
};

export const getHistory = async (req: Request, res: Response) => {
	let { rollNo }: { rollNo: string } = req.body;
	try {
		let user = await User.findOne({ rollNo: rollNo });
		if (!user) return res.status(404).send("user not found");
		let history: Array<transaction> = user.history;
		res.status(200).send({ history });
	} catch (error) {
		console.error(error);
		res.send({ error });
	}
};

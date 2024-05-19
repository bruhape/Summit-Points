import { Request, Response } from "express";
import { User } from "../models/User";
import { transaction } from "./interfaces";

const rollList: Array<string> = [];

export const updater = async (req: Request, res: Response) => {
	const notSmail: Array<string> = [];
	rollList.map(async (smail: string) => {
		const rollNo = smail.slice(0, 8).toUpperCase();
		const increment = 250;
		const pattern = /^[A-Z]{2}[0-9]{2}[A-Z][0-9]{3}$/;
		if (pattern.test(rollNo)) {
			try {
				let user = await User.findOne({ rollNo });
				if (!user) {
					const newUser = new User({
						rollNo,
						OTP: "",
						balance: 0,
						history: [],
					});
					await newUser.save();
					user = await User.findOne({ rollNo });
					if (!user) return "idk what to do now";
				}
				const balance: number = user.balance;
				let newBal = balance + increment;
				let transaction: transaction = {
					amount: increment,
					time: new Date(),
					otherParty: "E-Cell",
				};
				await User.findOneAndUpdate(
					{ rollNo: rollNo },
					{ $set: { balance: newBal }, $push: { history: transaction } }
				);
			} catch (error) {
				console.error(error);
			}
		} else {
			notSmail.push(smail);
		}
	});
	res.send({ msg: "Finished updating.", notSmail });
};

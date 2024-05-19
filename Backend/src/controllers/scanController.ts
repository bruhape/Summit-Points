import { Request, Response } from "express";
import { User } from "../models/User";

export const sellerDetails = async (req: Request, res: Response) => {
	let { ID }: { ID: string } = req.body;
	console.log(ID);
	if (ID === "ES24FOOD") {
		res.status(200).send({
			ID: "E-Cell IITM",
			name: "E-Cell",
			item: "Food Coupons",
			amount: 100,
			desc: "These food coupons can be used at any of the food vendors' stalls placed throughout the campus. They are non-refundable.",
		});
	} else if (ID === "ES24MERCH") {
		res.status(200).send({
			ID: "E-Cell IITM",
			name: "E-Cell",
			item: "Official E-Summit Merchandise",
			amount: 100, //not necessary? change this.
			desc: "Some of the finest merch you'll ever lay your eyes upon. Flaunt your style with these impeccable fashion pieces.",
		});
	} else {
		res.status(400).send({ error: "Not a valid E-Summit QR code!" });
	}
};

export const userDetails = async (req: Request, res: Response) => {
	let { rollNo }: { rollNo: string } = req.body;
	rollNo = rollNo.trim();
	try {
		let user = await User.findOne({ rollNo });
		if (!user) return res.status(404).send("user not found");
		const name = "";
		return res.status(200).send({
			ID: rollNo,
			name,
			item: "",
			amount: 0,
			desc: "",
		});
	} catch (error) {
		console.error(error);
	}
};

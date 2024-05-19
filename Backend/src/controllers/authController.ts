import { Request, Response } from "express";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../models/User";
import "dotenv/config";

const tokenKey = process.env.TOKEN_KEY || "";
const mailId = process.env.MAIL_ID || "";
const mailAuth = process.env.MAIL_AUTH || "";
/*
const otpCreator = (rollNo: string) => {
	let otp = otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		lowerCaseAlphabets: false,
		specialChars: false,
	});
	return { rollNo, otp };
};
*/
export const sendOTP = async (req: Request, res: Response) => {
	try {
		let { rollNo }: { rollNo: string } = req.body;
		const email = rollNo + "@smail.iitm.ac.in";

		const otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
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
		//let otp: string = otpCreator(rollNo).otp;
		await User.findOneAndUpdate({ rollNo: rollNo }, { OTP: otp });

		const transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: mailId,
				pass: mailAuth,
			},
		});

		const mailOptions = {
			from: "Summit Points OTP <t8236215@gmail.com>",
			to: email,
			subject: "OTP for Summit Points Login",
			text: `Your OTP is: ${otp}`,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return res.status(500).send({ error }).end();
			}
			res.send({ message: "OTP sent successfully." }).end();
		});
	} catch (error: any) {
		console.error(error);
		return res.status(500).send({ error: error.message }).end();
	}
};

export const login = async (req: Request, res: Response) => {
	const { rollNo, otp }: { rollNo: string; otp: string } = req.body;
	let user = await User.findOne({ rollNo: rollNo });
	if (!user) return res.status(404).send("user not found");
	if (user.OTP === otp) {
		try {
			const token = jwt.sign({ rollNo, otp }, tokenKey, { expiresIn: "60m" });
			res.status(201)
				.send({ message: "OTP verified successfully. Access granted!", token })
				.end();
		} catch (error: any) {
			console.error(error);
			return res.status(500).send({ error: error.message }).end();
		}
	} else {
		return res.status(500).json({ message: "Invalid OTP! Try again" }).end();
	}
};

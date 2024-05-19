import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	/*
	name: {
		type: String,
		required: true,
	},
	*/
	rollNo: {
		type: String,
		required: true,
	},
	OTP: {
		type: String,
	},
	balance: {
		type: Number,
		required: true,
	},
	history: [
		{
			amount: {
				type: Number,
				required: true,
			},
			time: {
				type: Date,
				required: true,
			},
			otherParty: {
				type: String,
				required: true,
			},
		},
	],
});

export let User = mongoose.model("summit_points_users", UserSchema);

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosResponse } from "axios";
import instance from "../../../config/_axios";
import { Row, Col, Card, Form, Input, Button } from "antd";
import { data, orderDetails } from "../interfaces";
import loadScript from "../loadscript";
import openNotification from "../openAntdNotification";

interface amountFieldType {
	amount: number;
}

const ProfileCard = (props: { data: data; isSeller: boolean }) => {
	const { data, isSeller }: { data: data; isSeller: boolean } = props;
	const [initiateCheckout, setInitiateCheckout] = useState<boolean>(false);
	const [orderDetails, setOrderDetails] = useState<orderDetails>();
	const [ogAmount, setOgAmount] = useState<number>(0);
	const [finalAmount, setFinalAmount] = useState<number>(0);
	const [decrement, setDecrement] = useState<number>(0);
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const pay = async (amountInput: amountFieldType) => {
		const token = localStorage.getItem("authToken");
		const rollNo = localStorage.getItem("rollNo")?.trim() || "";
		let cost: number = +amountInput.amount;
		setOgAmount(cost);

		let action: AxiosResponse;
		let endpoint: string;
		let transactionOptions = {
			rollNo: rollNo,
			recipient: data.ID,
			cost: cost,
		};

		if (isSeller) {
			endpoint = "create-order";
		} else {
			endpoint = "pay-person";
		}
		try {
			if (cost > 0) {
				action = await instance.post(
					`http://localhost:5000/api/${endpoint}`,
					transactionOptions,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				if (action.status === 200) {
					if (isSeller) {
						setInitiateCheckout(true);
						setOrderDetails(action.data.orderOptions);
						setFinalAmount(action.data.finalAmount);
						setDecrement(action.data.decrement);
					} else {
						navigate("/success");
					}
				}
			} else {
				openNotification("error", "Kindly enter a valid amount!");
			}
		} catch (error: any) {
			console.error(error.response.data);
			if (error.response.status === 403) {
				localStorage.setItem("sessionExpired", "true");
				navigate("/login");
			} else if (error.response.status === 401) {
				openNotification("error", "Whoops! Looks like you have an insufficient balance!");
			} else {
				openNotification("error", error.response.data.error);
			}
		}
	};

	const checkout = async () => {
		const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
		if (!res) {
			alert("Razorpay failed to load!");
			return;
		}

		const options = {
			...orderDetails,
			image: "data:image/png;base64,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",
			handler: async (response: any) => {
				const token = localStorage.getItem("authToken");
				const rollNo = localStorage.getItem("rollNo")?.trim() || "";
				try {
					let action = await instance.post(
						"http://localhost:5000/api/validate-payment",
						{ ...response, decrement, rollNo, recipient: data.ID },
						{
							headers: { Authorization: `Bearer ${token}` },
						}
					);
					if (action.status === 200) {
						navigate("/success");
						let jsonRes = action.data;
						console.log(jsonRes.msg);
					}
				} catch (error: any) {
					console.error(error.response.data);
					if (error.response.status === 403) {
						localStorage.setItem("sessionExpired", "true");
						navigate("/login");
					} else if (error.response.status === 400) {
						openNotification(
							"error",
							"Uh oh, looks like there was an error with the transaction! Kindly try again."
						);
					} else {
						openNotification("error", error.response.data.error);
					}
				}
			},
		};
		const paymentObject = new (window as any).Razorpay(options);
		paymentObject.open();
		paymentObject.on("payment.failed", function (response: any) {
			openNotification("error", response.error.description);
		});
	};

	return (
		<>
			<Row
				style={{
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					textAlign: "center",
					color: "white",
					padding: "40px",
				}}
			>
				<Col
					lg={12}
					sm={20}
					xs={24}
					style={{
						margin: "auto",
						display: "flex",
					}}
				>
					<Card
						style={{
							boxShadow: "0px 5px 5px 0px grey",
							border: "none",
							width: "100%",
							borderRadius: "25px",
							margin: "0",
							padding: "25px",
						}}
					>
						<Row>
							<Col span={2}>
								<Button
									onClick={() => window.location.reload()}
									style={{
										borderRadius: "25px",
										height: "50px",
										width: "70px",
										marginBottom: "40px",
									}}
								>
									<img
										src="/assets/Common/backArrow.png"
										style={{ width: "35px" }}
									></img>
								</Button>
							</Col>
						</Row>
						<div style={{ width: "100%" }}>
							<Col span={24}>
								{!isSeller && (
									<div>
										<img src="/assets/Dashboard/profile.png"></img>
									</div>
								)}

								<div>
									<h1>{data.item}</h1>
								</div>
								<h3 style={{ textAlign: "left" }}>
									{isSeller ? `Sold by: ${data.name}` : `Roll Number: ${data.ID}`}
								</h3>
								{isSeller && (
									<>
										<h2 style={{ textAlign: "left" }}>
											Cost per unit: ₹{data.amount}
										</h2>
										<br></br>
										<div>
											<h3 style={{ textAlign: "left" }}>Item Description:</h3>
											<p style={{ textAlign: "left" }}>{data.desc}</p>
										</div>
										<br></br>
									</>
								)}
							</Col>

							<Form
								form={form}
								name="paymentInput"
								layout="vertical"
								onFinish={pay}
								style={{ width: "75%", margin: "auto" }}
							>
								<Form.Item<amountFieldType>
									name="amount"
									rules={[
										{
											required: true,
											pattern: new RegExp(
												/^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/gm
											),
											message: "Please enter a valid amount",
										},
									]}
									label={
										<>
											<span
												style={{
													color: "black",
													fontWeight: "700",
													fontSize: "1rem",
													textAlign: "center",
												}}
											>
												{isSeller
													? "Enter the amount to be paid:"
													: "Enter the number of Summit Points you wish to send:"}
											</span>
										</>
									}
								>
									<Input disabled={initiateCheckout} />
								</Form.Item>

								{!initiateCheckout && (
									<Form.Item>
										<Button
											style={{
												border: "none",
												fontWeight: "700",
												borderRadius: "25px",
												backgroundColor: "blue",
												color: "white",
											}}
											size="large"
											type="primary"
											htmlType="submit"
										>
											{isSeller ? "Redeem Summit Points" : "Pay"}
										</Button>
									</Form.Item>
								)}
							</Form>
						</div>
						{initiateCheckout && (
							<div>
								<p style={{ fontSize: "20px" }}>
									You will redeem <b>{decrement} Summit Points</b> for a discount
									of
									<span style={{ color: "green" }}>
										{" "}
										₹{ogAmount - finalAmount}
									</span>
									.<br />
								</p>
								<h3 style={{ fontSize: "25px" }}>
									Final amount to be paid: ₹{finalAmount}
								</h3>
								<Button
									style={{
										border: "none",
										fontWeight: "700",
										borderRadius: "25px",
										backgroundColor: "blue",
										color: "white",
									}}
									size="large"
									type="primary"
									htmlType="submit"
									onClick={() => checkout()}
								>
									Proceed to Checkout
								</Button>
							</div>
						)}
					</Card>
				</Col>
			</Row>
		</>
	);
};
export default ProfileCard;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../config/_axios";
import { Row, Col, Form, Input, Button, Divider, Card } from "antd";
import openNotification from "../Utils/openAntdNotification";

interface rollFieldType {
	rollNo: string;
}

interface otpFieldType {
	otp: string;
}

const Login = () => {
	const [rollNo, setRollNo] = useState<string>("");
	const [otpAction, setOtpAction] = useState<string>("");
	const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
	const [isPending, setIsPending] = useState<boolean>(false);

	const navigate = useNavigate();
	const [form] = Form.useForm();

	useEffect(() => {
		let sessionFlag = localStorage.getItem("sessionExpired");
		if (sessionFlag === "true") {
			openNotification("error", "Looks like your session has expired! Kindly re-login.");
		}
	}, []);

	const submitRollNo = async (rollInput: rollFieldType) => {
		const rollNo = rollInput.rollNo.toUpperCase().trim();

		setIsPending(true);
		try {
			let message = await instance.post("http://localhost:5000/api/get-otp", {
				rollNo,
			});
			if (message.status === 200) {
				setComponentDisabled(true);
				setRollNo(rollNo);
				setOtpAction("Sent");
				openNotification("success", "OTP sent successfully to your smail.");
				return;
			}
		} catch (error: any) {
			console.error(error.response.data);
			//setInputError(true);
			openNotification(
				"error",
				"There was an error in sending the OTP, kindly retry. Maybe check your internet connection?"
			);
		}
	};
	useEffect(() => {
		setIsPending(false);
	}, [otpAction]);

	const submitOTP = async (otpInput: otpFieldType) => {
		let otp = otpInput.otp.trim();

		try {
			let result = await instance.post("http://localhost:5000/api/verify-otp", {
				rollNo,
				otp,
			});
			console.log(result.data.message);
			if (result.status === 201) {
				setOtpAction("Verified");
				//use cookies instead?
				localStorage.setItem("authToken", result.data.token);
				localStorage.setItem("rollNo", rollNo);
				localStorage.setItem("sessionExpired", "");
				openNotification("success", "Successfully logged in!");
				navigate("/home");
			}
		} catch (error) {
			console.error(error);
			openNotification("error", "Invalid OTP! Try again");
		}
	};

	return (
		<div
			style={{
				padding: "45px",
				backgroundImage: "linear-gradient(45deg, purple, darkblue)",
				height: "1000px",
			}}
		>
			<div
				style={{
					margin: "20px",
					fontSize: "32px",
					fontFamily: "Inter",
					fontWeight: "700",
					textAlign: "center",
					color: "white",
				}}
			>
				{" "}
				Summit Points{" "}
			</div>
			<img style={{ width: "100%" }} src="/assets/Login/e-cell_logo.png" alt="banner" />
			<Row
				style={{
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					textAlign: "center",
					color: "white",
					margin: "1rem auto",
					padding: "1rem",
				}}
			>
				<Col
					lg={10}
					sm={24}
					xs={24}
					style={{
						margin: "auto",
						display: "flex",
					}}
				>
					<Card
						style={{
							backgroundColor: "darkblue",
							border: "none",
							width: "100%",
							borderRadius: "25px",
						}}
					>
						<h2
							style={{
								color: "white",
								fontWeight: "600",
								fontSize: "1.5rem",
								margin: "0",
							}}
						>
							Login
						</h2>
						<Divider style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />

						<Form
							form={form}
							name="login"
							className="login-form"
							layout="vertical"
							onFinish={submitRollNo}
							style={{ width: "100%", padding: "0 10px 0px 10px" }}
						>
							<Form.Item<rollFieldType>
								name="rollNo"
								rules={[
									{
										required: true,
										pattern: new RegExp(
											/^[A-Za-z]{2}[0-9]{2}[A-Za-z][0-9]{3}$/gm
										),
										message: "Please enter a valid roll number",
									},
								]}
								label={
									<>
										<span
											style={{
												color: "rgba(255,255,255,0.8)",
												fontWeight: "700",
												fontSize: "1.1rem",
											}}
										>
											Enter your roll number:
										</span>
									</>
								}
							>
								<Input
									disabled={componentDisabled}
									style={{ backgroundColor: "white" }}
								/>
							</Form.Item>
							{otpAction != "Sent" ? (
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
										type="default"
										htmlType="submit"
										disabled={componentDisabled}
									>
										Get OTP
									</Button>
								</Form.Item>
							) : (
								""
							)}
						</Form>
						{isPending && (
							<div>
								<em style={{ color: "grey" }}>Sending OTP... </em>
							</div>
						)}

						{otpAction === "Sent" ? (
							<Form
								form={form}
								name="login"
								className="login-form"
								layout="vertical"
								onFinish={submitOTP}
								style={{ width: "100%", padding: "0 10px 0px 10px" }}
							>
								<Form.Item<otpFieldType>
									name="otp"
									rules={[
										{
											required: true,
											pattern: new RegExp(/^[0-9]{6}$/gm),
											message: "Enter a valid OTP",
										},
									]}
									label={
										<>
											<span
												style={{
													color: "rgba(255,255,255,0.8)",
													fontWeight: "700",
													fontSize: "1rem",
												}}
											>
												Enter the OTP sent to your smail:
											</span>
										</>
									}
								>
									<Input />
								</Form.Item>

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
										Login
									</Button>
								</Form.Item>
							</Form>
						) : (
							<div>
								<span style={{ color: "white", opacity: "0.5", padding: "20px" }}>
									Not registered for an E-Summit account?
								</span>
								<br />
								<a
									href="https://portal.esummitiitm.org/register"
									style={{ textAlign: "center", color: "blueviolet" }}
								>
									Sign Up
								</a>
							</div>
						)}
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Login;

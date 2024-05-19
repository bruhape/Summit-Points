import Header from "../../Header/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../config/_axios";
import ProfileCard from "../../Utils/Payment/ProfileCard";
import { Row, Col, Card, Form, Input, Button } from "antd";
import { data, transaction } from "../../Utils/interfaces";
import openNotification from "../../Utils/openAntdNotification";

const PayID = () => {
	const [data, setData] = useState<data>();
	const [contacts, setContacts] = useState<string[]>([]);
	const recentlyPaid: Array<string> = [];
	const token = localStorage.getItem("authToken");
	const rollNo = localStorage.getItem("rollNo")?.trim() || "";
	const navigate = useNavigate();
	const [form] = Form.useForm();

	interface recipientFieldType {
		recipient: string;
	}

	const goToProfile = async (recipientInput: recipientFieldType) => {
		let recipient: string = recipientInput.recipient.toUpperCase().trim();

		if (recipient != rollNo) {
			try {
				let message = await instance.post(
					"http://localhost:5000/api/get-person",
					{ rollNo: recipient },
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				if (message.status === 200) {
					setData(message.data);
				}
			} catch (error: any) {
				if (error.response.status === 403) {
					localStorage.setItem("sessionExpired", "true");
					navigate("/login");
				} else {
					openNotification("error", error.response.data.error);
				}
			}
		} else {
			openNotification("error", "Maybe try paying someone other than yourself? ;)");
		}
	};

	const getHistory = async () => {
		try {
			let result = await instance.post(
				"http://localhost:5000/api/get-history",
				{ rollNo: rollNo },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (result.status === 200) {
				result.data.history?.forEach((transaction: transaction) => {
					if (!recentlyPaid.includes(transaction.otherParty)) {
						const pattern = /^[A-Z]{2}[0-9]{2}[A-Z][0-9]{3}$/;
						if (pattern.test(transaction.otherParty)) {
							recentlyPaid.push(transaction.otherParty);
						}
					}
				});
				setContacts(recentlyPaid);
			}
		} catch (error: any) {
			console.error(error.response.data.error);
			if (error.response.status === 403) {
				localStorage.setItem("sessionExpired", "true");
				navigate("/login");
			} else {
				openNotification("error", error.response.data.error);
			}
		}
	};

	const payCard = (recipient: string) => {
		let personData: data = {
			ID: recipient,
			name: "",
			item: "",
			amount: 0,
			desc: "",
		};
		setData(personData);
	};

	useEffect(() => {
		getHistory();
	}, []);

	return (
		<div className="payID" style={{ padding: "0 5px 0 5px" }}>
			<Header />
			{!data && (
				<div>
					<div className="container">
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
									<Form
										form={form}
										name="paymentInput"
										layout="vertical"
										onFinish={goToProfile}
										style={{ width: "75%", margin: "auto" }}
									>
										<Form.Item<recipientFieldType>
											name="recipient"
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
															color: "black",
															fontWeight: "700",
															fontSize: "1rem",
															textAlign: "center",
															width: "100%",
														}}
													>
														Enter the roll number of the person you wish
														to pay:
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
												Go!
											</Button>
										</Form.Item>
									</Form>
									{/*
									errorMsg && (
										<div className="error">
											<h2 style={{ color: "red" }}>{errorMsg}</h2>
										</div>
									)
									*/}
								</Card>
							</Col>
						</Row>
					</div>
					<div>
						{contacts.length > 0 ? (
							<h2
								style={{
									paddingLeft: "55px",
									paddingTop: "15px",
								}}
							>
								Recently Paid:
							</h2>
						) : (
							<p style={{ textAlign: "center", padding: "50px" }}>
								Looks like you haven't traded with any of your friends yet! Once you
								send them some points, you can see their contacts listed here.
							</p>
						)}

						{contacts.reverse().map((recipient: string) => (
							<div
								style={{
									borderRadius: "100px",
									boxShadow: "0px 5px 5px 0px grey",
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									margin: "20px",
									padding: "10px",
								}}
							>
								<div className="profilePic">
									<img src="/assets/Dashboard/profile.png" />
								</div>
								<div>
									<b>{recipient}</b>
								</div>
								<div className="button">
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
										onClick={() => payCard(recipient)}
									>
										Pay
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			{data && <ProfileCard {...{ data: data, isSeller: false }} />}
		</div>
	);
};

export default PayID;

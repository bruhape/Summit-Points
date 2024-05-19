import Header from "../../Header/Header";
import { Row, Col, Card } from "antd";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { FaPhoneAlt } from "react-icons/fa";

const items: CollapseProps["items"] = [
	{
		key: "1",
		label: (
			<div
				style={{
					textAlign: "left",
					fontWeight: "700",
				}}
			>
				Redeeming Summit Points
			</div>
		),
		children: (
			<p style={{ textAlign: "left" }}>
				Summit points can be redeemed to obtain discounts on food coupons and merch at
				E-Summit stalls, up to a maximum of 20% off. To redeem your points, just walk up to
				the nearest E-Summit vendor stall and scan the QR code there. Then, enter the
				original amount to be paid - the final discount will be calculated on the basis of
				your balance, and you can then proceed to pay the discounted amount with a payment
				method of your choice through the Razorpay payment gateway.
			</p>
		),
	},
	{
		key: "2",
		label: (
			<div
				style={{
					textAlign: "left",
					fontWeight: "700",
				}}
			>
				Obtaining Summit Points
			</div>
		),
		children: (
			<p style={{ textAlign: "left" }}>
				You can obtain Summit Points by attending E-Cell events such as competitions,
				workshops and talks that occur throughout the year. At the end of these events, you
				will be given a Google form to fill to confirm your attendance, upon which a certain
				number of Summit Points will be deposited to your account. Moreover, the winners of
				E-Cell competitions will get an even larger sum of Summit Points!
			</p>
		),
	},
	{
		key: "3",
		label: (
			<div
				style={{
					textAlign: "left",
					fontWeight: "700",
				}}
			>
				Trading Summit Points
			</div>
		),
		children: (
			<p style={{ textAlign: "left" }}>
				Sharing is caring! You can send your Summit Points to any other student simply by
				entering their roll number in the "Pay to Smail ID" page, wherein you can specify
				the number of Summit Points to be sent. Or, you can scan their QR code (which they
				can display by going to the "Share QR Code" page) to pay directly instead. You can
				also view the list of students whom you have recently paid to in the Pay to Smail ID
				page.
			</p>
		),
	},
];

const Settings = () => {
	return (
		<div className="settings" style={{ padding: "0 10px 0 10px" }}>
			<Header />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div
					style={{
						margin: "20px",
						padding: "7px 0 7px 0",
						width: "150px",
						fontSize: "30px",
						fontFamily: "Inter",
						fontWeight: "700",
						textAlign: "center",
						borderRadius: "100px",
						background: "#005be3",
						color: "white",
					}}
				>
					Info
				</div>
			</div>
			<div style={{ margin: "2%" }}>
				<Row
					style={{
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						textAlign: "center",
						color: "white",
						padding: "20px",
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
							}}
						>
							<Col
								span={24}
								style={{
									margin: "auto",
									display: "flex",
									padding: "5px",
								}}
							>
								<div
									style={{
										fontWeight: "700",
										fontSize: "2rem",
										padding: "0 0 15px 0",
										margin: "0px",
									}}
								>
									Usage
								</div>
							</Col>
							<Collapse items={items} defaultActiveKey={["1"]} />;
						</Card>
					</Col>
				</Row>

				<Row
					style={{
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						textAlign: "center",
						color: "white",
						padding: "20px",
					}}
					//gutter={48}
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
							}}
						>
							<Col
								span={24}
								style={{
									margin: "auto",
									display: "flex",
									padding: "5px",
								}}
							>
								<div
									style={{
										fontWeight: "700",
										fontSize: "2rem",
										padding: "0 0 15px 0",
										margin: "0px",
									}}
								>
									Assistance
								</div>
							</Col>
							<Row>
								<div
									style={{
										fontSize: "20px",
										padding: "20px",
									}}
								>
									For any help, feel free to contact:
								</div>
							</Row>
							<Row>
								<Col span={8} style={{ padding: "20px" }}>
									<b
										style={{
											fontSize: "20px",
										}}
									>
										Ruhaib
									</b>
									<br />
									<FaPhoneAlt />
									<span
										style={{
											fontSize: "15px",
										}}
									>
										+91 98862 66742
									</span>
								</Col>
								<Col span={8} style={{ padding: "20px" }}>
									<b
										style={{
											fontSize: "20px",
										}}
									>
										Aditya
									</b>
									<br />
									<FaPhoneAlt />
									<span
										style={{
											fontSize: "15px",
										}}
									>
										+91 95606 67329
									</span>
								</Col>
								<Col span={8} style={{ padding: "20px" }}>
									<b
										style={{
											fontSize: "20px",
										}}
									>
										Prarthana
									</b>
									<br />
									<FaPhoneAlt />
									<span
										style={{
											fontSize: "15px",
										}}
									>
										+91 86181 27995
									</span>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};
//TODO: add stuff to this page
export default Settings;

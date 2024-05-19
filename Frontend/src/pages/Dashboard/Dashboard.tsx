import { Link } from "react-router-dom";
import { Row, Col, Card } from "antd";
import Header from "../Header/Header.tsx";

const Dashboard = () => {
	return (
		<div className="dashboard" style={{ padding: "0 15px 0 15px", minWidth: "300px" }}>
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
						width: "200px",
						fontSize: "30px",
						fontFamily: "Inter",
						fontWeight: "700",
						textAlign: "center",
						borderRadius: "100px",
						background: "#005be3",
						color: "white",
					}}
				>
					{" "}
					Dashboard{" "}
				</div>
				<img
					style={{ width: "80%", padding: "5% 10%" }}
					src="/assets/Dashboard/banner.png"
					alt="banner"
				/>
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
								<h2
									style={{
										fontWeight: "700",
										fontSize: "1.5rem",
										padding: "0 0 15px 0",
										margin: "0px",
									}}
								>
									Transactions
								</h2>
							</Col>
							<Row>
								<Col span={8}>
									<Link
										to="/scan"
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											textAlign: "center",
											cursor: "pointer",
											textDecoration: "none",
											color: "black",
										}}
									>
										<div>
											<img
												src="/assets/Dashboard/camera.png"
												style={{ width: "80px" }}
											></img>
										</div>
										<div style={{ width: "70%", fontSize: "16px" }}>
											Scan QR Code
										</div>
									</Link>
								</Col>
								<Col span={8}>
									<Link
										to="/payID"
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											textAlign: "center",
											cursor: "pointer",
											textDecoration: "none",
											color: "black",
										}}
									>
										<div>
											<img
												src="/assets/Dashboard/paySomeone.png"
												style={{ width: "80px" }}
											></img>
										</div>
										<div style={{ width: "60%", fontSize: "16px" }}>
											Pay to Smail ID
										</div>
									</Link>
								</Col>
								<Col span={8}>
									<Link
										to="/shareQR"
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											textAlign: "center",
											cursor: "pointer",
											textDecoration: "none",
											color: "black",
										}}
									>
										<div>
											<img
												src="/assets/Dashboard/shareQR.png"
												style={{ width: "80px" }}
											></img>
										</div>
										<div style={{ width: "70%", fontSize: "16px" }}>
											Share QR Code
										</div>
									</Link>
								</Col>
							</Row>
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
								<h2
									style={{
										fontWeight: "700",
										fontSize: "1.5rem",
										padding: "0 0 15px 0",
										margin: "0px",
									}}
								>
									Services
								</h2>
							</Col>
							<Row>
								<Col span={8}>
									<Link
										to="/history"
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											textAlign: "center",
											cursor: "pointer",
											textDecoration: "none",
											color: "black",
										}}
									>
										<div>
											<img
												src="/assets/Dashboard/history.png"
												style={{ width: "80px" }}
											></img>
										</div>
										<div style={{ width: "70%", fontSize: "16px" }}>
											Transaction History
										</div>
									</Link>
								</Col>
								<Col span={8}>
									<Link
										to="/profile"
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											textAlign: "center",
											cursor: "pointer",
											textDecoration: "none",
											color: "black",
										}}
									>
										<div>
											<img
												src="/assets/Dashboard/wallet.png"
												style={{ width: "80px" }}
											></img>
										</div>
										<div style={{ width: "70%", fontSize: "16px" }}>
											Account Balance
										</div>
									</Link>
								</Col>
								<Col span={8}>
									<Link
										to="/settings"
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											textAlign: "center",
											cursor: "pointer",
											textDecoration: "none",
											color: "black",
										}}
									>
										<div>
											<img
												src="/assets/Dashboard/info.png"
												style={{ width: "80px" }}
											></img>
										</div>
										<div style={{ width: "70%", fontSize: "16px" }}>
											Info & Assistance
										</div>
									</Link>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Dashboard;

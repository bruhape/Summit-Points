import Header from "../../Header/Header";
import Balance from "../../Utils/Balance/Balance";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "antd";

const Success = () => {
	const navigate = useNavigate();
	const toHome = () => navigate("/home");

	return (
		<div className="success">
			<Header />
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
							<div>
								<img
									style={{ width: "100%" }}
									src="/assets/Login/e-cell_logo.png"
									alt="banner"
								/>
							</div>
							<div>
								<h1>Payment Successful!</h1>
							</div>
							<h3>You currently have:</h3>
							<div style={{ display: "flex", justifyContent: "center" }}>
								<Balance />
							</div>
							<br></br>
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
								onClick={toHome}
							>
								Done
							</Button>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Success;

import Header from "../../Header/Header";
const { Text } = Typography;
import { Col, Row, Typography } from "antd";
import { QRCode } from "react-qrcode-logo";

const ShareQR = () => {
	const rollNo = localStorage.getItem("rollNo") || "";
	return (
		<div>
			<Header />
			<Row
				gutter={10}
				className="mt-xs"
				justify="center"
				style={{ width: "95%", margin: "30px", marginBottom: "1rem" }}
			>
				<Col xs={24} md={11}>
					<div style={{ textAlign: "center" }}>
						<Text
							className="text-style"
							type="secondary"
							style={{
								fontSize: "1.2rem",
								textAlign: "center",
							}}
						>
							Share your QR code with others: <br />
						</Text>
					</div>
				</Col>
			</Row>
			<Row
				gutter={10}
				className="mt-xs"
				justify="center"
				style={{ width: "95%", margin: "auto", marginBottom: "1rem" }}
			>
				<Col xs={24} md={4} xl={6} style={{}}>
					<div
						style={{
							textAlign: "center",
							padding: "1rem",
							background: "white",
							borderRadius: "10px",
							border: "1px solid black",
						}}
					>
						<QRCode
							size={256}
							style={{ height: "auto", maxWidth: "90%", width: "90%" }}
							value={rollNo}
							//viewBox={`0 0 256 256`}
							logoImage={"/assets/Dashboard/esummit.png"}
							logoWidth={100}
							logoHeight={64.76}
							logoOpacity={1}
							qrStyle="squares"
						/>
					</div>
				</Col>
			</Row>
		</div>
	);
};
//TODO Add an option that allows users to specify the amount they want to request from others as well
export default ShareQR;

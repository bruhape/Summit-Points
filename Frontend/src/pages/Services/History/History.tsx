import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import instance from "../../../config/_axios";
import Header from "../../Header/Header";
import { transaction } from "../../Utils/interfaces";
import openNotification from "../../Utils/openAntdNotification";

const History = () => {
	const navigate = useNavigate();
	const [history, setHistory] = useState<transaction[]>();
	const token = localStorage.getItem("authToken");
	const rollNo = localStorage.getItem("rollNo")?.trim() || "";
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
				setHistory(result.data.history);
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

	useEffect(() => {
		getHistory();
	}, []);

	return (
		<>
			<Header />
			<div className="transactionHistory" style={{ padding: "0 20px 0 20px" }}>
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
							width: "350px",
							fontSize: "30px",
							fontFamily: "Inter",
							fontWeight: "700",
							textAlign: "center",
							borderRadius: "100px",
							background: "#005be3",
							color: "white",
						}}
					>
						Transaction History
					</div>
				</div>
				{history?.reverse()?.map((transaction: transaction) =>
					transaction.amount < 0 ? (
						<div
							style={{
								borderRadius: "25px",
								boxShadow: "0px 5px 5px 0px grey",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-evenly",
								margin: "20px",
							}}
						>
							<div className="amount">
								<h1 style={{ color: "maroon" }}>{transaction.amount.toString()}</h1>
							</div>
							<div className="details">
								<div className="otherParty">
									<p>
										<em>To : </em>
										<b>{transaction.otherParty}</b>
									</p>
								</div>
								<div className="time">
									<p>
										<em>On: </em>
										{moment(transaction.time).format("LLL")}
									</p>
								</div>
							</div>
						</div>
					) : (
						<div
							style={{
								borderRadius: "25px",
								boxShadow: "0px 5px 5px 0px grey",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-evenly",
								margin: "20px",
							}}
						>
							<div className="amount">
								<h1 style={{ color: "green" }}>
									{"+" + transaction.amount.toString()}
								</h1>
							</div>
							<div className="details">
								<div className="otherParty">
									<p>
										<em>From : </em>
										<b>{transaction.otherParty}</b>
									</p>
								</div>
								<div className="time">
									<p>
										<em>On: </em>
										{moment(transaction.time).format("LLL")}
									</p>
								</div>
							</div>
						</div>
					)
				)}
			</div>
		</>
	);
};
export default History;

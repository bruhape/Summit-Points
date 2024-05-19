import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../config/_axios";
import openNotification from "../openAntdNotification";

const Balance = () => {
	let [balance, setBalance] = useState<number>(0);
	const navigate = useNavigate();

	const getBal = async () => {
		const token = localStorage.getItem("authToken");
		const rollNo = localStorage.getItem("rollNo")?.trim() || "";
		//rollNo has to be trimmed so that mongodb can identify it? Doesnt work when using .trim while saving it in localStorage, find out why.
		try {
			let result = await instance.post(
				"http://localhost:5000/api/get-balance",
				{ rollNo: rollNo },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (result.status === 200) {
				setBalance(result.data.balance);
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
		getBal();
	}, []);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				width: "fit-content",
				height: "fit-content",
				alignItems: "center",
				borderRadius: "100px",
				border: "3px solid black",
				fontSize: "35px",
				textAlign: "center",
			}}
		>
			<div
				style={{
					lineHeight: "60px",
					padding: "0 0 4px 0",
					height: "60px",
					width: "60px",
				}}
			>
				<img src="/assets/Dashboard/esummit.png" alt="summit points logo?" />
			</div>
			<div
				style={{
					lineHeight: "60px",
					padding: "0px 15px",
					height: "60px",
				}}
			>
				<b>{balance}</b>
			</div>
		</div>
	);
};

export default Balance;

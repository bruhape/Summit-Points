import Header from "../../Header/Header";
import ProfileCard from "../../Utils/Payment/ProfileCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../config/_axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import { data } from "../../Utils/interfaces";
import openNotification from "../../Utils/openAntdNotification";

const Scan = () => {
	const [data, setData] = useState<data>();
	const [isSeller, setIsSeller] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleScan = async (QRinput: string) => {
		const QRvalue = QRinput.toUpperCase().trim();
		console.log("recipient:", QRvalue);
		let token = localStorage.getItem("authToken");
		let pattern: RegExp = /^[A-Z]{2}[0-9]{2}[A-Z][0-9]{3}$/gm;

		if (pattern.test(QRvalue)) {
			try {
				setIsSeller(false);

				let message = await instance.post(
					"http://localhost:5000/api/get-person",
					{ rollNo: QRvalue },
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				console.log(QRvalue);
				if (message.status === 200) {
					setData(message.data);
				}
			} catch (error: any) {
				console.error(error.response.data);
				if (error.response.status === 403) {
					localStorage.setItem("sessionExpired", "true");
					navigate("/login");
				} else {
					openNotification("error", error.response.data.error);
				}
			}
		} else {
			try {
				setIsSeller(true);

				//verify seller's summit id
				let message = await instance.post(
					"http://localhost:5000/api/get-seller",
					{ ID: QRvalue },
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				if (message.status === 200) {
					setData(message.data);
				}
			} catch (error: any) {
				console.error(error.response.data);
				if (error.response.status === 403) {
					localStorage.setItem("sessionExpired", "true");
					navigate("/login");
				} else {
					openNotification("error", error.response.data.error);
					navigate("/home");
				}
			}
		}
	};

	useEffect(() => {
		let scanner = new Html5QrcodeScanner(
			"reader",
			{
				qrbox: {
					width: 250,
					height: 250,
				},
				fps: 2,
			},
			false
		);

		const success = (result: string) => {
			let value: string = result.trim();
			handleScan(value);
			scanner.clear();
		};

		const error = (err: string) => {
			console.error(err);
		};

		scanner.render(success, error);
		//duplicate scanner issue solved by removing react strictmode
	}, []);

	return (
		<div className="scanner">
			<Header />
			<div style={{ width: "100%", height: "100vh", padding: "25px 0px" }}>
				{data ? <ProfileCard {...{ data, isSeller }} /> : <div id="reader"></div>}
			</div>
		</div>
	);
};

export default Scan;

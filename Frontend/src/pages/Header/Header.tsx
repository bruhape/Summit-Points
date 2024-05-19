import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { FaHome, FaCamera, FaRegQuestionCircle } from "react-icons/fa";
import "./Header.css";
import Balance from "../Utils/Balance/Balance";

const Header = () => {
	const navigate = useNavigate();
	const [isOpen, setisOpen] = useState<boolean>(false);
	const [atHome, setAtHome] = useState<boolean>(false);

	const [menuHeight, setMenuHeight] = useState<string>("75vh");
	const [menuWidth, setMenuWidth] = useState<string>("100vw");
	const [overlayVisibility, setOverlayVisibility] = useState<string>("visible");
	const [overlayOpacity, setOverlayOpacity] = useState<string>("1");

	const buttonRef = useRef<any>(null);
	const overlayRef = useRef<any>(null);
	const menuRef = useRef<any>(null);

	let rollNo: string = localStorage.getItem("rollNo") || "";

	const menuButton = () => {
		let menu = menuRef.current;
		let overlay = overlayRef.current;
		let button = buttonRef.current;
		button.classList.toggle("change");
		menu.style.width = menuWidth;
		menu.style.height = menuHeight;
		overlay.style.visibility = overlayVisibility;
		overlay.style.opacity = overlayOpacity;
		if (!isOpen) {
			setMenuWidth("0");
			setMenuHeight("0");
			setOverlayVisibility("hidden");
			setOverlayOpacity("0");
			setisOpen(true);
		} else {
			setMenuWidth("100vw");
			setMenuHeight("60vh");
			setOverlayVisibility("visible");
			setOverlayOpacity("1");
			setisOpen(false);
		}
	};

	const toHome = () => navigate("/home");
	const toScan = () => navigate("/scan");
	const toHelp = () => navigate("/settings");

	useEffect(() => {
		if (window.location.pathname === "/home") {
			setAtHome(true);
		}
	});

	return (
		<div className="header" style={{ padding: "25px" }}>
			<div
				className="ellipse1"
				style={{
					position: "fixed",
					width: "75px",
					height: "75px",
					left: "0px",
					top: "0px",
					background: "#005be3",
					borderRadius: "0 0 500px 0",
					zIndex: "4",
				}}
			>
				<img
					className="E-CellLogo"
					src="/assets/Dashboard/E-Cell.png"
					alt="ecell logo"
					style={{
						position: "fixed",
						left: "7.5px",
						top: "15px",
						height: "30px",
						width: "50px",
						zIndex: "3",
					}}
				/>
			</div>
			<div
				className="ellipse2"
				style={{
					position: "fixed",
					width: "75px",
					height: "75px",
					right: "0px",
					top: "0px",
					background: "#005be3",
					borderRadius: "0 0 0 500px",
					zIndex: "3",
					border: "0px",
				}}
			>
				<div
					id="button"
					className="menu-icon"
					onClick={menuButton}
					ref={buttonRef}
					style={{
						position: "relative",
						display: "fixed",
						top: "10px",
						right: "-25px",
						fontSize: "24px",
						cursor: "pointer",
						zIndex: "4",
					}}
				>
					<div
						className="bar1"
						style={{
							width: "35px",
							height: "5px",
							backgroundColor: "white",
							margin: "6px 0",
							transition: "0.4s",
						}}
					></div>
					<div
						className="bar2"
						style={{
							width: "35px",
							height: "5px",
							backgroundColor: "white",
							margin: "6px 0",
							transition: "0.4s",
						}}
					></div>
					<div
						className="bar3"
						style={{
							width: "35px",
							height: "5px",
							backgroundColor: "white",
							margin: "6px 0",
							transition: "0.4s",
						}}
					></div>
				</div>
				<div
					id="menu"
					className="menu"
					ref={menuRef}
					style={{
						display: "block",
						position: "absolute",
						top: "0px",
						right: "0px",
						width: "75px",
						height: "75px",
						borderRadius: "0px 0px 0px 9999px",
						background: "#005be3",
						overflow: "hidden",
						transition: "width 0.5s, height 0.475s",
						transformOrigin: "top right",
						zIndex: "2",
					}}
				>
					<div
						className="menuLinks"
						style={{
							position: "relative",
							display: "flex",
							flexDirection: "column",
							top: "75px",
							left: "90px",
							width: "200px",
						}}
					>
						<div style={{ padding: "0 0 0 50%" }}>
							{atHome && <h3>Hi, {rollNo}!</h3>}
						</div>

						{!atHome ? (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									gap: "25px",
									padding: "30px 0 0 120%",
								}}
							>
								<Button
									style={{
										fontWeight: "700",
										backgroundColor: "blue",
										color: "white",
										display: "flex",
										flexDirection: "row",
										justifyContent: "left",
										width: "450px",
										height: "50px",
										alignItems: "center",
										borderRadius: "100px",
										border: "2px solid white",
										textAlign: "center",
									}}
									size="large"
									type="primary"
									htmlType="submit"
									onClick={toHome}
								>
									<div
										style={{
											lineHeight: "60px",
											padding: "0px",
											height: "60px",
											width: "60px",
										}}
									>
										<FaHome />
									</div>
									<div
										style={{
											lineHeight: "60px",
											padding: "0px 15px",
											height: "60px",
										}}
									>
										<b>Dashboard</b>
									</div>
								</Button>
								<Button
									style={{
										fontWeight: "700",
										backgroundColor: "blue",
										color: "white",
										display: "flex",
										flexDirection: "row",
										justifyContent: "left",
										width: "450px",
										height: "50px",
										alignItems: "center",
										borderRadius: "100px",
										border: "2px solid white",
										textAlign: "center",
									}}
									size="large"
									type="primary"
									htmlType="submit"
									onClick={toScan}
								>
									<div
										style={{
											lineHeight: "60px",
											padding: "0px",
											height: "60px",
											width: "60px",
										}}
									>
										<FaCamera />
									</div>
									<div
										style={{
											lineHeight: "60px",
											padding: "0px 15px",
											height: "60px",
										}}
									>
										<b>Scanner</b>
									</div>
								</Button>
								<Button
									style={{
										fontWeight: "700",
										backgroundColor: "blue",
										color: "white",
										display: "flex",
										flexDirection: "row",
										justifyContent: "left",
										width: "450px",
										height: "50px",
										alignItems: "center",
										borderRadius: "100px",
										border: "2px solid white",
										textAlign: "center",
									}}
									size="large"
									type="primary"
									htmlType="submit"
									onClick={toHelp}
								>
									<div
										style={{
											lineHeight: "60px",
											padding: "0px",
											height: "60px",
											width: "60px",
										}}
									>
										<FaRegQuestionCircle />
									</div>
									<div
										style={{
											lineHeight: "60px",
											padding: "0px 15px",
											height: "60px",
										}}
									>
										<b>Help and Info</b>
									</div>
								</Button>
								<div
									style={{
										fontWeight: "700",
										backgroundColor: "blue",
										color: "white",
										display: "flex",
										flexDirection: "column",
										justifyContent: "left",
										width: "200px",
										height: "80px",
										alignItems: "center",
										borderRadius: "100px",
										border: "2px solid white",
										textAlign: "center",
										padding: "0 20px 30px 20px",
									}}
								>
									<div style={{ padding: "0 0 10px 10px" }}>Your Balance:</div>
									<Balance />
								</div>
							</div>
						) : (
							<div style={{ padding: "30px 0 0 25%" }}>
								<div
									style={{
										fontWeight: "700",
										backgroundColor: "blue",
										color: "white",
										display: "flex",
										flexDirection: "column",
										justifyContent: "left",
										width: "175px",
										height: "80px",
										alignItems: "center",
										borderRadius: "100px",
										border: "2px solid white",
										textAlign: "center",
										padding: "0 20px 20px 20px",
									}}
								>
									<div style={{ padding: "0 0 10px 10px" }}>Your Balance:</div>
									<Balance />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div
				id="overlay"
				ref={overlayRef}
				style={{
					display: "block",
					visibility: "hidden",
					position: "fixed",
					top: "0",
					left: "0",
					width: "100%",
					height: "100%",
					background: "rgba(0, 0, 0, 0.6)",
					zIndex: "1",
					transition: "visibility 0s, opacity 0.5s linear",
				}}
			></div>
		</div>
	);
};

export default Header;

import Header from "../../Header/Header";
import Balance from "../../Utils/Balance/Balance";
import { Card } from "antd";

const Profile = () => {
	return (
		<div className="Profile">
			<Header />
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "80px 20px",
				}}
			>
				<Card
					style={{
						boxShadow: "0px 5px 5px 0px grey",
						border: "none",
						width: "80%",
						borderRadius: "25px",
						textAlign: "center",
					}}
				>
					<h2>Your current balance is:</h2>
					<br></br>
					<div
						style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
					>
						<Balance />
					</div>
				</Card>
			</div>
		</div>
	);
};
//TODO: add more stuff to this page
export default Profile;

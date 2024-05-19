import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/LoginPage.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Scan from "./pages/Transactions/Scanner/Scan";
import PayID from "./pages/Transactions/PaySmailID/PayID";
import Success from "./pages/Transactions/SuccessPage/Success.tsx";
import ShareQR from "./pages/Transactions/ShareQR/ShareQR";
import History from "./pages/Services/History/History";
import Profile from "./pages/Services/Profile/Profile";
import Settings from "./pages/Services/Settings/Settings";

const App: React.FC = (): JSX.Element => {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/home" index element={<Dashboard />} />
				<Route path="/scan" element={<Scan />} />
				<Route path="/payID" element={<PayID />} />
				<Route path="/success" element={<Success />} />
				<Route path="/shareQR" element={<ShareQR />} />
				<Route path="/history" element={<History />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</Router>
	);
};

export default App;

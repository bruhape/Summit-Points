import Axios from "axios";

const baseURL = `http://127.0.0.1:5000/api`;

const instance = Axios.create({
	baseURL,
	withCredentials: true,
});

export default instance;

import axios from "axios";
import { API_URL } from "../utils/constants";

class AuthService {
    login(email, password) {
        return axios
        .post(API_URL + "accounts/login/", {
            email,
            password
        })
        .then(response => {
            if (response.data.access_token) {
            localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(firstName, lastName, email, password) {
        return axios.post(API_URL + "accounts/", {
            'first_name': firstName,
            'last_name': lastName,
            'email': email,
            'password': password,
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();
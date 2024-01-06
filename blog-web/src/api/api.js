import axios from "axios";
import { API_ENDPOINT } from "../config/env";

const API = axios.create({
  baseURL: `${API_ENDPOINT}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;
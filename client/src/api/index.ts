import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.244.10.12:8000/api/",
});

export const signInReq = (data) => instance.post("auth/sign-in", data);
export const signUpReq = (data) => instance.post("auth/sign-up", data);

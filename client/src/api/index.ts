import axios from "axios";

const instance = axios.create({
    baseURL: "http://10.244.10.12:8000/api/",
});
const getToken = () =>{
    return {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
}
export const signInReq = (data) => instance.post("auth/sign-in", data);
export const signUpReq = (data) => instance.post("auth/sign-up", data);


export const getFilesReq = (folderId) => instance.get(`files${folderId ? '?parent=' + folderId : ''}`, getToken());
export const createFileReq = (data) => instance.post(`files`, data, getToken());
export const moveFileReq = (moveData) => instance.post(`files/move`, moveData, getToken());

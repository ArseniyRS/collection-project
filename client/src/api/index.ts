import axios from "axios";

const instance = axios.create({
    baseURL: "http://10.244.10.12:8000/api/",
});
const getToken = () => {
    return {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
}
export const signInReq = (data) => instance.post("auth/sign-in", data);
export const signUpReq = (data) => instance.post("auth/sign-up", data);


export const getFilesReq = (params) => {
    console.log(params)
    return instance.get(`files${Object.entries(params).reduce((prev, cur) => cur[1] ? prev + `${cur.join('=')}` : '', '?')}`, getToken());
}
export const createFileReq = (data) => instance.post(`files`, data, getToken());
export const deleteFileReq = (id, parent) => instance.delete(`files?id=${id}&parent=${parent}`, getToken());
export const moveFileReq = (moveData) => instance.post(`files/move`, moveData, getToken());
export const renameFileReq = (renameData) => instance.post(`files/rename`, renameData, getToken());
export const changeFileColorReq = (fileData) => instance.post(`files/change-color`, fileData, getToken());

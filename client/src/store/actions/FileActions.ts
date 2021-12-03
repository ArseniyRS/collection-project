import {createAsyncThunk} from "@reduxjs/toolkit";
import {createFileReq, getFilesReq, moveFileReq} from "../../api";
import {fileSlice} from "../reducers/FilesSlice";


export const getFilesAction = createAsyncThunk(
    "files/get",
    async (dirId: number, thunkAPI) => {
        try {
            const {data} = await getFilesReq(dirId)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка')
        }
    }
)


export const createFileAction = createAsyncThunk(
    "files/create",
    async (fileData, thunkAPI) => {
        try {
            const {data} = await createFileReq(fileData)
            console.log(data)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка')
        }
    }
)


export const moveFileAction = createAsyncThunk(
    "files/move",
    async (positions, thunkAPI) => {
        try {
            console.log(positions)
            const {data} = await moveFileReq(positions)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка')
        }
    }
)
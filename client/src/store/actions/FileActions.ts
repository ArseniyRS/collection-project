import {createAsyncThunk} from "@reduxjs/toolkit";
import {createFileReq, deleteFileReq, getFilesReq, moveFileReq, renameFileReq} from "../../api";
import {fileSlice} from "../reducers/FilesSlice";

interface IGetFiles {
    search?: string,
    parent?: string
}

export const getFilesAction = createAsyncThunk(
    "files/get",
    async (params: IGetFiles, thunkAPI) => {
        try {
            const {data} = await getFilesReq(params)
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
export const deleteFileAction = createAsyncThunk(
    "files/delete",
    async (id: number, thunkAPI) => {
        try {
            const {data} = await deleteFileReq(id)
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

export const renameFileAction = createAsyncThunk(
    "files/rename",
    async (renameData, thunkAPI) => {
        try {
            const {data} = await renameFileReq(renameData)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка')
        }
    }
)

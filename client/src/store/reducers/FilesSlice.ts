import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createFileAction, getFilesAction, moveFileAction} from "../actions/FileActions";

const initialState = {
    files: [],
    isLoading: false,
    error: '',
    currentDir: null
}


export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        endSort: (state, action: PayloadAction<any[]>) =>{
            state.files = action.payload
        }
    },
    extraReducers: {
        [getFilesAction.pending.type]: state => {
            state.isLoading = true
            state.error = ""
        },
        [getFilesAction.fulfilled.type]: (state, action: PayloadAction<any[]>) => {
            state.isLoading = false
            state.files = action.payload
        },
        [getFilesAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [createFileAction.pending.type]: state => {
            state.isLoading = true
            state.error = ""
        },
        [createFileAction.fulfilled.type]: (state, action: PayloadAction<any[]>) => {
            console.log('fuf')
            state.isLoading = false
            state.files = [...state.files, action.payload]
        },
        [createFileAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [moveFileAction.pending.type]: state => {
            state.error = ""
        },
        [moveFileAction.fulfilled.type]: (state, action: PayloadAction<any[]>) => {
            state.files = action.payload
        },
        [moveFileAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
    }
})

export default fileSlice.reducer
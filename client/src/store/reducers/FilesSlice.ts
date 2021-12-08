import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createFileAction, getFilesAction, moveFileAction} from "../actions/FileActions";

const initialState = {
    files: [],
    isLoading: false,
    error: '',
    currentDir: null,
    textSearch: '',
    dirCrumbs: []
}


export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        endSort: (state, action: PayloadAction<any[]>) => {
            state.files = action.payload
        },
        writeCurrentDir: (state, action: PayloadAction<number | null>) => {
            state.currentDir = action.payload
        },
        writeDirCrumbs: (state, action: PayloadAction<any[] | null>) => {
            state.dirCrumbs = action.payload
        },
        writeTextSearch: (state, action: PayloadAction<string>) =>{
            state.textSearch = action.payload
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
            state.isLoading = false
            state.files = action.payload
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
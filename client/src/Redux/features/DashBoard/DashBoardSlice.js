import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {FOLDER_ALL_URL} from '../../URLAPI/Url'
import axios from 'axios';
const initialState = {
    activeSubject: '',
    EditMode: false,
    ListsFolders:[],
    status: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed
}
export const fetchFolders = createAsyncThunk('/api/DashBoard/',async () =>{
    const response = await axios.get(FOLDER_ALL_URL)
    return [...response.data];
})
export const fetchFoldersByCategory = createAsyncThunk('/api/DashBoard/:Name',async (Name) =>{
    const response = await axios.get(`http://localhost:5000/api/DashBoard/${Name}`)
    return [...response.data];
})

export const FetchFoldersByName = createAsyncThunk('/api/DashBoard/search',async (searchText) =>{
    const response  = await axios.post("http://localhost:5000/api/DashBoard/search",{searchText})
    return [...response.data]
})

const DashBoardSlice = createSlice({
    name:'DashBoard',
    initialState,
    reducers:{
       setActiveSubject(state,action){
        state.activeSubject = action.payload
       },
       setEditMode(state,action){
           state.EditMode = action.payload
       }
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchFolders.pending,(state,action)=>{
            state.status = 'loading';
        })
        builder.addCase(fetchFolders.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            const loadedFolders = action.payload.map(folder => {
                return folder;
            });
            state.ListsFolders = loadedFolders;
        })
        builder.addCase(fetchFolders.rejected,(state,action)=>{
            state.status = 'failed';
        })
    // ---------------------------------------------------------------

        builder.addCase(fetchFoldersByCategory.pending,(state,action)=>{
            state.status = 'loading';
        })
        builder.addCase(fetchFoldersByCategory.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            const loadedFolders = action.payload.map(folder => {
                return folder;
            });
            // Add any fetched folders to the array
            state.ListsFolders = loadedFolders;
        })
        builder.addCase(fetchFoldersByCategory.rejected,(state,action)=>{
            state.status = 'failed';
        })

    // ---------------------------------------------------------------------

    builder.addCase(FetchFoldersByName.pending,(state,action)=>{
        state.status = 'loading';
    })
    builder.addCase(FetchFoldersByName.fulfilled,(state,action)=>{
        state.status = 'succeeded';
        const loadedFolders = action.payload.map(folder => {
            return folder;
        });
        // Add any fetched folders to the array
        state.ListsFolders = loadedFolders;
    })
    builder.addCase(FetchFoldersByName.rejected,(state,action)=>{
        state.status = 'failed';
    })    }
})
export const getListFolders = (state) => state.DashBoard.ListsFolders
export const getActiveSubject = (state) => state.DashBoard.activeSubject
export const IsEditMode = (state) => state.DashBoard.EditMode
export const getstatusFolders = (state) => state.DashBoard.status

export const {setActiveSubject,setEditMode} = DashBoardSlice.actions
export default DashBoardSlice.reducer
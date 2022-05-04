import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    activeSubject: '',
    EditMode: false,
    ListsFolders:[],
    status: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed
}
const FOLDERSAPI_URL = "http://localhost:5000/api/DashBoard/"
export const fetchFolders = createAsyncThunk('/api/DashBoard/',async () =>{
    const response = await axios.get(FOLDERSAPI_URL)
    return response.data;

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
       },
       ShowFiles:{
            reducer(state,action){
                state.push(action.payload)
            },
            prepare( titleFolder, categoryFolder ,hrefFolder,Link){
                return {
                    payload:{
                        titleFolder,
                        categoryFolder,
                        hrefFolder,
                        Link
                    }
                }
            }
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchFolders.pending,(state,action)=>{
            state.status = 'loading';
        })
        builder.addCase(fetchFolders.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.ListsFolders.push(action.payload)
        })
        builder.addCase(fetchFolders.rejected,(state,action)=>{
            state.status = 'failed';
        })

    }
})
export const getListFolders = (state) => state.DashBoard.ListsFolders
export const getActiveSubject = (state) => state.DashBoard.activeSubject
export const IsEditMode = (state) => state.DashBoard.IsEditMode
export const statusFolders = (state) => state.DashBoard.status

export const {setActiveSubject,setEditMode} = DashBoardSlice.actions
export default DashBoardSlice.reducer
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//createAsyncThunk : Thunk는 비동기 작업을 실행해준다
export const getList = createAsyncThunk(
    "GET_LIST",
    async ()=>{
        try{
            const res = await axios.get("http://localhost:8000/list");
            return res.data;
        }catch(err){
            console.log(err)
        }
    }
)
export const addList = createAsyncThunk(
    "ADD_LIST",
    async( newList )=>{
        try{
            const res = await axios.post(`http://localhost:8000/list/`, newList);
            return res.data;
        }catch(err){
            console.log(err)
        }
    }
)
export const deleteList = createAsyncThunk(
    "DELETE_LIST",
    async( id )=>{
        try{
            const res = await axios.delete(`http://localhost:8000/list/`);
            return res.data;
        }catch(err){
            console.log(err)
        }
    }
)
/*
export const updateList = createAsyncThunk(
    "UPDATE_LIST",
    async( id )=>{
        try{
            const res = await axios.put(`http://localhost:8000/list/${id}`);
            return id;
        }catch(err){
            console.log(err)
        }
    }
)
*/


const listSlice = createSlice({
    name : 'list',
    initialState:{
        data :[],
        message : 'default'
    },
    reducer : {

    },
    // extraReducers : 비동기를 담당하는 reducer
    extraReducers : (builder)=>{
        builder.addCase(getList.fulfilled, (state, action)=>{
            state.message = '리스트업 완료';
            state.data = action.payload;
        })
        builder.addCase(addList.fulfilled, (state, action)=>{
            state.message = '추가 완료';
            state.data.push(action.payload);
        })
        builder.addCase(deleteList.fulfilled, (state, action)=>{
            state.message = '삭제 완료';
            state.data = state.data.filter((ele)=>ele.id !== action.payload)
        })
       /* builder.addCase(updateList.fulfilled, (state, action)=>{
            state.message = '수정 완료';
            state.data.put(action.payload);
        }) */
    }
})

export default listSlice.reducer
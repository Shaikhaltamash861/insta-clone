
import {createSlice} from '@reduxjs/toolkit'

const initialState={
    myPost:[],
    userPost:[],
    commentDetail:[]
     
}

const postSlice=createSlice({
    name:'post',
    initialState,
    reducers:{
        getMyPost:(state,action)=>{
        
        state.myPost=action.payload.myPost
    },
    getUserPost:(state,action)=>{
        state.userPost=action.payload.userPost
    },
    setComments:(state,action)=>{
        console.log(action)
         state.commentDetail=action.payload.commentDetail
    }
    
   
  

}
})

 export const {getMyPost,getUserPost,setComments}=postSlice.actions;
 export default postSlice.reducer;

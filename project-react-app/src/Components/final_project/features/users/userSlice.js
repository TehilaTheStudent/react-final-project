import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import * as apiMethods from './usersApi'
import * as statuses from '../statuses'
const initialState = {
    currentLoggedUser: "guest",
    loginStatus: statuses.idle,
    postStatus: statuses.idle,
}
//#region 
// export const getAllUsers = createAsyncThunk(
//     'users/fetchAllusers',// משמש לתיעוד בכלי דיבוג מאחורי הקלעים 
//     async (thunkAPI) => {
//         const res = await apiMethods.getAllUserApi()
//         return res
//     },
// )
export const getByIdUser = createAsyncThunk(
    'users/deleteuser',// משמש לתיעוד בכלי דיבוג מאחורי הקלעים 
    async (id, thunkAPI) => {
        const res = await apiMethods.getByIdUserApi(id)
        return res
    },
)
export const postUser = createAsyncThunk(
    'users/post user',// משמש לתיעוד בכלי דיבוג מאחורי הקלעים 
    async (newUser, thunkAPI) => {
        const res = await apiMethods.postUserApi(newUser)
        return res
    },
)
export const loginUser = createAsyncThunk(
    'users/login user',// משמש לתיעוד בכלי דיבוג מאחורי הקלעים 
    async (existsUser, thunkAPI) => {
        const res = await apiMethods.loginUserApi(existsUser)
        return res
        
    },
)
//#endregion
//אקשן מיוחד- אקשן אסינכרוני- מאפשר לבצע קריאות  לשרת 


export const usersSlice = createSlice({
    name: 'users slice',// נועד חהדפסות בכלי דיבוג של רדידקס
    initialState,
    reducers: {
        logout: (state, action) => {
            state.currentLoggedUser = "guest"
            state.loginStatus=statuses.idle
        },
        setStatus:(state,action)=>{
            state.loginStatus=statuses.fulfilled
        }
    },

   

    //extraReducers
    //אפשר לבצע בפנים את כל מה שאשפר לעשות ברדוסר
    //זה המקום להגדיר מה יקרה במהלך כל השלבים של האקשן האסינכרוני  
    // בנוסף הוא מאפשר  לבצע אקשנים מיוחדים לדוג- לבצע מעקב על אקשו אסינכרוני
    // הוא מאפשר גם כן לגשת לאקשנים מסלייס אחר

    extraReducers: (builder) => {
        builder
            // .addCase(getAllUsers.fulfilled, (state, { payload }) => {
            //     state.arrProduct = payload
            //     state.loginStatus = statuses.fulfilled
            // })
            // You can chain calls, or have separate `builder.addCase()` lines each time
            .addCase(loginUser.rejected, (state, action) => {

                state.loginStatus = statuses.rejected
            })

            .addCase(loginUser.fulfilled, (state, action) => {

                state.currentLoggedUser = action.payload
                state.loginStatus = statuses.fulfilled
                //TODO

            })
            .addCase(postUser.rejected, (state, action) => {
                state.postStatus = statuses.rejected
                //TODO

            })
            .addCase(postUser.fulfilled, (state, action) => {
                
                state.postStatus = statuses.fulfilled
                state.currentLoggedUser = {id:action.payload.newId,... action.meta.arg}
                //TODO

            })
        //questions:
        //i must know the entities structure!
        //after posts, get again or post  ????
    },

})

export const { logout,setStatus } = usersSlice.actions
export default usersSlice.reducer
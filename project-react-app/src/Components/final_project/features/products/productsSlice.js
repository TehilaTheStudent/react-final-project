import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import * as apiMethods from './productsApi'
import * as statuses from '../statuses'
const initialState = {
    arrProducts: [],
    getAllStatus: statuses.idle,
    postStatus: statuses.idle
    //question: where to put product by id? use it?
}

//אקשן מיוחד- אקשן אסינכרוני- מאפשר לבצע קריאות  לשרת 
export const getAllProducts = createAsyncThunk(
    'posts/fetchAllPosts',// משמש לתיעוד בכלי דיבוג מאחורי הקלעים 
    async (thunkAPI) => {
        const res = await apiMethods.getProductsApi()
        return res
    },
)
export const getByIdProduct = createAsyncThunk(
    'posts/deletePost',// משמש לתיעוד בכלי דיבוג מאחורי הקלעים 
    async (id, thunkAPI) => {
        const res = await apiMethods.getByIdProductApi(id)
        return res
    },
)
export const postProduct = createAsyncThunk(
    'posts/deletePost',// משמש לתיעוד בכלי דיבוג מאחורי הקלעים 
    async (newProduct, thunkAPI) => {
        const res = await apiMethods.postProductApi(newProduct)
        return res
    },
)

export const putProduct = createAsyncThunk(
    'product/putProduct',// משמש לתיעוד בכלי דיבוג מאחורי הקלעים 
    async ({id,updatedProduct}, thunkAPI) => {
        const res = await apiMethods.putProductApi(id,updatedProduct)
        return res
    },
)

export const productsSlice = createSlice({
    name: 'products slice',// נועד חהדפסות בכלי דיבוג של רדידקס
    initialState,
    reducers: {
        setGetAllStatus:(state,action)=>{
            state.getAllStatus=action.payload
        },
    },

    //extraReducers
    //אפשר לבצע בפנים את כל מה שאשפר לעשות ברדוסר
    //זה המקום להגדיר מה יקרה במהלך כל השלבים של האקשן האסינכרוני  
    // בנוסף הוא מאפשר  לבצע אקשנים מיוחדים לדוג- לבצע מעקב על אקשו אסינכרוני
    // הוא מאפשר גם כן לגשת לאקשנים מסלייס אחר

    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, { payload }) => {
                state.arrProducts = payload
                state.getAllStatus = statuses.fulfilled
            })
            // You can chain calls, or have separate `builder.addCase()` lines each time
            .addCase(getAllProducts.pending, (state, action) => {
                state.getAllStatus = statuses.pending
                console.log('get all products pending')

            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.getAllStatus = statuses.rejected
                console.log('get all orders rejected')

            })

            .addCase(postProduct.fulfilled, (state, action) => {
                state.postStatus = statuses.fulfilled
                state.getAllStatus=statuses.idle
            })
            .addCase(postProduct.rejected, (state, action) => {
                state.postStatus = statuses.rejected

            })
            .addCase(putProduct.fulfilled, (state, action) => {
                state.getAllStatus=statuses.idle

            })

    },

})

// Action creators are generated for each case reducer function
export const { setGetAllStatus} = productsSlice.actions

export default productsSlice.reducer
//TODO if i can use there asyncs as regular and get result
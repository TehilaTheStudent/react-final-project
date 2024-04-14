import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import * as apiMethods from './ordersApi'
import * as statuses from '../statuses'
const initialState = {
    arrOrders: [],
    getAllStatus: statuses.idle,
    cart: [],
    cartSum: 0
}

//אקשן מיוחד- אקשן אסינכרוני- מאפשר לבצע קריאות  לשרת 
export const getAllOrders = createAsyncThunk(
    'orders/fetchAllorders',// משמש לתיעוד בכלי דיבוג מאחורי הקלעים 
    async (thunkAPI) => {
        const res = await apiMethods.getOrdersApi()
        return res
    },
)
export const getByIdOrder = createAsyncThunk(
    'orders/getbyid',// משמש לתיעוד בכלי דיבוג מאחורי הקלעים 
    async (id, thunkAPI) => {
        const res = await apiMethods.getByIdOrderApi(id)
        return res
    },
)
export const postOrder = createAsyncThunk(
    'orders/postOrder',// משמש לתיעוד בכלי דיבוג מאחורי הקלעים 
    async (newOrder, thunkAPI) => {
        newOrder = { ...newOrder, cart: thunkAPI.getState().orders.cart, orderSum: thunkAPI.getState().orders.cartSum }
        const res = await apiMethods.postOrderApi(newOrder)
        return res
    },
)
export const deleteOrder = createAsyncThunk(
    'orders/deleteorder',// משמש לתיעוד בכלי דיבוג מאחורי הקלעים 
    async (id, thunkAPI) => {
        const res = await apiMethods.deleteOrderApi(id)
        return res
    },
)

export const ordersSlice = createSlice({
    name: 'orders slice',// נועד חהדפסות בכלי דיבוג של רדידקס
    initialState,
    reducers: {
        // addProduct: {
        //     reducer: (state, action) => {
        //         // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //         // doesn't actually mutate the state because it uses the Immer library,
        //         // which detects changes to a "draft state" and produces a brand new
        //         // immutable state based off those changes
        //         state.arrProduct.push(action.payload)
        //     },
        //     prepare: ({ title, body }) => {
        //         const id = nanoid()
        //         return { payload: { id, body, title } }
        //     },


        // },
        // setAllProsucts: (state, action) => {
        //     state.arrProduct = action.payload
        // },
        // deleteProduct: (state, action) => {
        //     let index = state.arrProduct.findIndex(x => x.id === action.payload)
        //     state.arrProduct.splice(index, 1)
        // },
        // updateProduct: (state, action) => {
        //     let index = state.arrProduct.findIndex(x => x.id === action.payload.id)
        //     state.arrProduct.splice(index, 1, action.payload)
        // },
        addProductToCart: (state, action) => {
            let index = state.cart.findIndex(obj => obj.id == action.payload.id)
           let price = parseFloat(Number(action.payload.price).toFixed(1))
            if (index != -1) {//not first
                state.cart[index].qty++;
                state.cart[index].sumProduct += price
            }
            else {//first
                state.cart = [...state.cart, { ...action.payload, qty: 1, sumProduct: price }]
            }
            state.cartSum += price
            state.cartSum = parseFloat(state.cartSum.toFixed(1))
        },
        addProductsToCart: (state, action) => {
            //gets: product with qty
            let index = state.cart.findIndex(obj => obj.id == action.payload.id)
           let price = Number(action.payload.price) * action.payload.qty
            price =  parseFloat(Number(price).toFixed(1))

            if (index != -1) {//not first
                state.cart[index].qty += action.payload.qty;
                state.cart[index].sumProduct += price
            }
            else {//first
                state.cart = [...state.cart, { ...action.payload, qty: action.payload.qty, sumProduct: price }]
            }
            state.cartSum += price
            state.cartSum = parseFloat(state.cartSum.toFixed(1))
        },
        emptyCart: (state, action) => {
            state.cart = []
            state.cartSum = 0
        },
        subtractProductQty: (state, action) => {
            let productIndex = state.cart.findIndex(obj => obj.id == action.payload)
           let price = Number(state.cart[productIndex].price)
            price =  parseFloat(Number(price).toFixed(1))

            if (state.cart[productIndex].qty == 1) {//the last
                state.cart.splice(productIndex, 1)
            }
            else {
                state.cart[productIndex].qty--
                state.cart[productIndex].sumProduct = parseFloat((state.cart[productIndex].sumProduct - price).toFixed(1))
            }
            state.cartSum -= price
            state.cartSum = parseFloat(state.cartSum.toFixed(1))

        },
        addProductQty: (state, action) => {
            let productIndex = state.cart.findIndex(obj => obj.id == action.payload)
            state.cart[productIndex].qty++
           let price = Number(state.cart[productIndex].price)
            price =  parseFloat(Number(price).toFixed(1))

            state.cart[productIndex].sumProduct = parseFloat((price * state.cart[productIndex].qty).toFixed(1))
            state.cartSum += price
            state.cartSum = parseFloat(state.cartSum.toFixed(1))
        },
        removeProductFromCart: (state, action) => {
            let productIndex = state.cart.findIndex(obj => obj.id == action.payload)
            state.cartSum -= state.cart[productIndex].sumProduct
            state.cartSum = parseFloat(state.cartSum.toFixed(1))
            state.cart.splice(productIndex, 1)
        },

    },

    //extraReducers
    //אפשר לבצע בפנים את כל מה שאשפר לעשות ברדוסר
    //זה המקום להגדיר מה יקרה במהלך כל השלבים של האקשן האסינכרוני  
    // בנוסף הוא מאפשר  לבצע אקשנים מיוחדים לדוג- לבצע מעקב על אקשו אסינכרוני
    // הוא מאפשר גם כן לגשת לאקשנים מסלייס אחר

    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.fulfilled, (state, { payload }) => {
                state.arrOrders = payload
                state.getAllStatus = statuses.fulfilled
            })
            // You can chain calls, or have separate `builder.addCase()` lines each time
            .addCase(getAllOrders.pending, (state, action) => {
                state.getAllStatus = statuses.pending
                console.log('get all orders pending')
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.getAllStatus = statuses.rejected
                console.log('get all orders rejected')

            })

            .addCase(getByIdOrder.fulfilled, (state, action) => {

            })
            .addCase(postOrder.rejected, (state, action) => {
                debugger;
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.cartSum = 0
                state.cart = []
                state.getAllStatus = statuses.idle

            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.getAllStatus = statuses.idle
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                debugger
            })

    },

})

// Action creators are generated for each case reducer function
export const { addProductsToCart, addProductToCart, emptyCart, addProductQty, subtractProductQty, removeProductFromCart } = ordersSlice.actions

export default ordersSlice.reducer
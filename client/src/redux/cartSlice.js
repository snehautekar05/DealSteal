import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem._id === action.payload._id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item._id !== cartItem._id
          );

          state.cartItems = nextCartItems;

          toast.error("Product removed from cart", {
            position: "bottom-left",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//     carts: []
// }

// // card slice
// const cartSlice = createSlice({
//     name: "cartslice",
//     initialState,
//     reducers: {

//         // add to cart
//         addToCart: (state, action) => {

//             const IteamIndex = state.carts.findIndex((iteam) => iteam.id === action.payload.id);

//             if (IteamIndex >= 0) {
//                 state.carts[IteamIndex].qnty += 1
//             } else {
//                 const temp = { ...action.payload, qnty: 1 }
//                 state.carts = [...state.carts, temp]

//             }
//         },

//         // remove perticular iteams
//         removeToCart:(state,action)=>{
//             const data = state.carts.filter((ele)=>ele.id !== action.payload);
//             state.carts = data
//         },

//         // remove single iteams
//         removeSingleIteams:(state,action)=>{
//             const IteamIndex_dec = state.carts.findIndex((iteam) => iteam.id === action.payload.id);

//             if(state.carts[IteamIndex_dec].qnty >=1){
//                 state.carts[IteamIndex_dec].qnty -= 1
//             }

//         },

//         // clear cart
//         emptycartIteam:(state,action)=>{
//             state.carts = []
//         }
//     }
// });

// export const { addToCart,removeToCart,removeSingleIteams ,emptycartIteam} = cartSlice.actions;

// export default cartSlice.reducer;
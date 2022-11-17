import { act } from 'react-dom/test-utils';
import { ADDTOCART,REMOVE } from '../Types';


export const addToCartReducer = (state={cart:[]},action)=>{
    switch(action.type){
        case ADDTOCART:
            const x = state.cart.find((item)=>item._id===action.payload._id);
            if(x){
                return{
                    ...state,
                    cart:[...state.cart]
                }
            }
            else{
                return{
                    ...state,
                    cart:[...state.cart,action.payload]
            }};
            
        case REMOVE:
                state.cart.splice(action.payload,1)
            return{
                ...state,
                cart:state.cart
            };
        default: return state;
        };
};
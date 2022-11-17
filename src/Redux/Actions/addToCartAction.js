import { ADDTOCART, REMOVE, TOTALPRICE } from '../Types';

export const addToCartAction = (data)=>{
    return{
        type:ADDTOCART,
        payload:data,
    };
};

export const removeFromCartAction = (data)=>{
    return{
        type:REMOVE,
        payload:data,
    };
};

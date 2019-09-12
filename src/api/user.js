import request from "../utils/request";

export const login =(params)=>request.post('user/mobile-login',{params})
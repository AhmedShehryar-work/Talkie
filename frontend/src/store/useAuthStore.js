import {create} from "zustand"
import {axi} from "../lib/axios.js"

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile: true,

    isCheckingAuth:true,

    checkAuth: async() =>{
        try {
            
            const res = axi.get("/auth/check");
            set({authUser:res.data});

        } catch (error) {
            console.log("Error in checkAuth", error)
            set({authUser:null});
        }finally{
            set({isCheckingAuth: false})
        }
    }
}))
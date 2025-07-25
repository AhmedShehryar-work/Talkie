import {create} from "zustand"
import {axi} from "../lib/axios.js"
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile: true,

    isCheckingAuth:true,

    checkAuth: async() =>{
        try {
            
            const res = await axi.get("/auth/check");
            set({authUser:res.data});

        } catch (error) {
            console.log("Error in checkAuth", error)
            set({authUser:null});
        }finally{
            set({isCheckingAuth: false})
        }
    },

    signup: async(data) => {
        set({isSigningUp:true});
        try {
            const res = await axi.post("/auth/signup", data);
            set({authUser:res.data});
            toast.success("Signup successful");
        } catch (error) {
            toast.error(error.response.data.message)
        }finally {
            set({isSigningUp:false})
        }
    }

}))
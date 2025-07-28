import {create} from "zustand"
import {axi} from "../lib/axios.js"
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile: false,

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
    },

    login: async(data) => {
        set({isLoggingIn:true});
        try {
            const res = await axi.post("auth/login", data);
            set({authUser: res.data});
            toast.success("Log in successful");
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isLoggingIn: false})
        }
    },

    logout: async() => {
        try {
            await axi.post("auth/logout");
            toast.success("Logged out");
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async(data) =>{
        set({isUpdatingProfile: true});
    
        try {
            const res = await axi.put("auth/update-profile", data);
            set({authUser: res.data});
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile: false});
        }

    }



}))
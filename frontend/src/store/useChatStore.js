import {create} from "zustand"
import toast from "react-hot-toast"
import {axi} from "../lib/axios"

export const useChatStore = create((set) => ({

    messages: [],
    users: [],
    selectedUser : null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async() => {
        set({isUsersLoading: true});
        try {
            const res = await axi.get("messages/users");
            set({users: res.data});

        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading: false})
        }
    },

    getMessages: async (userId) => {
        set({isUsersLoading: true});
        try {
            
            const res = axi.get(`/messages/${userId}`);
            set({messages: res.data});

        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading: false});
        }
    },

    //TODO: Optimize Later
    setSelectedUser: async (selectedUser) => {
        set({selectedUser})
    }

}))